defmodule AdminWeb.HealthController do
  use AdminWeb, :controller

  def up(conn, _params) do
    conn |> put_resp_header("content-type", "text/plain") |> send_resp(200, "OK")
  end
end
