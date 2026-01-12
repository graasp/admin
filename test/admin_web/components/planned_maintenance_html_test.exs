defmodule AdminWeb.PlannedMaintenanceHTMLTest do
  use AdminWeb.ConnCase, async: true

  import Phoenix.Template
  import Admin.MaintenanceFixtures

  test "Planned Maintenance row" do
    planned_maintenance =
      planned_maintenance_fixture(%{
        slug: "change_db"
      })

    html =
      render_to_string(AdminWeb.PlannedMaintenanceHTML, "planned_maintenance_row", "html", %{
        maintenance: planned_maintenance
      })

    assert html =~ planned_maintenance.slug
    assert html =~ "#{planned_maintenance.start_at}"
    assert html =~ "#{planned_maintenance.end_at}"
  end
end
