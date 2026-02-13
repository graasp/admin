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
    {%{"" => intro}, sections} = Map.split(sections, [""])

    render(conn, :index,
      page_title: pgettext("page_title", "Documentation"),
      page_description:
        pgettext(
          "page_description",
          "The documentation for the Graasp products and services."
        ),
      intro: intro,
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
end
