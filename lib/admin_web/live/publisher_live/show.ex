defmodule AdminWeb.PublisherLive.Show do
  use AdminWeb, :live_view

  alias Admin.Apps

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Publisher {@publisher.id}
        <:subtitle>This is a publisher record from your database.</:subtitle>
        <:actions>
          <.button navigate={~p"/apps/publishers"}>
            <.icon name="hero-arrow-left" />
          </.button>
          <.button variant="primary" navigate={~p"/apps/publishers/#{@publisher}/edit?return_to=show"}>
            <.icon name="hero-pencil-square" /> Edit publisher
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="Name">{@publisher.name}</:item>
        <:item title="Origins">{@publisher.origins}</:item>
      </.list>
    </Layouts.app>
    """
  end

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    if connected?(socket) do
      Apps.subscribe_publishers()
    end

    {:ok,
     socket
     |> assign(:page_title, "Show Publisher")
     |> assign(:publisher, Apps.get_publisher!(id))}
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
     |> push_navigate(to: ~p"/apps/publishers")}
  end

  def handle_info({type, %Admin.Apps.Publisher{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end
end
