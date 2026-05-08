defmodule AdminWeb.ClientController do
  use AdminWeb, :controller

  def index(conn, _params) do
    conn
    |> put_resp_content_type("text/html")
    |> send_resp(200, render_react_app())
  end

  # Serve the index.html file as-is and let React
  # take care of the rendering and client-side routing.
  #
  # Potential improvement: Cache the file contents here
  # in an ETS table so we don't read from the disk for every request.
  defp render_react_app do
    env = %{
      RECAPTCHA_SITE_KEY: Application.get_env(:admin, :recaptcha_site_key)
    }

    Application.app_dir(:admin, "priv/static/client/index.html")
    |> File.read!()
    |> String.replace(
      "<!--__ENV__-->",
      "<script>window.__ENV__ = #{Jason.encode!(env)};</script>"
    )
  end
end
