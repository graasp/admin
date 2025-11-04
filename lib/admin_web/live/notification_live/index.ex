defmodule AdminWeb.NotificationLive.Index do
  use AdminWeb, :live_view
  alias Admin.Notifications

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Notifications
        <:actions>
          <.button variant="primary" navigate={~p"/notifications/new"}>
            <.icon name="hero-plus" /> New Notification
          </.button>
        </:actions>
      </.header>

      <.table
        id="notifications"
        rows={@streams.notifications}
        row_click={fn {_id, notification} -> JS.navigate(~p"/notifications/#{notification}") end}
      >
        <:col :let={{_id, notification}} label="Subject">{notification.subject}</:col>
        <:col :let={{_id, notification}} label="Message">{notification.message}</:col>
        <:col :let={{_id, notification}} label="Sent">{length(notification.message_logs)}</:col>
        <:action :let={{_id, notification}}>
          <div class="sr-only">
            <.link navigate={~p"/notifications/#{notification}"}>Show</.link>
          </div>
          <.link navigate={~p"/notifications/#{notification}/edit"}>Edit</.link>
        </:action>
        <:action :let={{id, notification}}>
          <.link
            phx-click={JS.push("delete", value: %{id: notification.id}) |> hide("##{id}")}
            data-confirm="Are you sure?"
          >
            Delete
          </.link>
        </:action>
      </.table>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    if connected?(socket) do
      Notifications.subscribe_service_messages(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Listing Service messages")
     |> stream(:notifications, Notifications.list_notifications(socket.assigns.current_scope))}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    service_message = Notifications.get_service_message!(socket.assigns.current_scope, id)
    {:ok, _} = Notifications.delete_service_message(socket.assigns.current_scope, service_message)

    {:noreply, stream_delete(socket, :service_messages, service_message)}
  end

  @impl true
  def handle_info({type, %Admin.Notifications.Notification{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply,
     stream(socket, :service_messages, list_service_messages(socket.assigns.current_scope),
       reset: true
     )}
  end

  defp list_service_messages(current_scope) do
    Notifications.list_notifications(current_scope)
  end
end
