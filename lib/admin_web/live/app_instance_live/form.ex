defmodule AdminWeb.AppInstanceLive.Form do
  use AdminWeb, :live_view

  alias Admin.Apps
  alias Admin.Apps.AppInstance

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        {@page_title}
        <:subtitle>Use this form to manage app_instance records in your database.</:subtitle>
      </.header>

      <.form for={@form} id="app_instance-form" phx-change="validate" phx-submit="save">
        <.input field={@form[:name]} type="text" label="Name" />
        <.input field={@form[:description]} type="text" label="Description" />
        <.input field={@form[:url]} type="text" label="Url" />
        <.input field={@form[:thumbnail]} type="text" label="Thumbnail" />
        <footer>
          <.button phx-disable-with="Saving..." variant="primary">Save App instance</.button>
          <.button navigate={return_path(@current_scope, @return_to, @app_instance)}>Cancel</.button>
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
    app_instance = Apps.get_app_instance!(socket.assigns.current_scope, id)

    socket
    |> assign(:page_title, "Edit App instance")
    |> assign(:app_instance, app_instance)
    |> assign(
      :form,
      to_form(Apps.change_app_instance(socket.assigns.current_scope, app_instance))
    )
  end

  defp apply_action(socket, :new, _params) do
    app_instance = %AppInstance{}

    socket
    |> assign(:page_title, "New App instance")
    |> assign(:app_instance, app_instance)
    |> assign(
      :form,
      to_form(Apps.change_app_instance(socket.assigns.current_scope, app_instance))
    )
  end

  @impl true
  def handle_event("validate", %{"app_instance" => app_instance_params}, socket) do
    changeset =
      Apps.change_app_instance(
        socket.assigns.current_scope,
        socket.assigns.app_instance,
        app_instance_params
      )

    {:noreply, assign(socket, form: to_form(changeset, action: :validate))}
  end

  def handle_event("save", %{"app_instance" => app_instance_params}, socket) do
    save_app_instance(socket, socket.assigns.live_action, app_instance_params)
  end

  defp save_app_instance(socket, :edit, app_instance_params) do
    case Apps.update_app_instance(
           socket.assigns.current_scope,
           socket.assigns.app_instance,
           app_instance_params
         ) do
      {:ok, app_instance} ->
        {:noreply,
         socket
         |> put_flash(:info, "App instance updated successfully")
         |> push_navigate(
           to: return_path(socket.assigns.current_scope, socket.assigns.return_to, app_instance)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp save_app_instance(socket, :new, app_instance_params) do
    case Apps.create_app_instance(socket.assigns.current_scope, app_instance_params) do
      {:ok, app_instance} ->
        {:noreply,
         socket
         |> put_flash(:info, "App instance created successfully")
         |> push_navigate(
           to: return_path(socket.assigns.current_scope, socket.assigns.return_to, app_instance)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp return_path(_scope, "index", _app_instance), do: ~p"/apps"
  defp return_path(_scope, "show", app_instance), do: ~p"/apps/#{app_instance}"
end
