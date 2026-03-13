defmodule AdminWeb.AdminController do
  use AdminWeb, :controller

  def home(conn, _params) do
    render(conn, :home, page_title: pgettext("page title", "Admin"))
  end
end
