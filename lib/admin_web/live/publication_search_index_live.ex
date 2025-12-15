defmodule AdminWeb.PublicationSearchIndexLive do
  use AdminWeb, :live_view

  alias Admin.Publications.SearchIndex

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <div class="p-6">
        <h1 class="text-2xl font-semibold mb-4">Index Status</h1>
        <p class="mb-4">You can start a reindex of the library index. This is useful if your search engine is not up to date.</p>
        <div role="alert" class="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>This operation is heavy on the database and might take some time to complete.</span>
        </div>
        <p class="my-4">{(@status || "")} </p>
        <div>
          <button phx-click="reindex" class="px-4 py-2 disabled:bg-gray-600 bg-blue-600 text-white rounded" disabled={@indexing}>
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
        {:noreply, assign(socket, indexing: true, status: "Reindex has started. It might take some time to complete.")}

      {:error, reason} ->
        {:noreply, assign(socket, indexing: false, status: "Reindex failed with error #{inspect(reason)}")}
    end
  end
end
