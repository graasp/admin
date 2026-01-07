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
          </div>
        </:item>
      </.list>

      <h2 class="text-md font-bold">Localized Emails</h2>

      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Language</th>
            <th>Message</th>
            <th>Call to action</th>
            <th>
              <span class="sr-only">{gettext("Actions")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <%= for localized_email <- @notification.localized_emails do %>
            <tr id={localized_email.id}>
              <td class="w-0">
                <div class={[
                  "badge badge-primary",
                  if(localized_email.language != @notification.default_language,
                    do: "badge-outline"
                  )
                ]}>
                  {localized_email.language}
                </div>
              </td>
              <td
                phx-click={
                  JS.navigate(
                    ~p"/admin/notifications/#{@notification}/messages/#{localized_email.language}/edit"
                  )
                }
                class="hover:cursor-pointer"
              >
                <div class="flex flex-col">
                  <span>{localized_email.subject}</span>
                  <span class="text-sm text-secondary">{localized_email.message}</span>
                </div>
              </td>
              <td class="w-1/4">
                <div class="flex flex-col">
                  <span>{localized_email.button_text}</span>
                  <span class="text-sm text-secondary break-all">{localized_email.button_url}</span>
                </div>
              </td>
              <td class="w-0">
                <div class="flex gap-4">
                  <.link navigate={
                    ~p"/admin/notifications/#{@notification}/messages/#{localized_email.language}/edit"
                  }>
                    Edit
                  </.link>
                  <.link
                    class="text-error"
                    phx-click={
                      JS.push("delete",
                        value: %{id: localized_email.id, language: localized_email.language}
                      )
                      |> hide("##{localized_email.id}")
                    }
                  >
                    Delete
                  </.link>
                </div>
              </td>
            </tr>
          <% end %>
        </tbody>
      </table>

      <%= if @notification.localized_emails |> Enum.find(&(&1.language == @notification.default_language)) == nil do %>
        <.alert severity="warning">
          <span>
            The default locale was not defined.
          </span>
          <:action>
            <.button navigate={
              ~p"/admin/notifications/#{@notification}/messages/new?language=#{@notification.default_language}"
            }>
              Add default locale
            </.button>
          </:action>
        </.alert>
      <% else %>
        <.button navigate={~p"/admin/notifications/#{@notification}/messages/new"}>
          Add a localized message
        </.button>
        <%= if length(@recipients) > 0 do %>
          <div class="flex justify-end">
            <.button variant="primary" phx-click="confirm_send_notification">
              Send Notification
            </.button>
          </div>
        <% else %>
          <.alert severity="warning">
            The notification audience and language settings result in no recipients. Add localized messages to cover more languages or choose a larger audience.
          </.alert>
        <% end %>
      <% end %>

      <dialog
        id="send_notification_modal"
        class="modal"
        open={@show_modal}
      >
        <div class="modal-box">
          <h3 class="font-bold text-lg">Confirm Send Notification</h3>
          <p class="py-4">Are you sure you want to send this notification?</p>
          <p>
            We will send an email to <strong>{length(@recipients)} users</strong>
            matching the audience criteria.
          </p>
          <div class="modal-action">
            <button id="cancel_button" class="btn" phx-click="cancel_send_notification">
              Cancel
            </button>
            <button id="send_button" class="btn btn-primary" phx-click="send_notification">
              Send
            </button>
          </div>
        </div>
      </dialog>
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
     |> assign(:recipients, recipients)
     |> assign(:show_modal, false)}
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

  def handle_event("cancel_send_notification", _, socket) do
    {:noreply, assign(socket, :show_modal, false)}
  end

  def handle_event("confirm_send_notification", _params, socket) do
    {:noreply, assign(socket, :show_modal, true)}
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
