defmodule Admin.Publications.PublishedItem do
  use Admin.Schema
  import Ecto.Changeset

  schema "published_items" do
    belongs_to :item, Admin.Items.Item, type: :string, foreign_key: :item_path, references: :path
    belongs_to :creator, Admin.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(published_item, attrs, user_scope) do
    published_item
    |> cast(attrs, [:item_path])
    |> validate_required([:item_path])
    |> put_change(:creator_id, user_scope.user.id)
  end
end
