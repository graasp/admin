defmodule AdminWeb.DocsController do
  use AdminWeb, :controller

  alias Admin.DeveloperDocs
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

    render(conn, :index,
      page_title: pgettext("page_title", "Documentation"),
      page_description:
        pgettext(
          "page_description",
          "The documentation for the Graasp products and services."
        ),
      sections: sections
    )
  end

  def index_dev(conn, _params) do
    sections = DeveloperDocs.by_section()

    render(conn, :index_dev,
      page_title: pgettext("page_title", "Developer Documentation"),
      page_description:
        pgettext(
          "page_description",
          "The documentation for the developer to work on and improve the Graasp platformand services."
        ),
      sections: sections
    )
  end

  def show(conn, %{"id" => id}) do
    page = Docs.get_page_by_id!(id)

    render(conn, :show,
      page_title: page.title,
      page_description: page.description,
      page: page
    )
  end

  def show_dev(conn, %{"id" => id}) do
    page = DeveloperDocs.get_page_by_id!(id)

    render(conn, :show_dev,
      page_title: page.title,
      page_description: page.description,
      page: page
    )
  end
end
