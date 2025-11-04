defmodule AdminWeb.ServiceMessageLive.Show do
  use AdminWeb, :live_view

  alias Admin.Notifications

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Message: {@service_message.subject}
        <:actions>
          <.button navigate={~p"/service_messages"}>
            <.icon name="hero-arrow-left" />
          </.button>
          <.button
            variant="primary"
            navigate={~p"/service_messages/#{@service_message}/edit?return_to=show"}
          >
            <.icon name="hero-pencil-square" /> Edit
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="Subject">{@service_message.subject}</:item>
        <:item title="Message">{@service_message.message}</:item>
      </.list>

      <%= if length(@service_message.message_logs) > 0 do %>
        <.table id="message_logs" rows={@service_message.message_logs}>
          <:col :let={message_log} label="Email">{message_log.email}</:col>
          <:col :let={message_log} label="Created At">{message_log.created_at}</:col>
        </.table>
      <% else %>
        <p>No messages sent yet</p>
      <% end %>

      <.button
        variant="primary"
        navigate={~p"/service_messages/#{@service_message}/send?return_to=show"}
      >
        <.icon name="hero-paper-airplane" /> Send to
      </.button>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    if connected?(socket) do
      Notifications.subscribe_service_messages(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Show Service message")
     |> assign(
       :service_message,
       Notifications.get_service_message!(socket.assigns.current_scope, id)
     )}
  end

  @impl true
  def handle_info(
        {:updated, %Admin.Notifications.Notification{id: id} = service_message},
        %{assigns: %{service_message: %{id: id}}} = socket
      ) do
    {:noreply, assign(socket, :service_message, service_message)}
  end

  def handle_info(
        {:deleted, %Admin.Notifications.Notification{id: id}},
        %{assigns: %{service_message: %{id: id}}} = socket
      ) do
    {:noreply,
     socket
     |> put_flash(:error, "The current service_message was deleted.")
     |> push_navigate(to: ~p"/notifications")}
  end

  def handle_info({type, %Admin.Notifications.Notification{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end
end
