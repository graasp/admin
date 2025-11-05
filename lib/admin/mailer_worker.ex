defmodule Admin.MailerWorker do
  @moduledoc """
  Worker for sending notifications via email.
  """

  use Oban.Worker, queue: :mailers

  alias Admin.Accounts
  alias Admin.Accounts.Scope
  alias Admin.Accounts.UserNotifier
  alias Admin.Notifications
  alias Admin.Notifications.Notification

  @impl Oban.Worker
  def perform(%Oban.Job{
        args:
          %{
            "user_id" => user_id,
            "member_email" => member_email,
            "notification_id" => notification_id
          } =
            _args
      }) do
    user = Accounts.get_user!(user_id)
    scope = Scope.for_user(user)

    with {:ok, member} <- Accounts.get_member_by_email(member_email),
         {:ok, notification} <- Notifications.get_notification(scope, notification_id),
         {:ok, _} <-
           UserNotifier.deliver_notification(
             member,
             notification.title,
             notification.message
           ) do
      Notifications.save_log(
        scope,
        %{
          email: member.email,
          status: "sent"
        },
        notification
      )

      :ok
    else
      {:error, reason} when reason in [:member_not_found, :notification_not_found] ->
        Notifications.save_log(
          scope,
          %{
            email: member_email,
            status: "failed"
          },
          %Notification{id: notification_id}
        )

        {:cancel, reason}

      {:error, _} ->
        {:error, "Failed to send notification"}
    end
  end
end
