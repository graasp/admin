defmodule AdminWeb.NotificationLive.Show do
  use AdminWeb, :live_view

  alias Admin.Notifications

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Message: {@notification.name}
        <:actions>
          <.button navigate={~p"/notifications"}>
            <.icon name="hero-arrow-left" />
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="Title">{@notification.name}</:item>
        <:item title="Audience">{@notification.audience}</:item>
        <:item title="Default language">{@notification.default_language}</:item>
        <:item title="Total recipients">{@notification.total_recipients}</:item>
      </.list>

      <.button navigate={~p"/notifications/#{@notification}/messages/new"}>
        Add a localized message
      </.button>

      <%= if length(@notification.logs) > 0 do %>
        <.table id="notification_logs" rows={@notification.logs}>
          <:col :let={message_log} label="Email">{message_log.email}</:col>
          <:col :let={message_log} label="Sent at">{message_log.created_at}</:col>
          <:col :let={message_log} label="Status">{message_log.status}</:col>
        </.table>
      <% else %>
        <p>No messages sent yet</p>
      <% end %>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(%{"notification_id" => id}, _session, socket) do
    if connected?(socket) do
      Notifications.subscribe_notifications(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Show Mail")
     |> assign(
       :notification,
       Notifications.get_notification!(socket.assigns.current_scope, id)
     )}
  end

  @impl true
  def handle_info(
        {:updated, %Admin.Notifications.Notification{id: id} = notification},
        %{assigns: %{notification: %{id: id}}} = socket
      ) do
    {:noreply, assign(socket, :notification, notification)}
  end

  def handle_info(
        {:deleted, %Admin.Notifications.Notification{id: id}},
        %{assigns: %{notification: %{id: id}}} = socket
      ) do
    {:noreply,
     socket
     |> put_flash(:error, "The current notification was deleted.")
     |> push_navigate(to: ~p"/notifications")}
  end

  def handle_info({type, %Admin.Notifications.Notification{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end
end
