defmodule AdminWeb.RedirectionControllerTest do
  use AdminWeb.ConnCase, async: true

  test "path to marketing page that does not exist", %{conn: conn} do
    conn = get(conn, "/library")
    assert redirected_to(conn) == "https://library.graasp.org"
  end
end
