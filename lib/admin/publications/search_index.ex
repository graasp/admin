defmodule Admin.Publications.SearchIndexConfigBehavior do
  @moduledoc """
  Behaviour defining configuration accessors for the Publication Search Index.

  """
  @callback backend_host() :: String.t()
  @callback publication_reindex_headers() :: term()
  @callback publication_reindex_opts() :: term()
end

defmodule Admin.Publications.SearchIndexConfigBehaviorImpl do
  @moduledoc """
  Default implementation of the SearchIndexConfigBehavior that reads from application config.

  """
  @behaviour Admin.Publications.SearchIndexConfigBehavior

  @impl true
  def backend_host do
    Application.get_env(:admin, :backend_host)
  end

  @impl true
  def publication_reindex_headers do
    Application.get_env(:admin, :publication_reindex_headers)
  end

  @impl true
  def publication_reindex_opts do
    Application.get_env(:admin, :publication_reindex_opts)
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
            Admin.Publications.SearchIndexConfigBehaviorImpl
          )

  @doc """
  Trigger a reindex by calling the configured endpoint with the configured header.

  Returns `{:ok, %Req.Response{}}` on success or `{:error, error_code}` on failure.
  """
  def reindex do
    with {:ok, url, headers, opts} <- build_reindex_request() do
      req_opts = [method: :get, url: url, headers: headers] ++ opts
      req = Req.new(req_opts)

      IO.puts("Reindex request: #{inspect(req)}")

      case Req.request(req) do
        %Req.Response{} = resp ->
          if resp.status in 200..299 do
            {:ok, resp}
          else
            Logger.error("SearchIndex.reindex failed: #{inspect(resp)}")
            {:error, resp.status}
          end

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

        other ->
          Logger.error("SearchIndex.reindex unexpected response: #{inspect(other)}")
          {:error, :unexpected_response}
      end
    end
  end

  @doc false
  # Build the HTTP client, url, and headers for the reindex request.
  defp build_reindex_request do
    case @config.backend_host() do
      nil ->
        {:error, :missing_publication_index_url}

      url ->
        case @config.publication_reindex_headers() do
          nil ->
            {:error, :missing_publication_reindex_headers}

          headers_list ->
            opts =
              case @config.publication_reindex_opts() do
                nil -> []
                opt when is_list(opt) -> opt
                other -> [other]
              end

            {:ok, "http://#{to_string(url)}/api/items/collections/search/rebuild", headers_list,
             opts}
        end
    end
  end
end
