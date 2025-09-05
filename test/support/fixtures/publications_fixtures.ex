defmodule Admin.PublicationsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Publications` context.
  """
  import Admin.ItemsFixtures, only: [item_fixture: 2]

  @doc """
  Generate a published_item.
  """
  def published_item_fixture(scope, attrs \\ %{}) do
    item = item_fixture(scope, Map.get(attrs, :item, %{}))

    attrs =
      Enum.into(attrs, %{
        creator_id: item.creator_id,
        item_path: item.path
      })

    {:ok, published_item} = Admin.Publications.create_published_item(scope, attrs)
    published_item
  end
end
