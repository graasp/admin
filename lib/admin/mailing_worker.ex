defmodule Admin.MailingWorker do
  @moduledoc """
  Worker for sending batch emails to a target audience with internationalisation.
  """

  use Oban.Worker, queue: :mailing

  alias Admin.Accounts
  alias Admin.Accounts.Scope
  alias Admin.Accounts.UserNotifier
  alias Admin.Notifications

  @impl Oban.Worker
  def perform(%Oban.Job{
        args:
          %{
            "user_id" => user_id,
            "notification_id" => notification_id
          } =
            _args
      }) do
    user = Accounts.get_user!(user_id)
    scope = Scope.for_user(user)

    with {:ok, notification} <- Notifications.get_notification(scope, notification_id),
         included_langs = notification.localized_emails |> Enum.map(& &1.language),
         {:ok, audience} <-
           Notifications.get_target_audience(
             scope,
             notification.audience,
             if(notification.use_strict_languages, do: [only_langs: included_langs], else: [])
           ) do
      # save number of recipients to the notification
      Notifications.update_recipients(notification, %{total_recipients: length(audience)})
      # start sending emails
      send_emails(scope, notification, audience)
      # await email progress messages
      await_emails(scope, notification)
    else
      {:error, :notification_not_found} ->
        {:cancel, :notification_not_found}

      {:error, :invalid_target_audience} ->
        {:cancel, :invalid_target_audience}

      {:error, error} ->
        {:error, "Failed to send notification: #{inspect(error)}"}
    end
  end

  defp send_emails(scope, notification, audience) do
    job_pid = self()

    Task.async(fn ->
      audience
      |> Enum.with_index(1)
      |> Enum.each(fn {user, index} ->
        # set the locale for the email template to the user's language
        # We use a different backend for the email text, so changing the locale
        # for the email template does not affect the connected user locale
        Gettext.put_locale(AdminWeb.EmailTemplates.Gettext, user.lang)
        send_local_email(scope, user, notification)

        current_progress = trunc(index / length(audience) * 100)

        send(job_pid, {:progress, current_progress})

        :timer.sleep(1000)
      end)

      send(job_pid, {:completed})
    end)
  end

  defp send_local_email(scope, user, notification) do
    # get the localized email
    case Notifications.get_local_email_from_notification(notification, user.lang) do
      nil ->
        :skipped

      localized_email ->
        # deliver the email
        UserNotifier.deliver_call_to_action(
          user,
          localized_email.subject,
          localized_email.message,
          localized_email.button_text,
          localized_email.button_url,
          notification.pixel
        )

        # save message log
        Notifications.save_log(
          scope,
          %{
            email: user.email,
            status: "sent"
          },
          notification
        )

        :ok
    end
  end

  defp await_emails(scope, notification) do
    receive do
      {:progress, percent} ->
        Notifications.report_sending_progress(scope, {:progress, notification.name, percent})
        await_emails(scope, notification)

      {:completed} ->
        Notifications.report_sending_progress(scope, {:completed, notification.name})

      {:failed} ->
        Notifications.report_sending_progress(scope, {:failed, notification.name})
    after
      30_000 ->
        Notifications.report_sending_progress(scope, {:failed, notification.name})
        raise RuntimeError, "no progress after 30s"
    end
  end
end
