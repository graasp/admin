defmodule AdminWeb.AdminController do
  use AdminWeb, :controller

  alias Admin.Tools.Uptime

  def home(conn, _params) do
    render(conn, :home, page_title: pgettext("page title", "Admin"))
  end

  def about(conn, _params) do
    specs = %{
      name: Application.spec(:admin, :description),
      version: Application.spec(:admin, :vsn),
      uptime: Uptime.get()
    }

    render(conn, :about,
      page_title: pgettext("page title", "About"),
      specs: specs
    )
  end
end
