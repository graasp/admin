defmodule Admin.ItemsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Items` context.
  """

  @doc """
  Generate a item.
  """
  def item_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        description: "some description",
        extra: %{},
        name: "some name",
        path: "some path",
        settings: %{},
        type: "some type"
      })

    {:ok, item} = Admin.Items.create_item(scope, attrs)
    item
  end
end
