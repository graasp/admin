defmodule AdminWeb.NotificationLive.New do
  use AdminWeb, :live_view

  alias Admin.Accounts
  alias Admin.Notifications
  alias Admin.Notifications.Notification

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        New Mailing
      </.header>

      <.form
        :let={form}
        for={@form}
        id="notification-form"
        phx-change="validate"
        phx-submit="submit"
      >
        <.input field={form[:name]} type="text" label="Name" />

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
  def mount(_params, _session, socket) do
    notification =
      Notifications.change_notification(socket.assigns.current_scope, %Notification{}, %{
        "name" => "",
        "audience" => ""
      })

    socket =
      socket
      |> assign(:page_title, "New Mailing")
      |> assign(:form, notification)
      # start with one empty input
      |> assign(:recipients, [])

    {:ok, socket}
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
  def handle_event("change_method", %{"recipient_method" => method}, socket) do
    method = method || "manual"

    case method do
      "manual" ->
        # Switch to manual; keep current manual state
        {:noreply, assign(socket, :recipient_method, "manual")}

      "active_users" ->
        # Fetch active users and set recipients to that list
        # You can do this async if Accounts.get_active_users/0 is slow.
        active =
          get_active_members()
          # take only email
          |> Enum.map(& &1.email)

        changeset =
          Notifications.update_recipients(
            socket.assigns.form,
            %{recipients: active}
          )
          |> Map.put(:action, :validate)

        {:noreply,
         socket
         |> assign(:recipient_method, "active_users")
         |> assign(:active_users, active)
         |> assign(:form, changeset)}
    end
  end

  @impl true
  def handle_event("manual_add_row", _params, socket) do
    {:noreply, update(socket, :manual_recipients, fn list -> list ++ [""] end)}
  end

  @impl true
  def handle_event("manual_remove_row", %{"index" => idx_str}, socket) do
    idx = parse_index(idx_str)

    updated =
      socket.assigns.manual_recipients
      |> Enum.with_index()
      |> Enum.reject(fn {_v, i} -> i == idx end)
      |> Enum.map(fn {v, _i} -> v end)

    {:noreply, assign(socket, :manual_recipients, updated)}
  end

  @impl true
  def handle_event("manual_update_row", params, socket) do
    [key | _] = Map.fetch!(params, "_target")
    value = params[key]
    "manual_email_" <> idx_str = key
    idx = parse_index(idx_str)

    updated =
      socket.assigns.manual_recipients
      |> Enum.with_index()
      |> Enum.map(fn {v, i} -> if i == idx, do: value, else: v end)

    changeset =
      Notifications.update_recipients(
        socket.assigns.form,
        %{recipients: updated}
      )
      |> Map.put(:action, :validate)

    {:noreply,
     socket
     |> assign(:manual_recipients, updated)
     |> assign(:form, changeset)}
  end

  @impl true
  def handle_event("submit", %{"notification" => params}, socket) do
    case Notifications.create_notification(socket.assigns.current_scope, params) do
      {:ok, %Notification{} = notif} ->
        # Enum.each(
        #   notif.recipients,
        #   &(%{
        #       "member_email" => &1,
        #       "user_id" => socket.assigns.current_scope.user.id,
        #       "notification_id" => notif.id
        #     }
        #     |> Admin.MailerWorker.new()
        #     |> Oban.insert())
        # )

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

  defp parse_index(idx) do
    case Integer.parse(to_string(idx)) do
      {n, _} -> n
      :error -> 0
    end
  end

  defp get_active_members do
    Accounts.get_active_members()
  rescue
    _ -> []
  end
end
