defmodule Admin.PublicationsTest do
  use Admin.DataCase

  alias Admin.Publications

  describe "published_items" do
    alias Admin.Publications.PublishedItem

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.PublicationsFixtures

    @invalid_attrs %{name: nil, description: nil, creator_id: nil, item_path: nil}

    test "list_published_items/1 returns all scoped published_items" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      published_item = published_item_fixture(scope)
      other_published_item = published_item_fixture(other_scope)
      assert Publications.list_published_items(scope) == [published_item]
      assert Publications.list_published_items(other_scope) == [other_published_item]
    end

    test "get_published_item!/2 returns the published_item with given id" do
      scope = user_scope_fixture()
      published_item = published_item_fixture(scope)
      other_scope = user_scope_fixture()
      assert Publications.get_published_item!(scope, published_item.id) == published_item

      assert_raise Ecto.NoResultsError, fn ->
        Publications.get_published_item!(other_scope, published_item.id)
      end
    end

    test "create_published_item/2 with valid data creates a published_item" do
      valid_attrs = %{
        name: "some name",
        description: "some description",
        creator_id: 42,
        item_path: "some item_path"
      }

      scope = user_scope_fixture()

      assert {:ok, %PublishedItem{} = published_item} =
               Publications.create_published_item(scope, valid_attrs)

      assert published_item.name == "some name"
      assert published_item.description == "some description"
      assert published_item.creator_id == 42
      assert published_item.item_path == "some item_path"
      assert published_item.creator_id == scope.user.id
    end

    test "create_published_item/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Publications.create_published_item(scope, @invalid_attrs)
    end

    test "update_published_item/3 with valid data updates the published_item" do
      scope = user_scope_fixture()
      published_item = published_item_fixture(scope)

      update_attrs = %{
        name: "some updated name",
        description: "some updated description",
        creator_id: 43,
        item_path: "some updated item_path"
      }

      assert {:ok, %PublishedItem{} = published_item} =
               Publications.update_published_item(scope, published_item, update_attrs)

      assert published_item.name == "some updated name"
      assert published_item.description == "some updated description"
      assert published_item.creator_id == 43
      assert published_item.item_path == "some updated item_path"
    end

    test "update_published_item/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      published_item = published_item_fixture(scope)

      assert_raise MatchError, fn ->
        Publications.update_published_item(other_scope, published_item, %{})
      end
    end

    test "update_published_item/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      published_item = published_item_fixture(scope)

      assert {:error, %Ecto.Changeset{}} =
               Publications.update_published_item(scope, published_item, @invalid_attrs)

      assert published_item == Publications.get_published_item!(scope, published_item.id)
    end

    test "delete_published_item/2 deletes the published_item" do
      scope = user_scope_fixture()
      published_item = published_item_fixture(scope)
      assert {:ok, %PublishedItem{}} = Publications.delete_published_item(scope, published_item)

      assert_raise Ecto.NoResultsError, fn ->
        Publications.get_published_item!(scope, published_item.id)
      end
    end

    test "delete_published_item/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      published_item = published_item_fixture(scope)

      assert_raise MatchError, fn ->
        Publications.delete_published_item(other_scope, published_item)
      end
    end

    test "change_published_item/2 returns a published_item changeset" do
      scope = user_scope_fixture()
      published_item = published_item_fixture(scope)
      assert %Ecto.Changeset{} = Publications.change_published_item(scope, published_item)
    end
  end
end
