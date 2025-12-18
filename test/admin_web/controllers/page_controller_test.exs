defmodule AdminWeb.PageControllerTest do
  use AdminWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, ~p"/admin")
    assert html_response(conn, 200) =~ "Admin"
  end

  describe "Authenticated routes" do
    setup :register_and_log_in_user

    test "GET /dashboard", %{conn: conn} do
      conn = get(conn, ~p"/admin/dashboard")
      assert html_response(conn, 200) =~ "Recent Publications"
    end
  end
end
