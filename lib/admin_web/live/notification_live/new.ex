defmodule AdminWeb.NotificationLive.New do
  use AdminWeb, :live_view

  alias Admin.Notifications
  alias Admin.Notifications.Notification
  alias Admin.Accounts

  @impl true
  def mount(_params, _session, socket) do
    notification =
      Notifications.change_notification(%{"title" => "", "message" => "", "recipients" => []})

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
      Notifications.change_notification(params)
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
          safe_get_active_users()

        params = %{
          "title" => input_value(socket, :title),
          "message" => input_value(socket, :message),
          "recipients" => active
        }

        changeset =
          Notifications.new_notification()
          |> Notification.changeset(params)
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
  def handle_event("manual_update_row", %{"index" => idx_str, "value" => value}, socket) do
    idx = parse_index(idx_str)

    updated =
      socket.assigns.manual_recipients
      |> Enum.with_index()
      |> Enum.map(fn {v, i} -> if i == idx, do: value, else: v end)

    # Keep live validation in sync
    params = %{
      "title" => input_value(socket, :title),
      "message" => input_value(socket, :message),
      "recipients" => updated
    }

    changeset =
      Notifications.change_notification(socket.assigns.current_scope, %Notification{}, params)
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
      {:ok, _notif} ->
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

  # Safely get active users; in a real app consider async if slow
  defp safe_get_active_users do
    try do
      Accounts.get_active_users()
      |> Enum.uniq()
    rescue
      _ -> []
    end
  end

  # Pull current values from the changeset to keep validation stable
  defp input_value(socket, field) do
    socket.assigns.changeset
    |> Ecto.Changeset.get_field(field)
    |> case do
      nil -> ""
      v -> to_string(v)
    end
  end
end
