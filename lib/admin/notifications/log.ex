defmodule Admin.Notifications.Log do
  use Admin.Schema
  import Ecto.Changeset

  schema "notification_logs" do
    field :email, :string

    belongs_to :notification, Admin.Notifications.Notification

    timestamps(type: :utc_datetime, updated_at: false)
  end

  def changeset(message_log, attrs, notification) do
    message_log
    |> cast(attrs, [:email])
    |> validate_required([:email])
    |> put_change(:notification_id, notification.id)
  end
end
