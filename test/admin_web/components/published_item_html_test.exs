defmodule AdminWeb.PublishedItemHTMLTest do
  use AdminWeb.ConnCase, async: true

  import Phoenix.Template
  import Admin.PublicationsFixtures

  setup :register_and_log_in_user

  test "Publication row", %{scope: scope} do
    publication =
      published_item_fixture(scope, %{
        name: "Mathematics course",
        description: "A mathematics course for beginners"
      })

    html =
      render_to_string(AdminWeb.PublishedItemHTML, "publication_row", "html", %{
        publication: publication
      })

    assert html =~ publication.name
    assert html =~ publication.description
  end
end
