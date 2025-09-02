defmodule Admin.StorageQuotaTest do
  use Admin.DataCase

  alias Admin.StorageQuota

  describe "quotas" do
    alias Admin.StorageQuota.Quota

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.StorageQuotaFixtures

    @invalid_attrs %{value: nil}

    test "list_quotas/1 returns all scoped quotas" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      quota = quota_fixture(scope)
      other_quota = quota_fixture(other_scope)
      assert StorageQuota.list_quotas(scope) == [quota]
      assert StorageQuota.list_quotas(other_scope) == [other_quota]
    end

    test "get_quota!/2 returns the quota with given id" do
      scope = user_scope_fixture()
      quota = quota_fixture(scope)
      other_scope = user_scope_fixture()
      assert StorageQuota.get_quota!(scope, quota.id) == quota
      assert_raise Ecto.NoResultsError, fn -> StorageQuota.get_quota!(other_scope, quota.id) end
    end

    test "create_quota/2 with valid data creates a quota" do
      valid_attrs = %{value: 120.5}
      scope = user_scope_fixture()

      assert {:ok, %Quota{} = quota} = StorageQuota.create_quota(scope, valid_attrs)
      assert quota.value == 120.5
      assert quota.user_id == scope.user.id
    end

    test "create_quota/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = StorageQuota.create_quota(scope, @invalid_attrs)
    end

    test "update_quota/3 with valid data updates the quota" do
      scope = user_scope_fixture()
      quota = quota_fixture(scope)
      update_attrs = %{value: 456.7}

      assert {:ok, %Quota{} = quota} = StorageQuota.update_quota(scope, quota, update_attrs)
      assert quota.value == 456.7
    end

    test "update_quota/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      quota = quota_fixture(scope)

      assert_raise MatchError, fn ->
        StorageQuota.update_quota(other_scope, quota, %{})
      end
    end

    test "update_quota/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      quota = quota_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = StorageQuota.update_quota(scope, quota, @invalid_attrs)
      assert quota == StorageQuota.get_quota!(scope, quota.id)
    end

    test "delete_quota/2 deletes the quota" do
      scope = user_scope_fixture()
      quota = quota_fixture(scope)
      assert {:ok, %Quota{}} = StorageQuota.delete_quota(scope, quota)
      assert_raise Ecto.NoResultsError, fn -> StorageQuota.get_quota!(scope, quota.id) end
    end

    test "delete_quota/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      quota = quota_fixture(scope)
      assert_raise MatchError, fn -> StorageQuota.delete_quota(other_scope, quota) end
    end

    test "change_quota/2 returns a quota changeset" do
      scope = user_scope_fixture()
      quota = quota_fixture(scope)
      assert %Ecto.Changeset{} = StorageQuota.change_quota(scope, quota)
    end
  end
end
