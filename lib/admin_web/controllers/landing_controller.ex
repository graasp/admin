defmodule AdminWeb.LandingController do
  use AdminWeb, :controller

  alias AdminWeb.Plugs.Locale

  def index(conn, _params) do
    render(conn, :index, page_title: pgettext("page title", "Home"))
  end

  def about(conn, _params) do
    render(conn, :about, page_title: pgettext("page title", "About"))
  end

  def contact(conn, _params) do
    render(conn, :contact, page_title: pgettext("page title", "Contact"))
  end

  def static_page(conn, %{"locale" => locale, "page" => page}) do
    user_locale = conn.assigns.locale

    page_data =
      Admin.StaticPages.get_static_page!(locale, page)

    user_locale_page_exists = Admin.StaticPages.exists?(user_locale, page)

    if is_nil(page_data) do
      redirect(conn, to: ~p"/#{AdminWeb.Gettext.default_locale()}/#{page}")
    else
      assigns = [
        page_title: page_data.title,
        page: page_data,
        locale: locale,
        user_locale:
          if user_locale_page_exists do
            user_locale
          else
            ""
          end
      ]

      render(conn, :static_page, assigns)
    end
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
