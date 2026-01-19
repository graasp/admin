defmodule Admin.Notifications.Pixel do
  use Admin.Schema
  import Ecto.Changeset

  schema "notification_pixels" do
    field :name, :string
    field :slug, :string

    belongs_to :notification, Admin.Notifications.Notification

    timestamps()
  end

  def changeset(pixel, attrs) do
    pixel
    |> cast(attrs, [:slug, :name])
    |> validate_required([:slug, :name])
  end
end
