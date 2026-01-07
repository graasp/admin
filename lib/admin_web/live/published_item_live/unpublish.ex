defmodule AdminWeb.PublishedItemLive.Unpublish do
  alias Admin.Publications
  import AdminWeb.PublishedItemHTML
  require Logger
  use AdminWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <div class="">
        <.header>
          Unpublish {@published_item.item.name}
        </.header>

        <.list>
          <:item title="Name">
            {@published_item.item.name}
          </:item>
          <:item title="Description">
            <.raw_html html={@published_item.item.description} />
          </:item>
          <:item title="Creator">
            <.publication_creator publication={@published_item} />
          </:item>
        </.list>
      </div>

      <.form for={@removal_form} id="removal_form" phx-submit="submit" phx-change="validate">
        <div role="alert" class="alert alert-info alert-soft mb-2">
          <.icon name="hero-exclamation-circle" />
          <span>
            Please provide a reason for the removal. The reason will be communicated to the publication creator by email. Remember to be kind and to respect others.
          </span>
        </div>

        <.input field={@removal_form[:reason]} type="textarea" label="Reason" required />

        <%= if @published_item.creator_id do %>
          <div role="alert" class="alert alert-warning alert-soft mb-2">
            <.icon name="hero-exclamation-triangle" />
            <span>
              This publication will be removed from the Library and an email will be sent to <strong>{@published_item.creator.email}</strong>.
            </span>
          </div>
        <% end %>

        <.button type="submit" variant="primary" phx-disable-with="Unpublishing ...">
          Unpublish and notify
        </.button>
      </.form>

      <.button navigate={~p"/admin/published_items/#{@published_item}"}>
        <.icon name="hero-arrow-left" />
      </.button>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    if connected?(socket) do
      Admin.Publications.subscribe_published_items()
    end

    published_item = Publications.get_published_item!(id)

    removal_form =
      Publications.create_removal_notice(socket.assigns.current_scope, published_item, %{})

    socket =
      socket
      |> assign(:published_item, published_item)
      |> assign(:removal_form, to_form(removal_form))

    {:ok, socket}
  end

  @impl true
  def handle_event("validate", %{"publication_removal_notice" => params}, socket) do
    removal_form =
      Publications.create_removal_notice(
        socket.assigns.current_scope,
        socket.assigns.published_item,
        params
      )
      |> to_form(action: :validate)

    {:noreply, assign(socket, :removal_form, removal_form)}
  end

  def handle_event("submit", %{"publication_removal_notice" => params}, socket) do
    case Publications.remove_publication_with_notice(
           socket.assigns.current_scope,
           socket.assigns.published_item,
           params
         ) do
      {:ok, :removed, _notice} ->
        {:noreply,
         socket
         |> put_flash(:success, "Publication was removed and user notified")
         |> redirect(to: ~p"/admin/published_items")}

      {:error, changeset} ->
        {:noreply, assign(socket, removal_form: to_form(changeset))}
    end
  end

  @impl true
  def handle_info({:updated, %Admin.Publications.PublishedItem{} = published_item}, socket) do
    {:noreply,
     socket
     |> assign(:published_item, published_item |> Publications.with_creator())
     |> put_flash(:info, "Publication was updated")}
  end

  def handle_info({:deleted, %Admin.Publications.PublishedItem{}}, socket) do
    {:noreply,
     socket
     |> put_flash(:error, "Publication was deleted")
     |> redirect(to: ~p"/admin/published_items")}
  end
end
