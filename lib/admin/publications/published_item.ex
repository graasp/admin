defmodule Admin.Publications.PublishedItem do
  use Admin.Schema
  import Ecto.Changeset

  schema "published_items" do
    field :name, :string
    field :description, :string
    field :item_path, :string

    belongs_to :creator, Admin.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(published_item, attrs, user_scope) do
    published_item
    |> cast(attrs, [:item_path, :name, :description])
    |> validate_required([:item_path, :name, :description])
    |> validate_length(:name, min: 1, max: 255)
    |> put_change(:creator_id, user_scope.user.id)
  end
end
