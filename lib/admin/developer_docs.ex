defmodule Admin.DeveloperDocs do
  alias Admin.Docs.DevPage

  use NimblePublisher,
    build: DevPage,
    from: Application.app_dir(:admin, "priv/developer_docs/**/*.md"),
    as: :pages

  use Admin.Docs.Sections, path: "priv/developer_docs"

  @pages Enum.sort(@pages, &(&1.order <= &2.order))

  def all_pages do
    @pages
  end

  def by_section() do
    all_pages() |> Enum.group_by(& &1.section)
  end

  def get_page_by_id!(id) do
    Enum.find(all_pages(), fn page -> page.id == id end) ||
      raise AdminWeb.NotFoundError, "page with id=#{id} not found"
  end
end
