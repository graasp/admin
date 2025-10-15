defmodule Admin.MaintenanceFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Maintenance` context.
  """

  @doc """
  Generate a planned_maintenance.
  """
  def planned_maintenance_fixture(attrs \\ %{}) do
    {:ok, planned_maintenance} =
      attrs
      |> Enum.into(%{
        slug: "some slug",
        start_at: DateTime.utc_now() |> DateTime.add(2, :day) |> DateTime.to_iso8601(),
        end_at: DateTime.utc_now() |> DateTime.add(3, :day) |> DateTime.to_iso8601()
      })
      |> Admin.Maintenance.create_planned_maintenance()

    planned_maintenance
  end
end
