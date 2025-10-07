defmodule AdminWeb.AssistantLive.Form do
  use AdminWeb, :live_view

  alias Admin.SmartAssistants
  alias Admin.SmartAssistants.Assistant

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        {@page_title}
        <:subtitle>Use this form to manage assistant records in your database.</:subtitle>
      </.header>

      <.form for={@form} id="assistant-form" phx-change="validate" phx-submit="save">
        <.input field={@form[:name]} type="text" label="Name" />
        <.input field={@form[:prompt]} type="text" label="Prompt" />
        <.input field={@form[:picture]} type="text" label="Picture" />
        <footer>
          <.button phx-disable-with="Saving..." variant="primary">Save Assistant</.button>
          <.button navigate={return_path(@current_scope, @return_to, @assistant)}>Cancel</.button>
        </footer>
      </.form>
    </Layouts.app>
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
    assistant = SmartAssistants.get_assistant!(socket.assigns.current_scope, id)

    socket
    |> assign(:page_title, "Edit Assistant")
    |> assign(:assistant, assistant)
    |> assign(:form, to_form(SmartAssistants.change_assistant(socket.assigns.current_scope, assistant)))
  end

  defp apply_action(socket, :new, _params) do
    assistant = %Assistant{user_id: socket.assigns.current_scope.user.id}

    socket
    |> assign(:page_title, "New Assistant")
    |> assign(:assistant, assistant)
    |> assign(:form, to_form(SmartAssistants.change_assistant(socket.assigns.current_scope, assistant)))
  end

  @impl true
  def handle_event("validate", %{"assistant" => assistant_params}, socket) do
    changeset = SmartAssistants.change_assistant(socket.assigns.current_scope, socket.assigns.assistant, assistant_params)
    {:noreply, assign(socket, form: to_form(changeset, action: :validate))}
  end

  def handle_event("save", %{"assistant" => assistant_params}, socket) do
    save_assistant(socket, socket.assigns.live_action, assistant_params)
  end

  defp save_assistant(socket, :edit, assistant_params) do
    case SmartAssistants.update_assistant(socket.assigns.current_scope, socket.assigns.assistant, assistant_params) do
      {:ok, assistant} ->
        {:noreply,
         socket
         |> put_flash(:info, "Assistant updated successfully")
         |> push_navigate(
           to: return_path(socket.assigns.current_scope, socket.assigns.return_to, assistant)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp save_assistant(socket, :new, assistant_params) do
    case SmartAssistants.create_assistant(socket.assigns.current_scope, assistant_params) do
      {:ok, assistant} ->
        {:noreply,
         socket
         |> put_flash(:info, "Assistant created successfully")
         |> push_navigate(
           to: return_path(socket.assigns.current_scope, socket.assigns.return_to, assistant)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp return_path(_scope, "index", _assistant), do: ~p"/assistants"
  defp return_path(_scope, "show", assistant), do: ~p"/assistants/#{assistant}"
end
