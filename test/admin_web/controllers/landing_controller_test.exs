defmodule Admin.LandingControllerTest do
  use AdminWeb.ConnCase

  describe "GET /" do
    test "renders the landing page", %{conn: conn} do
      conn = get(conn, "/")
      assert html_response(conn, 200) =~ "Graasp"
    end
  end

  describe "GET /about-us" do
    test "renders the about-us page", %{conn: conn} do
      conn = get(conn, "/about-us")
      assert html_response(conn, 200) =~ "Meet the people behind Graasp"
    end
  end

  describe "GET /contact-us" do
    test "renders the contact-us page", %{conn: conn} do
      conn = get(conn, "/contact")
      assert html_response(conn, 200) =~ "Contact us"
    end
  end

  describe "GET /admin" do
    test "renders the admin page", %{conn: conn} do
      conn = get(conn, "/admin")
      assert html_response(conn, 200) =~ "Admin"
    end
  end
end
