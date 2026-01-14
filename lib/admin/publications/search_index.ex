defmodule Admin.Publications.SearchIndexConfig.Behaviour do
  @moduledoc """
  Behaviour defining configuration accessors for the Publication Search Index.

  """
  @callback backend_host() :: String.t()
  @callback publication_reindex_headers() :: term()
end

defmodule Admin.Publications.SearchIndexConfig do
  @moduledoc """
  Default implementation of the SearchIndexConfigBehavior that reads from application config.

  """
  @behaviour Admin.Publications.SearchIndexConfig.Behaviour

  @impl true
  def backend_host do
    Application.get_env(:admin, :backend_host)
  end

  @impl true
  def publication_reindex_headers do
    Application.get_env(:admin, :publication_reindex_headers)
  end
end

defmodule Admin.Publications.SearchIndex do
  @moduledoc """
  Utilities to trigger a publication reindex on an external indexing endpoint.

  """

  require Logger

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
  def reindex do
    with {:ok, url} <- get_reindex_url(@config.backend_host()),
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
  defp get_reindex_url(url), do: {:ok, "http://#{url}/api/items/collections/search/rebuild"}

  defp get_reindex_headers(nil), do: {:error, :missing_publication_reindex_headers}
  defp get_reindex_headers(headers), do: {:ok, headers}
end
