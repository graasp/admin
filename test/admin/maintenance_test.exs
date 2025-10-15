defmodule Admin.MaintenanceTest do
  use Admin.DataCase

  alias Admin.Maintenance

  describe "maintenance" do
    alias Admin.Maintenance.PlannedMaintenance

    import Admin.MaintenanceFixtures

    @invalid_attrs %{slug: nil, start_at: nil, end_at: nil}

    test "list_upcoming_maintenance/0 returns all maintenance" do
      planned_maintenance = planned_maintenance_fixture()
      assert Maintenance.list_upcoming_maintenance() == [planned_maintenance]
    end

    test "get_planned_maintenance!/1 returns the planned_maintenance with given id" do
      planned_maintenance = planned_maintenance_fixture()
      assert Maintenance.get_planned_maintenance!(planned_maintenance.slug) == planned_maintenance
    end

    test "create_planned_maintenance/1 with valid data creates a planned_maintenance" do
      valid_attrs = %{
        slug: "some slug",
        start_at: ~U[2023-01-01 00:00:00Z],
        end_at: ~U[2023-01-02 00:00:00Z]
      }

      assert {:ok, %PlannedMaintenance{} = planned_maintenance} =
               Maintenance.create_planned_maintenance(valid_attrs)

      assert planned_maintenance.slug == "some slug"
      assert planned_maintenance.start_at == ~U[2023-01-01 00:00:00Z]
      assert planned_maintenance.end_at == ~U[2023-01-02 00:00:00Z]
    end

    test "create_planned_maintenance/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Maintenance.create_planned_maintenance(@invalid_attrs)
    end

    test "update_planned_maintenance/2 with valid data updates the planned_maintenance" do
      planned_maintenance = planned_maintenance_fixture()
      update_attrs = %{slug: "some updated slug"}

      assert {:ok, %PlannedMaintenance{} = updated_planned_maintenance} =
               Maintenance.update_planned_maintenance(planned_maintenance, update_attrs)

      # slug is updated
      assert updated_planned_maintenance.slug == "some updated slug"
      # dates stay the same (not updated in the changeset)
      assert updated_planned_maintenance.start_at == planned_maintenance.start_at
      assert updated_planned_maintenance.end_at == planned_maintenance.end_at
    end

    test "update_planned_maintenance/2 with invalid data returns error changeset" do
      planned_maintenance = planned_maintenance_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Maintenance.update_planned_maintenance(planned_maintenance, @invalid_attrs)

      assert planned_maintenance == Maintenance.get_planned_maintenance!(planned_maintenance.id)
    end

    test "delete_planned_maintenance/1 deletes the planned_maintenance" do
      planned_maintenance = planned_maintenance_fixture()

      assert {:ok, %PlannedMaintenance{}} =
               Maintenance.delete_planned_maintenance(planned_maintenance)

      assert_raise Ecto.NoResultsError, fn ->
        Maintenance.get_planned_maintenance!(planned_maintenance.id)
      end
    end

    test "change_planned_maintenance/1 returns a planned_maintenance changeset" do
      planned_maintenance = planned_maintenance_fixture()
      assert %Ecto.Changeset{} = Maintenance.change_planned_maintenance(planned_maintenance)
    end
  end
end
