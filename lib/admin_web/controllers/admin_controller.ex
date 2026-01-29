defmodule AdminWeb.AdminController do
  use AdminWeb, :controller

  def home(conn, _params) do
    render(conn, :home, page_title: pgettext("page title", "Admin"))
  end

  def dashboard(conn, _params) do
    conn =
      conn
      |> assign(
        :publications,
        Admin.Publications.list_published_items(10)
      )
      |> assign(
        :user_stats,
        Admin.Accounts.user_stats()
      )
      |> assign(
        :maintenances,
        Admin.Maintenance.list_upcoming_maintenance()
      )

    render(conn, :dashboard, page_title: pgettext("page title", "Dashboard"))
  end
end
