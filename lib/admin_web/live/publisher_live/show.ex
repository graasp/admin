defmodule AdminWeb.PublisherLive.Show do
  use AdminWeb, :live_view

  alias Admin.Apps

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Publisher: {@publisher.name}
        <:subtitle>This is a publisher record from your database.</:subtitle>
        <:actions>
          <.button navigate={~p"/publishers"}>
            <.icon name="hero-arrow-left" />
          </.button>
          <.button variant="primary" navigate={~p"/publishers/#{@publisher}/edit?return_to=show"}>
            <.icon name="hero-pencil-square" /> Edit
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="ID">{@publisher.id}</:item>
        <:item title="Name">{@publisher.name}</:item>
        <:item title="Origins">
          <div class="flex flex-col gap-1">
            <%= for origin <- @publisher.origins do %>
              <span>{origin}</span>
            <% end %>
          </div>
        </:item>
      </.list>
      <.button id="delete_button" phx-click="confirm_delete">
        <.icon name="hero-trash" /> Delete publisher
      </.button>

      <dialog
        id="delete_modal"
        class="modal"
        open={@show_modal}
      >
        <div class="modal-box">
          <h3 class="font-bold text-lg">Confirm Deletion</h3>
          <p class="py-4">Are you sure you want to delete this publisher?</p>
          <p class="py-4">All apps associated with this publisher will be deleted.</p>
          <div class="modal-action">
            <button id="confirm_button" class="btn btn-error" phx-click="delete_publisher">
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
  def mount(%{"publisher_id" => id}, _session, socket) do
    if connected?(socket) do
      Apps.subscribe_publishers()
    end

    {:ok,
     socket
     |> assign(:page_title, "Show Publisher")
     |> assign(:show_modal, false)
     |> assign(:publisher, Apps.get_publisher!(id))}
  end

  @impl true
  def handle_event("confirm_delete", _, socket) do
    {:noreply, assign(socket, :show_modal, true)}
  end

  def handle_event("cancel_delete", _, socket) do
    {:noreply, assign(socket, :show_modal, false)}
  end

  def handle_event("delete_publisher", _, socket) do
    case Apps.delete_publisher(socket.assigns.publisher) do
      {:ok, _publisher} ->
        {:noreply,
         socket
         |> put_flash(:success, "Publisher deleted.")
         |> push_navigate(to: ~p"/publishers")}

      {:error, reason} ->
        {:noreply, socket |> assign(:show_modal, false) |> put_flash(:error, reason)}
    end
  end

  @impl true
  def handle_info(
        {:updated, %Admin.Apps.Publisher{id: id} = publisher},
        %{assigns: %{publisher: %{id: id}}} = socket
      ) do
    {:noreply, assign(socket, :publisher, publisher)}
  end

  def handle_info(
        {:deleted, %Admin.Apps.Publisher{id: id}},
        %{assigns: %{publisher: %{id: id}}} = socket
      ) do
    {:noreply,
     socket
     |> put_flash(:error, "The current publisher was deleted.")
     |> push_navigate(to: ~p"/publishers")}
  end

  def handle_info({type, %Admin.Apps.Publisher{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end
end
