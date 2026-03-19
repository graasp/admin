defmodule Admin.RecycledItemDataTest do
  use Admin.DataCase, async: true

  import Admin.AccountsFixtures, only: [user_scope_fixture: 0]

  describe "get_expired/1" do
    test "returns expired trash item paths" do
      scope = user_scope_fixture()

      # given
      # create some trash items with different creation dates
      {item_1, recycled_item_1} =
        Admin.RecycledItemDataFixtures.recycled_item_fixture(scope, %{}, %{
          created_at: DateTime.add(DateTime.utc_now(), -94, :day)
        })

      {item_2, recycled_item_2} =
        Admin.RecycledItemDataFixtures.recycled_item_fixture(scope, %{}, %{
          created_at: DateTime.add(DateTime.utc_now(), -7, :day)
        })

      recycled_item_1 = Admin.Repo.preload(recycled_item_1, [:item])
      assert recycled_item_1.item.path == item_1.path

      recycled_item_2 = Admin.Repo.preload(recycled_item_2, [:item])
      assert recycled_item_2.item.path == item_2.path

      # when
      expired_paths = Admin.RecycledItems.get_expired()

      # then
      assert expired_paths == [item_1.path]
    end
  end
end
