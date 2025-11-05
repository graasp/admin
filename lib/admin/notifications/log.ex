defmodule Admin.Notifications.Log do
  @moduledoc """
  Schema for storing notification logs.
  """
  use Admin.Schema
  import Ecto.Changeset

  @statuses ~w(active inactive banned)a

  schema "notification_logs" do
    field :email, :string
    field :status, :string

    belongs_to :notification, Admin.Notifications.Notification

    timestamps(type: :utc_datetime, updated_at: false)
  end

  def changeset(message_log, attrs, notification_id) do
    message_log
    |> cast(attrs, [:email, :status])
    |> validate_required([:email, :status])
    |> validate_inclusion(:status, @statuses)
    |> put_change(:notification_id, notification_id)
  end
end
