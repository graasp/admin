defmodule Admin.ItemsTest do
  use Admin.DataCase

  alias Admin.Items

  describe "item" do
    alias Admin.Items.Item

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.ItemsFixtures

    @invalid_attrs %{extra: nil, name: nil, type: nil, path: nil, description: nil, settings: nil}

    test "list_item/1 returns all scoped item" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      item = item_fixture(scope)
      other_item = item_fixture(other_scope)
      assert Items.list_item(scope) == [item]
      assert Items.list_item(other_scope) == [other_item]
    end

    test "get_item!/2 returns the item with given id" do
      scope = user_scope_fixture()
      item = item_fixture(scope)
      other_scope = user_scope_fixture()
      assert Items.get_item!(scope, item.id) == item
      assert_raise Ecto.NoResultsError, fn -> Items.get_item!(other_scope, item.id) end
    end

    test "create_item/2 with valid data creates a item" do
      valid_attrs = %{extra: %{}, name: "some name", type: "some type", path: "some path", description: "some description", settings: %{}}
      scope = user_scope_fixture()

      assert {:ok, %Item{} = item} = Items.create_item(scope, valid_attrs)
      assert item.extra == %{}
      assert item.name == "some name"
      assert item.type == "some type"
      assert item.path == "some path"
      assert item.description == "some description"
      assert item.settings == %{}
      assert item.user_id == scope.user.id
    end

    test "create_item/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = Items.create_item(scope, @invalid_attrs)
    end

    test "update_item/3 with valid data updates the item" do
      scope = user_scope_fixture()
      item = item_fixture(scope)
      update_attrs = %{extra: %{}, name: "some updated name", type: "some updated type", path: "some updated path", description: "some updated description", settings: %{}}

      assert {:ok, %Item{} = item} = Items.update_item(scope, item, update_attrs)
      assert item.extra == %{}
      assert item.name == "some updated name"
      assert item.type == "some updated type"
      assert item.path == "some updated path"
      assert item.description == "some updated description"
      assert item.settings == %{}
    end

    test "update_item/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      item = item_fixture(scope)

      assert_raise MatchError, fn ->
        Items.update_item(other_scope, item, %{})
      end
    end

    test "update_item/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      item = item_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = Items.update_item(scope, item, @invalid_attrs)
      assert item == Items.get_item!(scope, item.id)
    end

    test "delete_item/2 deletes the item" do
      scope = user_scope_fixture()
      item = item_fixture(scope)
      assert {:ok, %Item{}} = Items.delete_item(scope, item)
      assert_raise Ecto.NoResultsError, fn -> Items.get_item!(scope, item.id) end
    end

    test "delete_item/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      item = item_fixture(scope)
      assert_raise MatchError, fn -> Items.delete_item(other_scope, item) end
    end

    test "change_item/2 returns a item changeset" do
      scope = user_scope_fixture()
      item = item_fixture(scope)
      assert %Ecto.Changeset{} = Items.change_item(scope, item)
    end
  end
end
