defmodule Admin.ItemsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Items` context.
  """

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

    attrs =
      Enum.into(attrs, %{
        description: "some description",
        extra: %{},
        name: "some name",
        path: "some path#{System.unique_integer([:positive])}",
        settings: %{},
        type: "some type",
        creator_id: creator.id
      })

    {:ok, item} = Admin.Items.create_item(scope, attrs)
    item
  end
end
