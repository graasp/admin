defmodule Admin.Notifications.LocalizedEmail do
  @moduledoc """
  Schema for storing localized emails.
  """

  use Admin.Schema
  import Ecto.Changeset

  schema "localized_emails" do
    field :subject, :string
    field :message, :string
    field :button_text, :string
    field :button_url, :string
    field :language, :string, default: "en"

    belongs_to :notification, Admin.Notifications.Notification
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(localized_email, attrs, notification_id, _user_scope) do
    localized_email
    |> cast(attrs, [:subject, :message, :button_text, :button_url, :language])
    |> validate_required([:subject, :message, :language])
    |> validate_inclusion(:language, ["en", "fr", "es", "it", "de"])
    |> put_change(:notification_id, notification_id)
  end
end
