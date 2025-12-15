defmodule Admin.Publications.PublicationSearchIndexTest do
  use ExUnit.Case, async: true

  alias Admin.Publications.PublicationSearchIndex

  setup do
    # ensure we start with a clean client config
    Application.delete_env(:admin, :publication_index_http_client)
    :ok
  end

  test "returns error when url is missing" do
    Application.delete_env(:admin, :publication_index_url)
    Application.put_env(:admin, :publication_index_header_value, "token")

    assert {:error, :missing_publication_index_url} = PublicationSearchIndex.reindex()
  end

  test "returns error when header value is missing" do
    Application.put_env(:admin, :publication_index_url, "http://example")
    Application.delete_env(:admin, :publication_index_header_value)

    assert {:error, :missing_publication_index_header_value} = PublicationSearchIndex.reindex()
  end

  test "returns ok on 2xx response" do
    Application.put_env(:admin, :publication_index_url, "http://example")
    Application.put_env(:admin, :publication_index_header_value, "token")

    client =
      Module.concat([__MODULE__, :SuccessClient])

    defmodule client do
      def get(_url, _opts) do
        resp = %Req.Response{status: 200, body: "ok"}
        {:ok, resp}
      end
    end

    Application.put_env(:admin, :publication_index_http_client, client)

    assert {:ok, resp} = PublicationSearchIndex.reindex()
    assert resp.status == 200
  end

  test "returns error on non-2xx response" do
    Application.put_env(:admin, :publication_index_url, "http://example")
    Application.put_env(:admin, :publication_index_header_value, "token")

    client = Module.concat([__MODULE__, :BadResponseClient])

    defmodule client do
      def get(_url, _opts) do
        resp = %Req.Response{status: 500, body: "nope"}
        {:ok, resp}
      end
    end

    Application.put_env(:admin, :publication_index_http_client, client)

    assert {:error, 500} = PublicationSearchIndex.reindex()
  end

  test "returns error tuple when client errors" do
    Application.put_env(:admin, :publication_index_url, "http://example")
    Application.put_env(:admin, :publication_index_header_value, "token")

    client = Module.concat([__MODULE__, :ErrClient])

    defmodule client do
      def get(_url, _opts) do
        {:error, :econnrefused}
      end
    end

    Application.put_env(:admin, :publication_index_http_client, client)

    assert {:error, :econnrefused} = PublicationSearchIndex.reindex()
  end
end
