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
          <.button variant="primary" navigate={~p"/notifications/#{@notification}/edit"}>
            <.icon name="hero-pencil" /> Edit
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="Title">{@notification.name}</:item>
        <:item title="Audience">{@notification.audience}</:item>
        <:item title="Total recipients">{@notification.total_recipients}</:item>
        <:item title="Default language">{@notification.default_language}</:item>
      </.list>

      <div class="grid grid-cols-3 gap-2">
        <%= for localized_email <- @notification.localized_emails do %>
          <div class="card bg-base-100 w-full shadow-sm">
            <div class="card-body">
              <span class="flex flex-row justify-between">
                <h2 class="card-title">{localized_email.subject}</h2>
                <div class={[
                  "badge badge-primary",
                  if(localized_email.language != @notification.default_language,
                    do: "badge-outline"
                  )
                ]}>
                  {localized_email.language}
                </div>
              </span>
              <p>{localized_email.message}</p>
              <p>{localized_email.button_text}</p>
              <p>{localized_email.button_url}</p>
              <div class="card-actions justify-end">
                <.button navigate={
                  ~p"/notifications/#{@notification}/messages/#{localized_email}/edit"
                }>
                  Edit
                </.button>
              </div>
            </div>
          </div>
        <% end %>
      </div>

      <.button navigate={~p"/notifications/#{@notification}/messages/new"}>
        Add a localized message
      </.button>

      <.button autofocus navigate={~p"/notifications/#{@notification}/edit"}>
        Use default language when not specified
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
