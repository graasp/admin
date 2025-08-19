defmodule AdminWeb.AppInstanceLive.Index do
  use AdminWeb, :live_view

  alias Admin.Apps

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Listing Apps
        <:actions>
          <.button variant="primary" navigate={~p"/apps/new"}>
            <.icon name="hero-plus" /> New App instance
          </.button>
        </:actions>
      </.header>

      <.table
        id="apps"
        rows={@streams.apps}
        row_click={fn {_id, app_instance} -> JS.navigate(~p"/apps/#{app_instance}") end}
      >
        <:col :let={{_id, app_instance}} label="Name">{app_instance.name}</:col>
        <:col :let={{_id, app_instance}} label="Description">{app_instance.description}</:col>
        <:col :let={{_id, app_instance}} label="Url">{app_instance.url}</:col>
        <:col :let={{_id, app_instance}} label="Thumbnail">{app_instance.thumbnail}</:col>
        <:action :let={{_id, app_instance}}>
          <div class="sr-only">
            <.link navigate={~p"/apps/#{app_instance}"}>Show</.link>
          </div>
          <.link navigate={~p"/apps/#{app_instance}/edit"}>Edit</.link>
        </:action>
        <:action :let={{id, app_instance}}>
          <.link
            phx-click={JS.push("delete", value: %{id: app_instance.id}) |> hide("##{id}")}
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
      Apps.subscribe_apps(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Listing Apps")
     |> stream(:apps, Apps.list_apps(socket.assigns.current_scope))}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    app_instance = Apps.get_app_instance!(socket.assigns.current_scope, id)
    {:ok, _} = Apps.delete_app_instance(socket.assigns.current_scope, app_instance)

    {:noreply, stream_delete(socket, :apps, app_instance)}
  end

  @impl true
  def handle_info({type, %Admin.Apps.AppInstance{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, stream(socket, :apps, Apps.list_apps(socket.assigns.current_scope), reset: true)}
  end
end
