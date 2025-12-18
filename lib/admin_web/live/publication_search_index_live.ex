defmodule AdminWeb.PublicationSearchIndexLive do
  use AdminWeb, :live_view

  alias Admin.Publications.SearchIndex

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <div class="p-6">
        <.header>
          Index Status
          <:subtitle>
            You can start a reindex of the library index. This is useful if your search engine is not up to date.
          </:subtitle>
        </.header>
        <div role="alert" class="alert alert-warning">
          <.icon name="hero-exclamation-triangle" />
          <span>This operation is heavy on the database and might take some time to complete.</span>
        </div>
        <p class="my-4">{@status || ""}</p>
        <div>
          <button
            phx-click="reindex"
            class="px-4 py-2 disabled:bg-gray-600 bg-blue-600 text-white rounded"
            disabled={@indexing}
          >
            Start Reindex
          </button>
        </div>
      </div>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, status: nil, indexing: false)}
  end

  @impl true
  def handle_event("reindex", _params, socket) do
    case SearchIndex.reindex() do
      {:ok, _resp} ->
        {:noreply,
         assign(socket,
           indexing: true,
           status: "Reindex has started. It might take some time to complete."
         )}

      {:error, reason} ->
        {:noreply,
         assign(socket,
           indexing: false,
           status: "Reindex failed with error #{inspect(reason)}"
         )}
    end
  end
end
