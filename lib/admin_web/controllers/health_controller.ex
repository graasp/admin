defmodule AdminWeb.HealthController do
  use AdminWeb, :controller

  def up(conn, _params) do
    conn |> put_resp_header("content-type", "text/plain") |> send_resp(200, "OK")
  end

  def version(conn, _params) do
    version = Application.spec(:admin, :vsn) |> to_string()
    json(conn, %{version: version})
  end
end
