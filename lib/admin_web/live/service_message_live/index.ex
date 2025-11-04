defmodule AdminWeb.ServiceMessageLive.Index do
  use AdminWeb, :live_view

  alias Admin.Notifications

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Service messages
        <:actions>
          <.button variant="primary" navigate={~p"/service_messages/new"}>
            <.icon name="hero-plus" /> New Service message
          </.button>
        </:actions>
      </.header>

      <.table
        id="service_messages"
        rows={@streams.service_messages}
        row_click={
          fn {_id, service_message} -> JS.navigate(~p"/service_messages/#{service_message}") end
        }
      >
        <:col :let={{_id, service_message}} label="Subject">{service_message.subject}</:col>
        <:col :let={{_id, service_message}} label="Message">{service_message.message}</:col>
        <:col :let={{_id, service_message}} label="Sent">{length(service_message.message_logs)}</:col>
        <:action :let={{_id, service_message}}>
          <div class="sr-only">
            <.link navigate={~p"/service_messages/#{service_message}"}>Show</.link>
          </div>
          <.link navigate={~p"/service_messages/#{service_message}/edit"}>Edit</.link>
        </:action>
        <:action :let={{id, service_message}}>
          <.link
            phx-click={JS.push("delete", value: %{id: service_message.id}) |> hide("##{id}")}
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
     |> stream(:service_messages, list_service_messages(socket.assigns.current_scope))}
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
    Notifications.list_service_messages(current_scope)
  end
end
