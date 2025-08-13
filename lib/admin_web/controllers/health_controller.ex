defmodule AdminWeb.HealthController do
  use AdminWeb, :controller

  def up(conn, _params) do
    send_resp(conn, 200, "OK")
  end
end
