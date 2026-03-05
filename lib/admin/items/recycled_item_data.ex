defmodule Admin.Items.RecycledItemData do
  @moduledoc """
  This represents an item that was moved to the trash
  """
  use Admin.Schema
  import Ecto.Changeset

  schema "recycled_item_data" do
    belongs_to :item, Admin.Items.Item, type: :string, foreign_key: :item_path, references: :path
    belongs_to :creator, Admin.Accounts.Account, type: :binary_id

    timestamps(only: [:inserted_at], type: :utc_datetime)
  end

  @doc false
  def changeset(data, attrs) do
    data
    |> cast(attrs, [:item_path, :creator_id])
    |> validate_required([:item_path, :creator_id])
  end
end
