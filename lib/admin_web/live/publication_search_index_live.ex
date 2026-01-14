defmodule AdminWeb.PublicationSearchIndexLive do
  use AdminWeb, :live_view

  alias Admin.Publications.SearchIndex

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Index Status
        <:subtitle>
          You can start a reindex of the library index. This is useful if your search engine is not up to date.
        </:subtitle>
      </.header>

      <div class="flex flex-col gap-2">
        <div role="alert" class="alert alert-warning">
          <.icon name="hero-exclamation-triangle" />
          <span>This operation is heavy on the database and might take some time to complete.</span>
        </div>

        <p class="">{@status || ""}</p>

        <.button
          variant="primary"
          class="w-fit"
          phx-click="reindex"
          disabled={@indexing}
        >
          Start Reindex
        </.button>
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
