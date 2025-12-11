defmodule AdminWeb.NotificationLive.Form do
  use AdminWeb, :live_view

  alias Admin.Notifications
  alias Admin.Notifications.Notification

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        {@page_title}
      </.header>

      <.form
        :let={form}
        for={@form}
        id="notification-form"
        phx-change="validate"
        phx-submit="submit"
      >
        <.input autofocus field={form[:name]} type="text" label="Name" />

        <.input
          field={form[:audience]}
          type="select"
          prompt="Select the audience"
          options={[
            "Active users": "active",
            "French speaking users": "french",
            "Inactive users": "inactive",
            "All users": "all"
          ]}
          label="Audience"
        />

        <%= if @form.data.audience do %>
          <div class="gap-2 mb-2">
            <label class="text-sm font-medium">Recipients</label>
            <%= if @recipients == [] do %>
              <p class="text-sm text-muted-foreground">No recipients for this audience found.</p>
            <% else %>
              <div
                class="border rounded p-2 bg-base-100 border-base-300 border"
                phx-click={JS.toggle_class("hidden", to: "#toggled-content")}
              >
                <div class="text-md">
                  {length(@recipients)} recipients for this audience (click to show)
                </div>
                <div class="text-sm hidden" id="toggled-content">
                  <%= for email <- @recipients do %>
                    <span>{email}</span>
                  <% end %>
                </div>
              </div>
            <% end %>
          </div>
        <% end %>

        <footer>
          <.button variant="primary">Save Mail</.button>
        </footer>
      </.form>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(params, _session, socket) do
    socket =
      socket
      |> apply_action(socket.assigns.live_action, params)

    {:ok, socket}
  end

  defp apply_action(socket, :new, _params) do
    notification =
      Notifications.change_notification(socket.assigns.current_scope, %Notification{}, %{
        "name" => "",
        "audience" => ""
      })

    socket
    |> assign(:page_title, "New Mailing")
    |> assign(:form, notification)
    |> assign(:recipients, [])
  end

  defp apply_action(socket, :edit, %{"notification_id" => id}) do
    notification = Notifications.get_notification!(socket.assigns.current_scope, id)
    recipients = []
    # Notifications.get_recipients(notification)

    socket
    |> assign(:page_title, "Edit Mailing")
    |> assign(
      :form,
      Notifications.change_notification(socket.assigns.current_scope, notification)
    )
    |> assign(:recipients, recipients)
  end

  @impl true
  def handle_event("validate", %{"notification" => params}, socket) do
    changeset =
      Notifications.change_notification(socket.assigns.current_scope, %Notification{}, params)
      |> Map.put(:action, :validate)

    {:noreply,
     socket
     |> assign(:form, changeset)}
  end

  @impl true
  def handle_event("submit", %{"notification" => params}, socket) do
    case Notifications.create_notification(socket.assigns.current_scope, params) do
      {:ok, %Notification{} = notif} ->
        {:noreply,
         socket
         |> put_flash(:info, "Notification created")
         |> push_navigate(to: ~p"/notifications/#{notif}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply,
         socket
         |> assign(:form, changeset)}
    end
  end
end
