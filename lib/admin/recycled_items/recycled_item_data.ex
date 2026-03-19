defmodule Admin.RecycledItems.RecycledItemData do
  @moduledoc """
  This represents an item that was moved to the trash
  """
  use Admin.Schema
  import Ecto.Changeset
  alias EctoLtree.LabelTree, as: Ltree

  schema "recycled_item_data" do
    belongs_to :item, Admin.Items.Item, type: Ltree, foreign_key: :item_path, references: :path
    belongs_to :creator, Admin.Accounts.Account, type: :binary_id

    timestamps(updated_at: false, type: :utc_datetime)
  end

  @doc false
  def changeset(data, attrs) do
    data
    |> cast(attrs, [:item_path, :creator_id, :created_at])
    |> validate_required([:item_path, :creator_id])
  end
end
