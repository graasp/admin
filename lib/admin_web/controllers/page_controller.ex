defmodule AdminWeb.PageController do
  use AdminWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end

  def dashboard(conn, _params) do
    conn =
      conn
      |> assign(
        :publications,
        Admin.Publications.list_published_items(conn.assigns.current_scope)
      )

    render(conn, :dashboard, page_title: "Dashboard")
  end
end
