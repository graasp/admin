defmodule Admin.Publications.SearchIndex do
  @moduledoc """
  Utilities to trigger a publication reindex on an external indexing endpoint.

  It expects the following application config in `:admin`:

    config :admin, :publications,
      publication_index_url
      publication_index_header_value

  """

  require Logger

  defp http_client, do: Application.get_env(:admin, :publication_index_http_client, Req)

  @doc """
  Trigger a reindex by calling the configured endpoint with the configured header.

  Returns `{:ok, %Req.Response{}}` on success or `{:error, error_code}` on failure.
  """
  def reindex do
    with {:ok, client, url, headers} <- build_reindex_request() do

      req = client.new(method: :get, url: url, headers: headers)

      IO.puts("Reindex request: #{inspect(req)}")

      case client.request(req) do
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
  # Build the HTTP client, url, and headers for the reindex request.
  defp build_reindex_request do

    case Application.get_env(:admin, :backend_host) do
      nil ->
        {:error, :missing_publication_index_url}

        url ->
          case Application.get_env(:admin, :publication_reindex_headers) do
            :error ->
              {:error, :missing_publication_index_header_value}

          headers_value ->
            client = http_client()
            {:ok, client, "http://#{url}/items/collections/search/rebuild", headers_value}
        end
    end
  end
end
