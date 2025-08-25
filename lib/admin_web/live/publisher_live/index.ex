defmodule AdminWeb.PublisherLive.Index do
  use AdminWeb, :live_view

  alias Admin.Apps

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Listing Apps by Publishers
        <:actions>
          <.button variant="primary" navigate={~p"/publishers/new"}>
            <.icon name="hero-plus" /> New Publisher
          </.button>
        </:actions>
      </.header>
      <%= for {id, publisher} <- @streams.publishers do %>
        <.header>
          <.link navigate={~p"/publishers/#{publisher.id}"}>
            {publisher.name}
          </.link>
          <:subtitle>Created <.relative_date date={publisher.inserted_at} /></:subtitle>
          <:actions>
            <.button variant="primary" navigate={~p"/publishers/#{publisher.id}/apps/new"}>
              <.icon name="hero-plus" /> New App
            </.button>
          </:actions>
        </.header>
        <%= if Enum.empty?(publisher.apps) do %>
          <p class="text-center text-sm text-secondary">No apps yet.</p>
        <% else %>
          <.table
            id={id}
            rows={publisher.apps}
            row_click={fn app -> JS.navigate(~p"/apps/#{app}") end}
          >
            <:col :let={app} label="Thumbnail">
              <img class="w-16 h-16 rounded" src={app.thumbnail} />
            </:col>
            <:col :let={app} label="Name">
              <div class="flex flex-col">
                <span>{app.name}</span>
                <span class="text-xs text-secondary">{app.description}</span>
              </div>
            </:col>
            <:col :let={app} label="Credentials">
              <div class="flex flex-col">
                <span>ID: {app.id}</span>
                <span>Key: <span class="italic">not available yet</span></span>
              </div>
            </:col>
            <:col :let={app} label="URL">{app.url}</:col>
            <:action :let={app}>
              <div class="sr-only">
                <.link navigate={~p"/apps/#{app}"}>Show</.link>
              </div>
              <.link navigate={~p"/publishers/#{publisher}/apps/#{app}/edit"}>Edit</.link>
            </:action>
          </.table>
        <% end %>
        <div class="not-last:divider" />
      <% end %>
    </Layouts.app>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    if connected?(socket) do
      Apps.subscribe_publishers()
    end

    {:ok,
     socket
     |> assign(:page_title, "Listing Publishers")
     |> stream(:publishers, Apps.list_apps_by_publisher())}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    publisher = Apps.get_publisher!(id)
    {:ok, _} = Apps.delete_publisher(publisher)

    {:noreply, stream_delete(socket, :publishers, publisher)}
  end

  @impl true
  def handle_info({type, %Admin.Apps.Publisher{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, stream(socket, :publishers, Apps.list_apps_by_publisher(), reset: true)}
  end
end
