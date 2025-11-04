defmodule Admin.MailerWorker do
  use Oban.Worker, queue: :mailers
  alias Admin.Accounts.Scope

  @impl Oban.Worker
  def perform(%Oban.Job{
        args:
          %{
            "user_id" => user_id,
            "member_id" => member_id,
            "notification_id" => notification_id
          } =
            _args
      }) do
    user = Admin.Accounts.get_user!(user_id)
    scope = Scope.for_user(user)
    member = Admin.Accounts.get_member!(member_id)
    notification = Admin.Notifications.get_service_message!(scope, notification_id)

    with {:ok, _} <-
           Admin.Accounts.UserNotifier.deliver_notification(
             member,
             notification.subject,
             notification.message
           ) do
      Admin.Notifications.save_log(member.email, notification)
      :ok
    end
  end
end
