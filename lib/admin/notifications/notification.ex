defmodule Admin.Notifications.Notification do
  use Admin.Schema
  import Ecto.Changeset

  schema "notifications" do
    field :title, :string
    field :message, :string
    field :recipients, {:array, :string}

    has_many :logs, Admin.Notifications.Log
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(notification, attrs, _user_scope) do
    notification
    |> cast(attrs, [:title, :message])
    |> validate_required([:title, :message])
  end
end
