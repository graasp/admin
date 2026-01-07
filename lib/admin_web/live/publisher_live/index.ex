defmodule AdminWeb.PublisherLive.Index do
  use AdminWeb, :live_view

  alias Admin.Apps

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Listing Apps by Publishers
        <:actions>
          <.button variant="primary" navigate={~p"/admin/publishers/new"}>
            <.icon name="hero-plus" /> New Publisher
          </.button>
        </:actions>
      </.header>

      <%= for {id, publisher} <- @streams.publishers do %>
        <div
          id={"#{id}-wrapper"}
          class="bg-base-200 rounded-xl p-4"
          phx-click={
            JS.toggle_class("hidden", to: "#publisher-#{publisher.id}-apps")
            |> JS.toggle_class("rotate-[-90deg]", to: "##{id}-wrapper .chevron", time: 300)
          }
        >
          <.header>
            <.icon
              class="align-middle mb-1 size-5 chevron transition-all duration-300"
              name="hero-chevron-down"
            />
            <.link navigate={~p"/admin/publishers/#{publisher.id}"}>
              {publisher.name}
            </.link>
            <:subtitle>
              <div class="flex flex-col">
                <%= for origin <- publisher.origins do %>
                  <span>{origin}</span>
                <% end %>
              </div>
            </:subtitle>
            <:actions>
              <.button navigate={~p"/admin/publishers/#{publisher.id}"}>
                <.icon name="hero-eye" /> View
              </.button>
            </:actions>
            <:actions>
              <.button navigate={~p"/admin/publishers/#{publisher.id}/edit"}>
                <.icon name="hero-pencil" /> Edit
              </.button>
            </:actions>
            <:actions>
              <.button variant="primary" navigate={~p"/admin/publishers/#{publisher.id}/apps/new"}>
                <.icon name="hero-plus" /> New App
              </.button>
            </:actions>
          </.header>
          <div id={"publisher-#{publisher.id}-apps"}>
            <%= if Enum.empty?(publisher.apps) do %>
              <p class="text-center text-sm text-secondary">No apps yet.</p>
            <% else %>
              <.table
                id={id}
                rows={publisher.apps}
                row_click={fn app -> JS.navigate(~p"/admin/apps/#{app}") end}
                row_id={fn app -> "apps-#{app.id}" end}
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
                    <div class="flex flex-row items-center gap-1">
                      <.with_copy
                        id={"app-#{app.id}-key"}
                        aria_label={"Copy '#{app.name}' key to clipboard"}
                      >
                        {app.key}
                      </.with_copy>
                    </div>
                  </div>
                </:col>
                <:col :let={app} label="URL">{app.url}</:col>
                <:action :let={app}>
                  <div class="sr-only">
                    <.link navigate={~p"/admin/apps/#{app}"}>Show</.link>
                  </div>
                  <.link navigate={~p"/admin/publishers/#{publisher}/apps/#{app}/edit"}>Edit</.link>
                </:action>
              </.table>
            <% end %>
          </div>
        </div>
      <% end %>
    </Layouts.admin>
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
