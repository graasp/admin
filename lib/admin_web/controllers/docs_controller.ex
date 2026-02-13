defmodule AdminWeb.DocsController do
  use AdminWeb, :controller

  alias Admin.Docs

  def index(conn, %{"tag" => tag}) do
    pages = Docs.with_tag(tag, conn.assigns[:locale])

    render(conn, :search,
      page_title: pgettext("page_title", "Search Documentation"),
      tag: tag,
      pages: pages
    )
  end

  def index(conn, _params) do
    sections = Docs.for_locale_by_sections(conn.assigns[:locale])

    render(conn, :index, sections: sections)
  end

  def show(conn, %{"id" => id}) do
    page = Docs.get_page_by_id!(id)
    render(conn, :show, page: page, page_title: page.title)
  end
end
