defmodule AdminWeb.TrashLive.Index do
  use AdminWeb, :live_view

  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <h2 class="text-lg text-bold">Recycled items Statistics</h2>
      <div class="stats stats-vertical sm:stats-horizontal shadow bg-base-100">
        <StatisticsComponents.stat value={@recycled_stats.total} title="Overall">
          Recycled items
        </StatisticsComponents.stat>
        <StatisticsComponents.stat value={@recycled_stats.scheduled} title="Scheduled for deletion">
          Items trashed more than 3 months ago
        </StatisticsComponents.stat>
        <StatisticsComponents.stat value={@recycled_stats.pending} title="Pending">
          Items in user trash for less than 3 months
        </StatisticsComponents.stat>
      </div>
      <p class="text-sm text-muted">These statistics update every 20 seconds.</p>
      <div class="mt-4">
        <button phx-click="run_cleanup" class="btn btn-primary">Run Cleanup</button>
      </div>
      <div class="mt-4">
        <%= if @cleanup_result do %>
          <p>{inspect(@cleanup_result)}</p>
        <% end %>
      </div>
    </Layouts.admin>
    """
  end

  def mount(_params, _session, socket) do
    if connected?(socket) do
      Admin.RecycledItems.subscribe_recycled_items(socket.assigns.current_scope)
    end

    # update page every 20 seconds
    :timer.send_interval(20_000, :update_stats)

    socket =
      socket
      |> assign(:page_title, pgettext("page title", "Trash Management"))
      |> assign(
        :recycled_stats,
        Admin.RecycledItems.get_stats()
      )
      |> assign(:cleanup_result, nil)

    {:ok, socket}
  end

  def handle_event("run_cleanup", _params, socket) do
    %{}
    |> Admin.TrashCleanupWorker.new()
    |> Oban.insert()

    {:noreply, socket}
  end

  def handle_info(:update_stats, socket) do
    socket =
      socket
      |> assign(
        :recycled_stats,
        Admin.RecycledItems.get_stats()
      )

    {:noreply, socket}
  end

  def handle_info({:completed, result}, socket) do
    socket =
      socket
      |> assign(:cleanup_result, result)

    {:noreply, socket}
  end
end
