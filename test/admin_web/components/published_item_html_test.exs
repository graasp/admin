defmodule AdminWeb.PublishedItemHTMLTest do
  use AdminWeb.ConnCase, async: true

  import Phoenix.Template
  import Admin.PublicationsFixtures

  setup :register_and_log_in_user

  test "Publication row", %{scope: scope} do
    publication =
      published_item_fixture(scope, %{
        item: %{
          name: "Mathematics course",
          description: "A mathematics course for beginners"
        }
      })
      |> Admin.Publications.with_item()

    html =
      render_to_string(AdminWeb.PublishedItemHTML, "publication_row", "html", %{
        publication: publication
      })

    assert html =~ publication.item.name
    assert html =~ publication.item.description
  end

  test "Publication Creator", %{scope: scope} do
    publication =
      published_item_fixture(scope, %{
        item: %{
          name: "Mathematics course",
          description: "A mathematics course for beginners"
        }
      })
      |> Admin.Publications.with_creator()

    html =
      render_to_string(AdminWeb.PublishedItemHTML, "publication_creator", "html", %{
        publication: publication
      })

    assert html =~ publication.creator_id
  end
end
