defmodule Admin.ItemsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Items` context.
  """
  alias Admin.Items.PathUtils

  @doc """
  Generate a item.
  """
  def item_fixture(scope, attrs \\ %{}) do
    {:ok, creator} =
      Admin.Repo.insert(%Admin.Accounts.Account{
        id: Ecto.UUID.generate(),
        name: "some name",
        email: "some#{System.unique_integer([:positive])}@email.com",
        type: "individual"
      })

    item_id = Ecto.UUID.generate()

    attrs =
      Enum.into(attrs, %{
        id: item_id,
        description: "some description",
        extra: %{},
        name: "some name",
        path: "#{PathUtils.from_uuids([item_id])}",
        settings: %{},
        type: "some type",
        lang: "en",
        creator_id: creator.id
      })

    {:ok, item} = Admin.Items.create_item(scope, attrs)
    item
  end
end
