defmodule Admin.PublicationsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Publications` context.
  """

  @doc """
  Generate a published_item.
  """
  def published_item_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        creator_id: 42,
        description: "some description",
        item_path: "some item_path",
        name: "some name"
      })

    {:ok, published_item} = Admin.Publications.create_published_item(scope, attrs)
    published_item
  end

  def with_creator(published_item) do
    published_item |> Admin.Repo.preload([:creator])
  end

  @doc """
  Generate a published_item.
  """
  def remove_publication_fixture(scope, published_item, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        creator_id: scope.user.id,
        reason: "some reason"
      })

    {:ok, :removed, notice} =
      Admin.Publications.remove_publication_with_notice(scope, published_item, attrs)

    notice
  end
end
