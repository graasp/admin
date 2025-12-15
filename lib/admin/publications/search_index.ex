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
    url = Application.get_env(:admin, :publication_index_url)

    if is_nil(url) do
      {:error, :missing_publication_index_url}
    else
      case Application.fetch_env(:admin, :publication_index_header_value) do
        :error ->
          {:error, :missing_publication_index_header_value}

        {:ok, header_value} ->
          headers = [{"meilisearch-rebuild", header_value}]

          case http_client().get(url, headers: headers) do
            {:ok, resp} ->
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
  end
end
