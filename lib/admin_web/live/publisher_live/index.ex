defmodule AdminWeb.PublisherLive.Index do
  use AdminWeb, :live_view

  alias Admin.Apps

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Listing Publishers
        <:actions>
          <.button variant="primary" navigate={~p"/publishers/new"}>
            <.icon name="hero-plus" /> New Publisher
          </.button>
        </:actions>
      </.header>

      <.table
        id="publishers"
        rows={@streams.publishers}
        row_click={fn {_id, publisher} -> JS.navigate(~p"/publishers/#{publisher}") end}
      >
        <:col :let={{_id, publisher}} label="Name">{publisher.name}</:col>
        <:col :let={{_id, publisher}} label="Origins">{publisher.origins}</:col>
        <:action :let={{_id, publisher}}>
          <div class="sr-only">
            <.link navigate={~p"/publishers/#{publisher}"}>Show</.link>
          </div>
          <.link navigate={~p"/publishers/#{publisher}/edit"}>Edit</.link>
        </:action>
        <:action :let={{id, publisher}}>
          <.link
            phx-click={JS.push("delete", value: %{id: publisher.id}) |> hide("##{id}")}
            data-confirm="Are you sure?"
          >
            Delete
          </.link>
        </:action>
      </.table>
    </Layouts.app>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    if connected?(socket) do
      Apps.subscribe_publishers(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Listing Publishers")
     |> stream(:publishers, Apps.list_publishers(socket.assigns.current_scope))}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    publisher = Apps.get_publisher!(socket.assigns.current_scope, id)
    {:ok, _} = Apps.delete_publisher(socket.assigns.current_scope, publisher)

    {:noreply, stream_delete(socket, :publishers, publisher)}
  end

  @impl true
  def handle_info({type, %Admin.Apps.Publisher{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, stream(socket, :publishers, Apps.list_publishers(socket.assigns.current_scope), reset: true)}
  end
end
