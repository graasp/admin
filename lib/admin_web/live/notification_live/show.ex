defmodule AdminWeb.NotificationLive.Show do
  use AdminWeb, :live_view

  alias Admin.Notifications

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Composing message
        <:actions>
          <.button navigate={~p"/admin/notifications"}>
            <.icon name="hero-arrow-left" />
          </.button>
          <.button variant="primary" navigate={~p"/admin/notifications/#{@notification}/edit"}>
            <.icon name="hero-pencil" /> Edit
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="Name">{@notification.name}</:item>
        <:item title="Target Audience">{@notification.audience} {length(@recipients)}</:item>
        <:item title="Default language">
          <div class="flex flex-col gap-2">
            {@notification.default_language}
            <%!--
            <label class="label text-sm">
              <input
                type="checkbox"
                phx-click="toggle_strict_languages"
                checked={if @notification.use_strict_languages, do: "checked", else: nil}
                class="checkbox checkbox-primary"
              /> Use only specified languages
            </label> --%>
          </div>
        </:item>
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
                <.button
                  phx-click="delete"
                  class="btn btn-soft btn-error"
                  phx-value-id={localized_email.id}
                  phx-value-language={localized_email.language}
                >
                  Delete
                </.button>
                <.button navigate={
                  ~p"/admin/notifications/#{@notification}/messages/#{localized_email.language}/edit"
                }>
                  Edit
                </.button>
              </div>
            </div>
          </div>
        <% end %>
      </div>

      <.button navigate={~p"/admin/notifications/#{@notification}/messages/new"}>
        Add a localized message
      </.button>
      <!--
      <%= if length(@notification.logs) > 0 do %>
        <.table id="notification_logs" rows={@notification.logs}>
          <:col :let={message_log} label="Email">{message_log.email}</:col>
          <:col :let={message_log} label="Sent at">{message_log.created_at}</:col>
          <:col :let={message_log} label="Status">{message_log.status}</:col>
        </.table>
      <% else %>
        <p>No messages sent yet</p>
      <% end %>
      -->
      <%= if @notification.localized_emails |> Enum.find(&(&1.language == @notification.default_language)) != nil do %>
        <div class="flex justify-end">
          <.button variant="primary" phx-click="send_notification">
            Send Notification
          </.button>
        </div>
      <% else %>
        <div role="alert" class="alert alert-error alert-soft">
          <.icon name="hero-exclamation-circle" class="size-6" />
          <span>Missing the email template for the default language.</span>
          <.button navigate={
            ~p"/admin/notifications/#{@notification}/messages/new?language=#{@notification.default_language}"
          }>
            Add locale
          </.button>
        </div>
      <% end %>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(%{"notification_id" => id}, _session, socket) do
    if connected?(socket) do
      Notifications.subscribe_notifications(socket.assigns.current_scope, id)
    end

    notification = Notifications.get_notification!(socket.assigns.current_scope, id)
    included_langs = notification.localized_emails |> Enum.map(& &1.language)

    {:ok, recipients} =
      Notifications.get_target_audience(
        socket.assigns.current_scope,
        notification.audience,
        if(notification.use_strict_languages, do: [only_langs: included_langs], else: [])
      )

    {:ok,
     socket
     |> assign(:page_title, "Show Mail")
     |> assign(
       :notification,
       notification
     )
     |> assign(:recipients, recipients)}
  end

  @impl true
  def handle_event("toggle_strict_languages", _, socket) do
    {:ok, notification} =
      Notifications.toggle_strict_languages(
        socket.assigns.current_scope,
        socket.assigns.notification
      )

    included_langs = notification.localized_emails |> Enum.map(& &1.language)

    {:ok, recipients} =
      Notifications.get_target_audience(
        socket.assigns.current_scope,
        notification.audience,
        if(notification.use_strict_languages, do: [only_langs: included_langs], else: [])
      )

    {:noreply, socket |> assign(:recipients, recipients)}
  end

  def handle_event("delete", %{"id" => id} = _params, socket) do
    localized_email =
      socket.assigns.notification.localized_emails
      |> Enum.find(&(&1.id == id))

    {:ok, _localized_email} =
      Notifications.delete_localized_email(
        socket.assigns.current_scope,
        localized_email
      )

    {:noreply, socket}
  end

  def handle_event("send_notification", _params, socket) do
    # verify there is a local version for the default lang
    with {:ok, _localized_email} <-
           Notifications.get_localized_email_by_lang(
             socket.assigns.current_scope,
             socket.assigns.notification.id,
             socket.assigns.notification.default_language
           ) do
      %{
        user_id: socket.assigns.current_scope.user.id,
        notification_id: socket.assigns.notification.id
      }
      |> Admin.MailingWorker.new()
      |> Oban.insert()

      {:ok, _notification} =
        Notifications.update_sent_at(
          socket.assigns.current_scope,
          socket.assigns.notification
        )

      {:noreply,
       socket
       |> put_flash(:info, "Notification sent successfully")
       |> push_navigate(to: ~p"/admin/notifications")}
    else
      {:error, :not_found} ->
        {:noreply, socket |> put_flash(:error, "The default language is not available")}
    end
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
     |> push_navigate(to: ~p"/admin/notifications")}
  end

  def handle_info({type, %Admin.Notifications.Notification{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end

  def handle_info(
        {type, %Admin.Notifications.LocalizedEmail{} = _localized_email},
        %{assigns: %{notification: %{id: id}}} = socket
      )
      when type in [:created, :updated, :deleted] do
    {:noreply,
     assign(
       socket,
       :notification,
       Notifications.get_notification!(socket.assigns.current_scope, id)
     )}
  end
end
