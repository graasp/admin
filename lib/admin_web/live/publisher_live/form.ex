defmodule AdminWeb.PublisherLive.Form do
  use AdminWeb, :live_view

  alias Admin.Apps
  alias Admin.Apps.Publisher

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        {@page_title}
        <:subtitle>Use this form to manage publisher records in your database.</:subtitle>
      </.header>

      <.form for={@form} id="publisher-form" phx-change="validate" phx-submit="save">
        <.input field={@form[:name]} type="text" label="Name" />
        <.input
          field={@form[:origins]}
          type="select"
          multiple
          label="Origins"
          options={[{"Option 1", "option1"}, {"Option 2", "option2"}]}
        />
        <footer>
          <.button phx-disable-with="Saving..." variant="primary">Save Publisher</.button>
          <.button navigate={return_path(@current_scope, @return_to, @publisher)}>Cancel</.button>
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
    publisher = Apps.get_publisher!(id)

    socket
    |> assign(:page_title, "Edit Publisher")
    |> assign(:publisher, publisher)
    |> assign(:form, to_form(Apps.change_publisher(socket.assigns.current_scope, publisher)))
  end

  defp apply_action(socket, :new, _params) do
    publisher = %Publisher{}

    socket
    |> assign(:page_title, "New Publisher")
    |> assign(:publisher, publisher)
    |> assign(:form, to_form(Apps.change_publisher(socket.assigns.current_scope, publisher)))
  end

  @impl true
  def handle_event("validate", %{"publisher" => publisher_params}, socket) do
    changeset =
      Apps.change_publisher(
        socket.assigns.current_scope,
        socket.assigns.publisher,
        publisher_params
      )

    {:noreply, assign(socket, form: to_form(changeset, action: :validate))}
  end

  def handle_event("save", %{"publisher" => publisher_params}, socket) do
    save_publisher(socket, socket.assigns.live_action, publisher_params)
  end

  defp save_publisher(socket, :edit, publisher_params) do
    case Apps.update_publisher(
           socket.assigns.current_scope,
           socket.assigns.publisher,
           publisher_params
         ) do
      {:ok, publisher} ->
        {:noreply,
         socket
         |> put_flash(:info, "Publisher updated successfully")
         |> push_navigate(
           to: return_path(socket.assigns.current_scope, socket.assigns.return_to, publisher)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp save_publisher(socket, :new, publisher_params) do
    case Apps.create_publisher(socket.assigns.current_scope, publisher_params) do
      {:ok, publisher} ->
        {:noreply,
         socket
         |> put_flash(:info, "Publisher created successfully")
         |> push_navigate(
           to: return_path(socket.assigns.current_scope, socket.assigns.return_to, publisher)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp return_path(_scope, "index", _publisher), do: ~p"/publishers"
  defp return_path(_scope, "show", publisher), do: ~p"/publishers/#{publisher}"
end
