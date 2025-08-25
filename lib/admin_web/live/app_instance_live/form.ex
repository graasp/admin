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
        <div class="flex flex-row gap-2 items-end w-full">
          <div class="w-16 h-16 rounded bg-slate-200 shrink-0 mb-3">
            <img
              :if={@form[:thumbnail].value}
              src={@form[:thumbnail].value}
              class="w-16 h-16 rounded"
              alt="Thumbnail"
            />
          </div>
          <.input field={@form[:thumbnail]} type="text" label="Thumbnail" />
          <.button
            class="btn btn-soft btn-primary mb-3"
            type="button"
            phx-click="generate_thumbnail"
          >
            Use Placeholder
          </.button>
        </div>
        <.input field={@form[:name]} type="text" label="Name" />
        <.input field={@form[:description]} type="text" label="Description" />
        <.input field={@form[:url]} type="text" label="Url" />
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
     |> assign(:publisher, Apps.get_publisher!(params["publisher_id"]))
     |> apply_action(socket.assigns.live_action, params)}
  end

  defp return_to("show"), do: "show"
  defp return_to(_), do: "index"

  defp apply_action(socket, :edit, %{"app_id" => id}) do
    app_instance = Apps.get_app_instance!(socket.assigns.publisher, id)

    socket
    |> assign(:page_title, "Edit App instance")
    |> assign(:app_instance, app_instance)
    |> assign(
      :form,
      to_form(Apps.change_app_instance(app_instance))
    )
  end

  defp apply_action(socket, :new, _params) do
    app_instance = %AppInstance{}

    socket
    |> assign(:page_title, "New App instance")
    |> assign(:app_instance, app_instance)
    |> assign(
      :form,
      to_form(Apps.change_app_instance(app_instance))
    )
  end

  @impl true
  def handle_event("validate", %{"app_instance" => app_instance_params}, socket) do
    changeset =
      Apps.change_app_instance(
        socket.assigns.app_instance,
        app_instance_params
      )

    {:noreply, assign(socket, form: to_form(changeset, action: :validate))}
  end

  def handle_event("generate_thumbnail", _params, socket) do
    changeset =
      socket.assigns.form.source
      |> Ecto.Changeset.put_change(
        :thumbnail,
        "https://picsum.photos/seed/#{System.unique_integer([:positive])}/200/200"
      )

    {:noreply,
     assign(socket,
       form: to_form(changeset)
     )}
  end

  def handle_event("save", %{"app_instance" => app_instance_params}, socket) do
    save_app_instance(socket, socket.assigns.live_action, app_instance_params)
  end

  defp save_app_instance(socket, :edit, app_instance_params) do
    case Apps.update_app_instance(
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
    case Apps.create_app_instance(socket.assigns.publisher, app_instance_params) do
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

  defp return_path(_scope, "index", _app_instance), do: ~p"/publishers"
  defp return_path(_scope, "show", app_instance), do: ~p"/apps/#{app_instance}"
end
