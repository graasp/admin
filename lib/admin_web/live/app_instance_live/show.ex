defmodule AdminWeb.AppInstanceLive.Show do
  use AdminWeb, :live_view

  alias Admin.Apps

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        App instance {@app_instance.id}
        <:subtitle>This is a app_instance record from your database.</:subtitle>
        <:actions>
          <.button navigate={~p"/publishers"}>
            <.icon name="hero-arrow-left" />
          </.button>
          <.button
            variant="primary"
            navigate={
              ~p"/publishers/#{@app_instance.publisher}/apps/#{@app_instance}/edit?return_to=show"
            }
          >
            <.icon name="hero-pencil-square" /> Edit app_instance
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="Thumbnail">
          <img class="w-16 h-16 rounded" src={@app_instance.thumbnail} />
        </:item>
        <:item title="Name">{@app_instance.name}</:item>
        <:item title="Description">{@app_instance.description}</:item>
        <:item title="Url">{@app_instance.url}</:item>
      </.list>
    </Layouts.app>
    """
  end

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    if connected?(socket) do
      Apps.subscribe_apps()
    end

    {:ok,
     socket
     |> assign(:page_title, "Show App instance")
     |> assign(:app_instance, Apps.get_app_instance!(id))}
  end

  @impl true
  def handle_info(
        {:updated, %Admin.Apps.AppInstance{id: id} = app_instance},
        %{assigns: %{app_instance: %{id: id}}} = socket
      ) do
    {:noreply, assign(socket, :app_instance, app_instance)}
  end

  def handle_info(
        {:deleted, %Admin.Apps.AppInstance{id: id}},
        %{assigns: %{app_instance: %{id: id}}} = socket
      ) do
    {:noreply,
     socket
     |> put_flash(:error, "The current app_instance was deleted.")
     |> push_navigate(to: ~p"/apps")}
  end

  def handle_info({type, %Admin.Apps.AppInstance{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end
end
