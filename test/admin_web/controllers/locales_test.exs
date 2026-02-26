defmodule AdminWeb.LocaleTest do
  use AdminWeb.ConnCase, async: true

  test "request with german locale serves page in German", %{conn: conn} do
    conn = conn |> put_req_header("accept-language", "de-DE,de;q=0.9") |> get(~p"/")
    assert html_response(conn, 200) =~ "lang=\"de\""
  end

  test "set locale", %{conn: conn} do
    conn =
      conn
      |> put_req_header("referer", "/")
      |> post(~p"/locale", %{"locale" => "de"})

    assert redirected_to(conn) == ~p"/"

    # get the home page with the updated conn to check the lang has been updated
    conn = get(conn, ~p"/")
    assert html_response(conn, 200) =~ "lang=\"de\""
  end

  test "set locale with undefined referer", %{conn: conn} do
    conn =
      conn
      |> put_req_header("referer", "/other")
      |> post(~p"/locale", %{"locale" => "de"})

    assert redirected_to(conn) == "/other"
  end
end
