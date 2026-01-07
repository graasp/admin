defmodule AdminWeb.AppInstanceLive.Form do
  use AdminWeb, :live_view

  alias Admin.Apps
  alias Admin.Apps.AppInstance

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        {@page_title}
        <:subtitle>Use this form to manage app_instance records in your database.</:subtitle>
      </.header>

      <.form for={@form} id="app_instance-form" phx-change="validate" phx-submit="save">
        <div class="flex flex-row gap-2 items-start w-full">
          <div class="w-16 h-16 rounded bg-slate-200 shrink-0 mb-3">
            <img
              :if={@form[:thumbnail].value}
              src={@form[:thumbnail].value}
              class="w-16 h-16 rounded"
              alt="Thumbnail url"
            />
          </div>
          <.input field={@form[:thumbnail]} type="text" label="Thumbnail URL">
            <.button
              class="btn btn-soft btn-primary"
              type="button"
              phx-click="generate_thumbnail"
            >
              Use Placeholder
            </.button>
          </.input>
        </div>
        <.input field={@form[:name]} type="text" label="Name" />
        <.input field={@form[:description]} type="text" label="Description" />
        <.input field={@form[:url]} type="text" label="Url" placeholder="https://example.com" />
        <div class="flex flex-row gap-2 items-end w-full">
          <.input field={@form[:key]} type="text" label="Key">
            <.button
              class="btn btn-soft btn-primary"
              type="button"
              phx-click="generate_key"
            >
              Generate key
            </.button>
          </.input>
        </div>
        <%= if @compatible_publishers do %>
          <.input
            field={@form[:publisher_id]}
            type="select"
            label="Publisher"
            options={@compatible_publishers}
          />
        <% end %>
        <footer class="flex gap-2 justify-end">
          <.button navigate={return_path(@current_scope, @return_to, @app_instance)}>Cancel</.button>
          <.button
            phx-disable-with="Saving..."
            variant="primary"
          >
            Save App
          </.button>
        </footer>
      </.form>
      <div :if={@app_instance.id} role="alert" class="alert alert-info alert-soft">
        <.icon name="hero-information-circle" class="w-6 h-6" />
        <span>
          To delete the app go to
          <.link navigate={return_path(@current_scope, "show", @app_instance)} class="link">
            the display page
          </.link>
        </span>
      </div>
    </Layouts.admin>
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

    app_origin =
      URI.parse(app_instance.url)
      |> Map.put(:path, "")
      |> Map.put(:query, nil)
      |> URI.to_string()

    compatible_publishers =
      Apps.get_compatible_publishers(app_origin)
      |> Enum.map(fn publisher -> {publisher.name, publisher.id} end)

    socket
    |> assign(:page_title, "Edit App instance")
    |> assign(:app_instance, app_instance)
    |> assign(:compatible_publishers, compatible_publishers)
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
    |> assign(:compatible_publishers, nil)
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

  def handle_event("generate_key", _params, socket) do
    changeset =
      socket.assigns.form.source
      |> Ecto.Changeset.put_change(
        :key,
        Ecto.UUID.generate()
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

  defp return_path(_scope, "index", _app_instance), do: ~p"/admin/publishers"
  defp return_path(_scope, "show", app_instance), do: ~p"/admin/apps/#{app_instance}"
end
