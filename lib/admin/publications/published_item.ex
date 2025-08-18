defmodule Admin.Publications.PublishedItem do
  use Admin.Schema
  import Ecto.Changeset

  schema "published_items" do
    field :creator_id, :integer
    field :item_path, :string
    field :name, :string
    field :description, :string
    field :user_id, :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(published_item, attrs, user_scope) do
    published_item
    |> cast(attrs, [:creator_id, :item_path, :name, :description])
    |> validate_required([:creator_id, :item_path, :name, :description])
    |> put_change(:user_id, user_scope.user.id)
  end
end
