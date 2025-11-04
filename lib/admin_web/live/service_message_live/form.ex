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
        <:subtitle>Use this form to manage service_message records in your database.</:subtitle>
      </.header>

      <.form for={@form} id="service_message-form" phx-change="validate" phx-submit="save">
        <.input field={@form[:subject]} type="text" label="Subject" />
        <.input field={@form[:message]} type="textarea" label="Message" />
        <footer>
          <.button phx-disable-with="Saving..." variant="primary">Save Service message</.button>
          <.button navigate={return_path(@current_scope, @return_to, @service_message)}>
            Cancel
          </.button>
        </footer>
      </.form>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(params, _session, socket) do
    {:ok,
     socket
     |> assign(:return_to, return_to(params["return_to"]))
     |> apply_action(socket.assigns.live_action, params)}
  end

  defp return_to("show"), do: "show"
  defp return_to(_), do: "index"

  defp apply_action(socket, :edit, %{"id" => id}) do
    service_message = Notifications.get_service_message!(socket.assigns.current_scope, id)

    socket
    |> assign(:page_title, "Edit Service message")
    |> assign(:service_message, service_message)
    |> assign(
      :form,
      to_form(Notifications.change_service_message(socket.assigns.current_scope, service_message))
    )
  end

  defp apply_action(socket, :new, _params) do
    service_message = %Notification{}

    socket
    |> assign(:page_title, "New Service message")
    |> assign(:service_message, service_message)
    |> assign(
      :form,
      to_form(Notifications.change_service_message(socket.assigns.current_scope, service_message))
    )
  end

  @impl true
  def handle_event("validate", %{"service_message" => service_message_params}, socket) do
    changeset =
      Notifications.change_service_message(
        socket.assigns.current_scope,
        socket.assigns.service_message,
        service_message_params
      )

    {:noreply, assign(socket, form: to_form(changeset, action: :validate))}
  end

  def handle_event("save", %{"service_message" => service_message_params}, socket) do
    save_service_message(socket, socket.assigns.live_action, service_message_params)
  end

  defp save_service_message(socket, :edit, service_message_params) do
    case Notifications.update_service_message(
           socket.assigns.current_scope,
           socket.assigns.service_message,
           service_message_params
         ) do
      {:ok, service_message} ->
        {:noreply,
         socket
         |> put_flash(:info, "Service message updated successfully")
         |> push_navigate(
           to:
             return_path(socket.assigns.current_scope, socket.assigns.return_to, service_message)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp save_service_message(socket, :new, service_message_params) do
    case Notifications.create_service_message(
           socket.assigns.current_scope,
           service_message_params
         ) do
      {:ok, service_message} ->
        {:noreply,
         socket
         |> put_flash(:info, "Service message created successfully")
         |> push_navigate(
           to:
             return_path(socket.assigns.current_scope, socket.assigns.return_to, service_message)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp return_path(_scope, "index", _service_message), do: ~p"/service_messages"
  defp return_path(_scope, "show", service_message), do: ~p"/service_messages/#{service_message}"
end
