defmodule Admin.Publications.PublishedItem do
  use Admin.Schema
  import Ecto.Changeset

  schema "published_items" do
    belongs_to :item, Admin.Items.Item, type: :string, foreign_key: :item_path, references: :path
    belongs_to :creator, Admin.Accounts.Account, type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(published_item, attrs) do
    published_item
    |> cast(attrs, [:item_path, :creator_id])
    |> validate_required([:item_path, :creator_id])
  end
end
