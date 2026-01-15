defmodule AdminWeb.PublicationIndexLiveTest do
  use AdminWeb.ConnCase, async: true

  import Phoenix.LiveViewTest

  import Mox

  setup [:verify_on_exit!, :register_and_log_in_user]

  test "shows error when reindex fails", %{conn: conn} do
    expect(SearchIndexConfigMock, :backend_host, fn -> "example.com" end)

    expect(SearchIndexConfigMock, :publication_reindex_headers, fn ->
      [{"meilisearch-rebuild", "secret"}]
    end)

    Req.Test.stub(Admin.Publications.SearchIndex, fn conn ->
      Req.Test.transport_error(conn, :econnrefused)
    end)

    {:ok, view, _html} = live(conn, ~p"/admin/published_items/search_index")

    view |> element("button", "Start Reindex") |> render_click()

    assert render(view) =~ "Reindex failed"
  end

  test "show waitingstatus on success", %{conn: conn} do
    expect(SearchIndexConfigMock, :backend_host, fn -> "example.com" end)

    expect(SearchIndexConfigMock, :publication_reindex_headers, fn ->
      [{"meilisearch-rebuild", "secret"}]
    end)

    Req.Test.stub(Admin.Publications.SearchIndex, fn conn ->
      Req.Test.json(conn, %{"ok" => true})
    end)

    {:ok, view, _html} = live(conn, ~p"/admin/published_items/search_index")

    view |> element("button", "Start Reindex") |> render_click()

    refute render(view) =~ "Reindex failed"

    assert view |> element("button[disabled]", "Start Reindex") |> has_element?()
  end
end
