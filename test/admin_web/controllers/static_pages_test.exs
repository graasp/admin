defmodule AdminWeb.StaticPagesControllerTest do
  use AdminWeb.ConnCase, async: true

  defp get_title(conn) do
    html_response(conn, 200) |> Floki.parse_document!() |> Floki.find("h1") |> Floki.text()
  end

  describe "privacy policy" do
    test "GET /privacy", %{conn: conn} do
      conn = get(conn, "/privacy")
      assert get_title(conn) == "Privacy Policy"
    end

    test "redirects to english when lang is not supported", %{conn: conn} do
      # allows to pre-seed the session value with a specific local
      conn = conn |> Plug.Test.init_test_session(%{locale: "fr"})
      conn = get(conn, "/fr/privacy")
      assert redirected_to(conn) == "/privacy"
    end
  end

  describe "Terms page" do
    test "GET /terms", %{conn: conn} do
      conn = get(conn, "/terms")
      assert get_title(conn) == "Terms of Service"
    end

    test "GET /fr/terms", %{conn: conn} do
      conn = get(conn, "/fr/terms")

      assert get_title(conn) == "Conditions d'utilisation"
    end
  end

  describe "Disclaimer page" do
    test "GET /disclaimer", %{conn: conn} do
      conn = get(conn, "/disclaimer")
      assert get_title(conn) == "Disclaimer"
    end

    test "GET /fr/disclaimer", %{conn: conn} do
      conn = get(conn, "/fr/disclaimer")
      assert get_title(conn) == "Clause de non-responsabilité"
    end
  end
end
