defmodule Admin.LandingControllerTest do
  use AdminWeb.ConnCase

  describe "GET /" do
    test "renders the landing page", %{conn: conn} do
      conn = get(conn, "/")
      assert html_response(conn, 200) =~ "Graasp"
    end
  end

  describe "GET /admin" do
    test "renders the admin page", %{conn: conn} do
      conn = get(conn, "/admin")
      assert html_response(conn, 200) =~ "Admin"
    end
  end
end
