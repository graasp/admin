defmodule AdminWeb.HealthControllerTest do
  use AdminWeb.ConnCase, async: true

  describe "GET /up" do
    test "replies with OK", %{conn: conn} do
      conn = get(conn, ~p"/up")
      assert text_response(conn, 200) =~ "OK"
    end
  end

  describe "GET /health" do
    test "replies with OK", %{conn: conn} do
      conn = get(conn, ~p"/health")
      assert text_response(conn, 200) =~ "OK"
    end
  end

  describe "GET /api/version" do
    test "returns version with valid bearer token", %{conn: conn} do
      conn =
        conn
        |> put_req_header("authorization", "Bearer test-shared-secret")
        |> get(~p"/api/version")

      assert %{"version" => version} = json_response(conn, 200)
      assert is_binary(version)
    end

    test "returns 401 with invalid token", %{conn: conn} do
      conn =
        conn
        |> put_req_header("authorization", "Bearer wrong-secret")
        |> get(~p"/api/version")

      assert response(conn, 401)
    end

    test "returns 401 with no authorization header", %{conn: conn} do
      conn = get(conn, ~p"/api/version")
      assert response(conn, 401)
    end
  end
end
