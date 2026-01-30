defmodule AdminWeb.StaticPagesControllerTest do
  use AdminWeb.ConnCase, async: true

  describe "privacy policy" do
    test "GET /privacy", %{conn: conn} do
      conn = get(conn, "/privacy")
      assert html_response(conn, 200) =~ "Privacy Policy"
    end

    test "redirects to english when lang is not supported", %{conn: conn} do
      conn = conn |> Plug.Test.init_test_session(%{locale: "fr"})
      conn = get(conn, "/fr/privacy")
      assert redirected_to(conn) == "/privacy"
    end
  end

  test "GET /terms", %{conn: conn} do
    conn = get(conn, "/terms")
    assert html_response(conn, 200) =~ "Terms of Service"
  end
end
