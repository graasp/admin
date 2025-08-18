defmodule AdminWeb.PublishedItemLive.Unpublish do
  alias Admin.Publications
  require Logger
  use AdminWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <div class="">
        <.header>
          Unpublish {@published_item.name}
          <:subtitle>{@published_item.description}</:subtitle>
        </.header>
      </div>

      <.form for={@removal_form} id="removal_form" phx-submit="submit" phx-change="validate">
        <.input field={@removal_form[:reason]} type="textarea" label="Reason" required />
        <.button variant="primary" phx-disable-with="Unpublishing ...">Unpublish</.button>
      </.form>
    </Layouts.app>
    """
  end

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    published_item = Publications.get_published_item!(id)

    removal_form =
      Publications.create_removal_notice(published_item, %{})

    socket =
      socket
      |> assign(:published_item, published_item)
      |> assign(:removal_form, to_form(removal_form))

    {:ok, socket}
  end

  @impl true
  def handle_event("validate", %{"removal_notice" => params}, socket) do
    removal_form =
      socket.assigns.published_item
      |> Publications.create_removal_notice(params)
      |> to_form(action: :validate)

    {:noreply, assign(socket, :removal_form, removal_form)}
  end

  def handle_event("submit", %{"removal_notice" => params}, socket) do
    case Publications.remove_publication_with_notice(socket.assigns.published_item, params) do
      {:ok, _removal_notice} ->
        {:noreply,
         socket
         |> put_flash(:info, "Publication was removed and user notified")
         |> redirect(to: ~p"/published_items")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :removal_form, to_form(changeset))}
    end
  end
end
