defmodule Admin.Publications.SearchIndexConfig.Behaviour do
  @moduledoc """
  Behaviour defining configuration accessors for the Publication Search Index.

  These are defined as a behaviour to be able to use the Mox library in tests.
  This way we can set different values without tempering with the application
  config which is a bad idea if you want to run tests in parallel.
  """
  @callback backend_origin() :: String.t()
  @callback publication_reindex_headers() :: term()
end

defmodule Admin.Publications.SearchIndexConfig do
  @moduledoc """
  Default implementation of the `SearchIndexConfig.Behaviour` that reads from the application config.

  """
  @behaviour Admin.Publications.SearchIndexConfig.Behaviour

  @impl true
  def backend_origin do
    Application.get_env(:admin, :backend_origin)
  end

  @impl true
  def publication_reindex_headers do
    Application.get_env(:admin, :publication_reindex_headers)
  end
end

defmodule Admin.Publications.SearchIndex do
  @moduledoc """
  Module handling search index management allowing for example to trigger a publication reindex on an external indexing endpoint.

  """

  require Logger

  # get the search index config. This allows to use test doubles.
  @config Application.compile_env(
            :admin,
            [:test_doubles, :search_config],
            Admin.Publications.SearchIndexConfig
          )

  defp get_reindex_opts do
    Application.get_env(:admin, :publication_reindex_opts, [])
  end

  @doc """
  Trigger a reindex by calling the configured endpoint with the configured header.

  Returns `{:ok, %Req.Response{}}` on success or `{:error, error_code}` on failure.
  """
  # credo:disable-for-next-line Credo.Check.Refactor.Nesting
  def reindex do
    with {:ok, url} <- get_reindex_url(@config.backend_origin()),
         {:ok, headers} <- get_reindex_headers(@config.publication_reindex_headers()) do
      req =
        [method: :get, url: url, headers: headers]
        |> Keyword.merge(get_reindex_opts())
        |> Req.new()

      case Req.request(req) do
        {:ok, %Req.Response{} = resp} ->
          if resp.status in 200..299 do
            {:ok, resp}
          else
            Logger.error("SearchIndex.reindex failed: #{inspect(resp)}")
            {:error, resp.status}
          end

        {:error, reason} ->
          Logger.error("SearchIndex.reindex failed: #{inspect(reason)}")
          {:error, 500}
      end
    end
  end

  defp get_reindex_url(nil), do: {:error, :missing_publication_index_host}
  defp get_reindex_url(origin), do: {:ok, "#{origin}/api/items/collections/search/rebuild"}

  defp get_reindex_headers(nil), do: {:error, :missing_publication_reindex_headers}
  defp get_reindex_headers(headers), do: {:ok, headers}
end
