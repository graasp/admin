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
        <:subtitle>
          Publishers are umbrellas for applications and provide origin verification
        </:subtitle>
      </.header>

      <.form for={@form} id="publisher-form" phx-change="validate" phx-submit="save">
        <.input field={@form[:name]} type="text" label="Name" />
        <div class="fieldset mb-2">
          <label class="flex flex-col justify-start gap-2">
            <span class="label">Origins</span>
            <.error :for={error <- Enum.map(@form[:origins].errors, &translate_error(&1))}>
              {error}
            </.error>
            <%= for {origin, index} <- Enum.with_index(Ecto.Changeset.get_field(@form.source, :origins, [""])) do %>
              <input
                id={"origin-#{index}"}
                class="input"
                value={origin}
                name="publisher[origins][]"
                type="text"
                placeholder="https://example.com"
              />
            <% end %>
            <button
              disabled={List.last(@form[:origins].value) == ""}
              phx-click="add_origin"
              type="button"
              class="btn btn-soft w-fit"
            >
              Add Origin
            </button>
          </label>
        </div>
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

  defp apply_action(socket, :edit, %{"publisher_id" => id}) do
    publisher = Apps.get_publisher!(id)

    socket
    |> assign(:page_title, "Edit Publisher")
    |> assign(:publisher, publisher)
    |> assign(:form, to_form(Apps.change_publisher(publisher)))
  end

  defp apply_action(socket, :new, _params) do
    publisher = %Publisher{}

    socket
    |> assign(:page_title, "New Publisher")
    |> assign(:publisher, publisher)
    |> assign(:form, to_form(Apps.change_publisher(publisher)))
  end

  @impl true
  def handle_event("validate", %{"publisher" => publisher_params}, socket) do
    changeset =
      Apps.change_publisher(
        socket.assigns.publisher,
        publisher_params
      )

    {:noreply, assign(socket, form: to_form(changeset, action: :validate))}
  end

  def handle_event("save", %{"publisher" => publisher_params}, socket) do
    save_publisher(socket, socket.assigns.live_action, publisher_params)
  end

  def handle_event("add_origin", _params, socket) do
    existing_origins = Ecto.Changeset.get_field(socket.assigns.form.source, :origins, [])

    changeset =
      Ecto.Changeset.put_change(
        socket.assigns.form.source,
        :origins,
        existing_origins ++ [""]
      )

    {:noreply, assign(socket, form: to_form(changeset))}
  end

  defp save_publisher(socket, :edit, publisher_params) do
    case Apps.update_publisher(
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
    case Apps.create_publisher(publisher_params) do
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
