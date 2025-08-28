defmodule AdminWeb.AppInstanceLive.Show do
  use AdminWeb, :live_view

  alias Admin.Apps

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        App: {@app_instance.name}
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
            <.icon name="hero-pencil-square" /> Edit
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="Thumbnail">
          <img class="w-16 h-16 rounded" src={@app_instance.thumbnail} />
        </:item>
        <:item title="ID">{@app_instance.id}</:item>
        <:item title="Name">{@app_instance.name}</:item>
        <:item title="Description">{@app_instance.description}</:item>
        <:item title="URL">{@app_instance.url}</:item>
      </.list>

      <.button phx-click="confirm_delete">
        <.icon name="hero-trash" /> Delete app
      </.button>

      <dialog
        id="delete_modal"
        class="modal"
        open={@show_modal}
      >
        <div class="modal-box">
          <h3 class="font-bold text-lg">Confirm Deletion</h3>
          <p class="py-4">Are you sure you want to delete this app?</p>
          <div class="modal-action">
            <button id="delete_button" class="btn btn-error" phx-click="delete_app">
              Delete
            </button>
            <button id="cancel_button" class="btn" phx-click="cancel_delete">Cancel</button>
          </div>
        </div>
      </dialog>
    </Layouts.app>
    """
  end

  @impl true
  def mount(%{"app_id" => id}, _session, socket) do
    if connected?(socket) do
      Apps.subscribe_apps()
    end

    {:ok,
     socket
     |> assign(:page_title, "Show App instance")
     |> assign(:show_modal, false)
     |> assign(:app_instance, Apps.get_app_instance!(id))}
  end

  @impl true
  def handle_event("confirm_delete", _, socket) do
    {:noreply, assign(socket, :show_modal, true)}
  end

  def handle_event("cancel_delete", _, socket) do
    {:noreply, assign(socket, :show_modal, false)}
  end

  def handle_event("delete_app", _, socket) do
    case Apps.delete_app_instance(socket.assigns.app_instance) do
      {:ok, _app_instance} ->
        {:noreply,
         socket
         |> put_flash(:info, "App instance deleted.")
         |> push_navigate(to: ~p"/publishers")}

      {:error, reason} ->
        {:noreply, socket |> put_flash(:error, reason) |> assign(:show_modal, false)}
    end
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
     |> push_navigate(to: ~p"/publishers")}
  end

  def handle_info({type, %Admin.Apps.AppInstance{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end
end
