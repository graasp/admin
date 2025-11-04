defmodule AdminWeb.ServiceMessageLive.Send do
  use AdminWeb, :live_view

  alias Admin.Notifications

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Send
        <:subtitle>Use this form to manage service_message records in your database.</:subtitle>
      </.header>

      <div class="prose">
        <p><span class="italic">Subject:</span> {@service_message.subject}</p>
        <p><span class="italic">Message:</span> {@service_message.message}</p>
      </div>

      <.form for={@form} id="service_message-form" phx-submit="send">
        <.input field={@form[:email]} type="email" label="Email" />
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
     |> assign(:form, to_form(%{"email" => ""}))
     |> assign(:return_to, return_to(params["return_to"]))
     |> apply_action(socket.assigns.live_action, params)}
  end

  defp return_to("show"), do: "show"
  defp return_to(_), do: "index"

  def apply_action(socket, :send, %{"id" => id}) do
    service_message = Notifications.get_service_message!(socket.assigns.current_scope, id)

    socket |> assign(:service_message, service_message)
  end

  @impl true
  def handle_event("send", %{"email" => email}, socket) do
    notification_id = socket.assigns.service_message.id

    with {:ok, member} <- Admin.Accounts.get_member_by_email(email) do
      %{
        user_id: socket.assigns.current_scope.user.id,
        member_id: member.id,
        notification_id: notification_id
      }
      |> Admin.MailerWorker.new(tags: ["notification"])
      |> Oban.insert()

      {:noreply,
       socket |> push_navigate(to: ~p"/service_messages/#{socket.assigns.service_message}")}
    else
      _ ->
        {:noreply,
         socket
         |> assign(
           :form,
           to_form(%{"email" => email},
             # add custom error message
             errors: [email: {"No member for this email", []}]
           )
         )}
    end
  end

  defp return_path(_scope, "index", _service_message), do: ~p"/service_messages"
  defp return_path(_scope, "show", service_message), do: ~p"/service_messages/#{service_message}"
end
