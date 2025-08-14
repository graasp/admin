defmodule AdminWeb.HealthControllerTest do
  use AdminWeb.ConnCase, async: true

  describe "GET /up" do
    test "replies with OK", %{conn: conn} do
      conn = get(conn, ~p"/up")
      assert text_response(conn, 200) =~ "OK"
    end
  end
end
