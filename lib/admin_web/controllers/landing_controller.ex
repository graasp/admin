defmodule AdminWeb.LandingController do
  use AdminWeb, :controller

  alias AdminWeb.Plugs.Locale

  def index(conn, _params) do
    render(conn, :index)
  end

  def about(conn, _params) do
    render(conn, :about)
  end

  def contact(conn, _params) do
    render(conn, :contact)
  end

  def locale(conn, _params) do
    session_locale = Locale.get_session_locale(conn)
    http_locale = Locale.get_http_locale(conn)

    render(conn, :locale,
      session_locale: session_locale,
      http_locale: http_locale
    )
  end

  def change_locale(conn, %{"locale" => locale}) do
    referrer = conn |> get_req_header("referer") |> List.first()

    conn
    |> Locale.set_locale(locale)
    |> redirect(external: referrer)
  end

  def remove_locale(conn, _params) do
    conn
    |> Locale.set_locale(nil)
    |> redirect(to: ~p"/locale")
  end
end
