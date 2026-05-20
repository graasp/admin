defmodule Admin.Items.ItemLike do
  @moduledoc """
  This holds the likes that users set on collections they find interesting.
  """
  use Admin.Schema

  schema "item_like" do
    belongs_to :creator, Admin.Accounts.Account, type: :binary_id
    belongs_to :item, Admin.Items.Item, type: :binary_id

    timestamps(updated_at: false, type: :utc_datetime)
  end
end
