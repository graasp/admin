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
        New Notification
      </.header>

      <.form
        :let={form}
        for={@form}
        id="notification-form"
        phx-change="validate"
        phx-submit="submit"
      >
        <.input field={form[:title]} type="text" label="Title" />
        <.input field={form[:message]} type="textarea" label="Message" rows="6" />

        <fieldset class="fieldset">
          <legend class="fieldset-legend ">Recipients source</legend>
          <select
            name="recipient_method"
            id="recipient_method"
            class="select"
            phx-change="change_method"
          >
            <option value="manual" selected={@recipient_method == "manual"}>Enter manually</option>
            <option value="active_users" selected={@recipient_method == "active_users"}>
              Active users
            </option>
          </select>
          <span class="label ">
            Choose how to populate recipient emails.
          </span>
        </fieldset>

        <%= if @recipient_method == "manual" do %>
          <div class="space-y-3 mb-2">
            <label class="text-sm font-medium">Recipient emails</label>

            <div class="space-y-2">
              <%= for {email, idx} <- Enum.with_index(@manual_recipients) do %>
                <div class="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    class="input flex-1"
                    placeholder="user@example.com"
                    phx-change="manual_update_row"
                    phx-debounce="300"
                    name={"manual_email_#{idx}"}
                    phx-value-index={idx}
                    phx-value-value={email}
                  />
                  <.button
                    type="button"
                    class="btn btn-soft btn-error"
                    phx-click="manual_remove_row"
                    phx-value-index={idx}
                  >
                    <.icon name="hero-trash" class="size-5" />
                  </.button>
                </div>
              <% end %>
            </div>

            <.button type="button" class="btn btn-soft btn-secondary" phx-click="manual_add_row">
              <.icon name="hero-plus" class="size-5" /> Add email
            </.button>

            <%= if @form.errors[:recipients] do %>
              <p class="text-sm text-destructive">
                {elem(@form.errors[:recipients], 0)}
              </p>
            <% end %>
          </div>
        <% else %>
          <div class="gap-2 mb-2">
            <label class="text-sm font-medium">Active users</label>
            <%= if @active_users == [] do %>
              <p class="text-sm text-muted-foreground">No active users found.</p>
            <% else %>
              <ul class="list-disc pl-6 text-sm">
                <%= for email <- @active_users do %>
                  <li>{email}</li>
                <% end %>
              </ul>
            <% end %>
            <p class="text-xs text-muted-foreground">
              Recipients will be set to the current active users list on submit.
            </p>
          </div>
        <% end %>

        <footer>
          <.button variant="primary">Create Notification</.button>
        </footer>
      </.form>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    notification =
      Notifications.change_notification(socket.assigns.current_scope, %Notification{}, %{
        "title" => "",
        "message" => "",
        "recipients" => []
      })

    # UI state: recipient_method can be "manual" or "active_users"
    socket =
      socket
      |> assign(:form, notification)
      |> assign(:recipient_method, "manual")
      # start with one empty input
      |> assign(:manual_recipients, [""])
      |> assign(:active_users, [])
      |> assign(:loading_active_users, false)

    {:ok, socket}
  end

  @impl true
  def handle_event("validate", %{"notification" => params}, socket) do
    # Merge recipients from UI state before validating
    {recipient_method, params} = ensure_recipients_from_ui(socket, params)

    changeset =
      Notifications.change_notification(socket.assigns.current_scope, %Notification{}, params)
      |> Map.put(:action, :validate)

    {:noreply,
     socket
     |> assign(:form, changeset)
     |> assign(:recipient_method, recipient_method)}
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
          safe_get_active_members()
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
    {recipient_method, params} = ensure_recipients_from_ui(socket, params)

    case Notifications.create_notification(socket.assigns.current_scope, params) do
      {:ok, %Notification{} = notif} ->
        Enum.each(
          notif.recipients,
          &(%{
              "member_email" => &1,
              "user_id" => socket.assigns.current_scope.user.id,
              "notification_id" => notif.id
            }
            |> Admin.MailerWorker.new()
            |> Oban.insert())
        )

        {:noreply,
         socket
         |> put_flash(:info, "Notification created")
         |> push_navigate(to: ~p"/notifications")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply,
         socket
         |> assign(:form, changeset)
         |> assign(:recipient_method, recipient_method)}
    end
  end

  defp ensure_recipients_from_ui(socket, params) do
    method = socket.assigns.recipient_method

    recipients =
      case method do
        "manual" ->
          socket.assigns.manual_recipients
          |> Enum.map(&String.trim/1)
          |> Enum.reject(&(&1 == ""))

        "active_users" ->
          socket.assigns.active_users

        _ ->
          []
      end

    {method, Map.put(params, "recipients", recipients)}
  end

  defp parse_index(idx) do
    case Integer.parse(to_string(idx)) do
      {n, _} -> n
      :error -> 0
    end
  end

  # Safely get active members; in a real app consider async if slow
  defp safe_get_active_members do
    Accounts.get_active_members()
  rescue
    _ -> []
  end
end
