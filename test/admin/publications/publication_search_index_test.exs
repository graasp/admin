defmodule Admin.Publications.PublicationSearchIndexTest do
  use ExUnit.Case

  import Mox

  alias Admin.Publications.SearchIndex

  setup :verify_on_exit!

  test "returns error when url is missing" do
    expect(SearchIndexConfigMock, :backend_host, fn -> nil end)

    assert {:error, :missing_publication_index_host} = SearchIndex.reindex()
  end

  test "returns error when header value is missing" do
    expect(SearchIndexConfigMock, :backend_host, fn -> "example.com" end)
    expect(SearchIndexConfigMock, :publication_reindex_headers, fn -> nil end)

    assert {:error, :missing_publication_reindex_headers} = SearchIndex.reindex()
  end

  test "returns ok on 2xx response" do
    expect(SearchIndexConfigMock, :backend_host, fn -> "example.com" end)

    expect(SearchIndexConfigMock, :publication_reindex_headers, fn ->
      [{"meilisearch-rebuild", "secret"}]
    end)

    Req.Test.stub(Admin.Publications.SearchIndex, fn conn ->
      Req.Test.json(conn, %{"ok" => true})
    end)

    assert {:ok, resp} = SearchIndex.reindex()
    assert resp.status == 200
  end

  test "returns error on non-2xx response" do
    expect(SearchIndexConfigMock, :backend_host, fn -> "example.com" end)

    expect(SearchIndexConfigMock, :publication_reindex_headers, fn ->
      [{"meilisearch-rebuild", "secret"}]
    end)

    Req.Test.stub(Admin.Publications.SearchIndex, fn conn ->
      Plug.Conn.send_resp(conn, 500, "nope")
    end)

    assert {:error, 500} = SearchIndex.reindex()
  end

  test "returns error tuple when client errors" do
    expect(SearchIndexConfigMock, :backend_host, fn -> "example.com" end)

    expect(SearchIndexConfigMock, :publication_reindex_headers, fn ->
      [{"meilisearch-rebuild", "secret"}]
    end)

    Req.Test.stub(Admin.Publications.SearchIndex, fn conn ->
      Req.Test.transport_error(conn, :econnrefused)
    end)

    assert {:error, 500} = SearchIndex.reindex()
  end
end
