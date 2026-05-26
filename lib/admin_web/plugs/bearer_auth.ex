defmodule AdminWeb.Plugs.BearerAuth do
  @moduledoc """
  Plug that validates a shared secret passed as a Bearer token in the Authorization header.
  Returns 401 Unauthorized when the token is missing or invalid.
  """
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    shared_secret = Application.get_env(:admin, :admin_shared_secret)

    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         true <- shared_secret != nil and token == shared_secret do
      conn
    else
      _ ->
        conn
        |> send_resp(:unauthorized, "")
        |> halt()
    end
  end
end
