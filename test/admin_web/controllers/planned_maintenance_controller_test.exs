defmodule AdminWeb.PlannedMaintenanceControllerTest do
  use AdminWeb.ConnCase

  import Admin.MaintenanceFixtures

  @create_attrs %{
    slug: "some-slug",
    start_at: ~U[2023-01-01 00:00:00Z],
    end_at: ~U[2023-01-02 00:00:00Z]
  }
  @update_attrs %{
    slug: "some-updated-slug",
    start_at: ~U[2023-01-02 00:00:00Z],
    end_at: ~U[2023-01-03 00:00:00Z]
  }
  @invalid_attrs %{slug: nil, start_at: nil, end_at: nil}

  setup :register_and_log_in_user

  describe "index" do
    test "lists all maintenance", %{conn: conn} do
      conn = get(conn, ~p"/maintenance")
      assert html_response(conn, 200) =~ "Listing Maintenance"
    end
  end

  describe "new planned_maintenance" do
    test "renders form", %{conn: conn} do
      conn = get(conn, ~p"/maintenance/new")
      assert html_response(conn, 200) =~ "New Planned maintenance"
    end
  end

  describe "create planned_maintenance" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/maintenance", planned_maintenance: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == ~p"/maintenance/#{id}"

      conn = get(conn, ~p"/maintenance/#{id}")
      assert html_response(conn, 200) =~ "Planned maintenance #{id}"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/maintenance", planned_maintenance: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Planned maintenance"
    end
  end

  describe "edit planned_maintenance" do
    setup [:create_planned_maintenance]

    test "renders form for editing chosen planned_maintenance", %{
      conn: conn,
      planned_maintenance: planned_maintenance
    } do
      conn = get(conn, ~p"/maintenance/#{planned_maintenance}/edit")
      assert html_response(conn, 200) =~ "Edit Planned maintenance"
    end
  end

  describe "update planned_maintenance" do
    setup [:create_planned_maintenance]

    test "redirects when data is valid", %{conn: conn, planned_maintenance: planned_maintenance} do
      conn =
        put(conn, ~p"/maintenance/#{planned_maintenance}", planned_maintenance: @update_attrs)

      new_slug = @update_attrs.slug
      assert redirected_to(conn) == ~p"/maintenance/#{new_slug}"

      conn = get(conn, ~p"/maintenance/#{new_slug}")
      assert html_response(conn, 200) =~ "some-updated-slug"
    end

    test "renders errors when data is invalid", %{
      conn: conn,
      planned_maintenance: planned_maintenance
    } do
      conn =
        put(conn, ~p"/maintenance/#{planned_maintenance}", planned_maintenance: @invalid_attrs)

      assert html_response(conn, 200) =~ "Edit Planned maintenance"
    end
  end

  describe "delete planned_maintenance" do
    setup [:create_planned_maintenance]

    test "deletes chosen planned_maintenance", %{
      conn: conn,
      planned_maintenance: planned_maintenance
    } do
      conn = delete(conn, ~p"/maintenance/#{planned_maintenance}")
      assert redirected_to(conn) == ~p"/maintenance"

      assert_error_sent 404, fn ->
        get(conn, ~p"/maintenance/#{planned_maintenance}")
      end
    end
  end

  defp create_planned_maintenance(_) do
    planned_maintenance = planned_maintenance_fixture()

    %{planned_maintenance: planned_maintenance}
  end
end
