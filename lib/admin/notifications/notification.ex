defmodule Admin.Notifications.Notification do
  @moduledoc """
  Schema for storing notifications.
  """

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
    |> cast(attrs, [:title, :message, :recipients])
    |> validate_required([:title, :message])
  end

  def update_recipients(notification, %{recipients: _} = attrs) do
    notification
    |> cast(attrs, [:recipients])
    |> validate_required([:recipients])
  end
end
