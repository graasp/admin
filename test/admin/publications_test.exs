defmodule Admin.PublicationsTest do
  use Admin.DataCase, async: false

  alias Admin.Publications
  alias Admin.Publications.PublishedItem

  def without_thumbnail(%PublishedItem{thumbnails: nil} = published_item), do: published_item

  def without_thumbnail(%PublishedItem{thumbnails: _} = published_item),
    do: %{published_item | thumbnails: nil}

  describe "published_items" do
    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.PublicationsFixtures
    import Admin.ItemsFixtures, only: [item_fixture: 1]

    @invalid_attrs %{name: nil, description: nil, creator_id: nil, item_path: nil}

    test "list_published_items/1 returns all published_items" do
      scope = user_scope_fixture()

      published_item =
        published_item_fixture(scope)
        |> Admin.Publications.with_creator()
        |> Admin.Publications.with_item()

      [result] = Publications.list_published_items()
      assert published_item.creator == result.creator
      assert published_item.item == result.item
    end

    test "get_published_item!/2 returns the published_item with given id" do
      scope = user_scope_fixture()

      published_item =
        published_item_fixture(scope)
        |> Admin.Publications.with_item()
        |> Admin.Publications.with_creator()

      assert without_thumbnail(Publications.get_published_item!(scope, published_item.id)) ==
               without_thumbnail(published_item)
    end

    test "create_published_item/2 with valid data creates a published_item" do
      scope = user_scope_fixture()
      item = item_fixture(scope)

      valid_attrs = %{
        creator_id: item.creator_id,
        item_path: item.path
      }

      assert {:ok, %PublishedItem{} = published_item} =
               Publications.create_published_item(scope, valid_attrs)

      # add the item properties
      published_item = published_item |> Admin.Publications.with_item()

      assert published_item.item.name == "some name"
      assert published_item.item.description == "some description"
      assert published_item.item_path == item.path
      assert published_item.creator_id == item.creator_id
    end

    test "create_published_item/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Publications.create_published_item(scope, @invalid_attrs)
    end

    test "delete_published_item/2 deletes the published_item" do
      scope = user_scope_fixture()
      published_item = published_item_fixture(scope)
      assert {:ok, %PublishedItem{}} = Publications.delete_published_item(scope, published_item)

      assert_raise Ecto.NoResultsError, fn ->
        Publications.get_published_item!(scope, published_item.id)
      end
    end

    test "change_published_item/2 returns a published_item changeset" do
      scope = user_scope_fixture()
      published_item = published_item_fixture(scope)
      assert %Ecto.Changeset{} = Publications.change_published_item(scope, published_item)
    end

    test "exists?/1 returns false when item is not published" do
      assert false == Publications.exists?(Ecto.UUID.generate())
    end

    test "exists?/1 returns true when item is published" do
      scope = user_scope_fixture()
      published_item = published_item_fixture(scope)
      assert true == Publications.exists?(published_item.id)
    end

    test "item_exists?/1 returns true when item exists" do
      scope = user_scope_fixture()
      item = item_fixture(scope)
      assert true == Publications.item_exists?(item.id)
    end
  end

  describe "featured publications" do
    test "WIP" do
      assert [] == Publications.list_featured_published_items()
    end
  end
end
