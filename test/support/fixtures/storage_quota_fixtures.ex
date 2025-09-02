defmodule Admin.StorageQuotaFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.StorageQuota` context.
  """

  @doc """
  Generate a quota.
  """
  def quota_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        value: 120.5
      })

    {:ok, quota} = Admin.StorageQuota.create_quota(scope, attrs)
    quota
  end
end
