defmodule Admin.RecycledItemDataFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.RecycledItems` context.
  """
  import Admin.ItemsFixtures, only: [item_fixture: 2]

  def recycled_item_fixture(scope, item_attrs \\ %{}, recycled_item_attrs \\ %{}) do
    # create a trash item with a specific creation date
    # return the item path
    item = item_fixture(scope, item_attrs)
    attrs = Enum.into(recycled_item_attrs, %{item_path: item.path, creator_id: item.creator_id})
    recycled_item = Admin.RecycledItems.trash(attrs)
    {item, recycled_item}
  end
end
