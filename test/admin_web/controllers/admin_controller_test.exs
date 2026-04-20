defmodule AdminWeb.AdminControllerTest do
  use AdminWeb.ConnCase

  describe "Public access denied" do
    test "GET /about not allowed for public", %{conn: conn} do
      conn = get(conn, ~p"/admin/about")
      assert redirected_to(conn) == ~p"/admin/users/log-in"
    end
  end

  describe "Authenticated admins" do
    setup :register_and_log_in_user

    test "GET /about", %{conn: conn} do
      conn = get(conn, ~p"/admin/about")
      assert html_response(conn, 200) =~ "Name: "
    end
  end
end
