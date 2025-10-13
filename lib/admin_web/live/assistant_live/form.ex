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
        <img class="size-20 rounded object-cover" src={@form[:picture].value} alt="Assistant Picture" />

        <section phx-drop-target={@uploads.avatar.ref}>
          <%!-- render each avatar entry --%>
          <article :for={entry <- @uploads.avatar.entries} class="upload-entry">
            <figure class="min-size-20 rounded object-cover">
              <.live_img_preview entry={entry} />
              <%!-- <figcaption class="text-sm">{entry.client_name}</figcaption> --%>
            </figure>

            <%= if entry.progress > 0 do %>
              <%!-- entry.progress will update automatically for in-flight entries --%>
              <progress value={entry.progress} max="100">
                {entry.progress}%
              </progress>

              <%!-- a regular click event whose handler will invoke Phoenix.LiveView.cancel_upload/3 --%>
              <button
                type="button"
                phx-click="cancel-upload"
                phx-value-ref={entry.ref}
                aria-label="cancel"
              >
                &times;
              </button>
            <% end %>

            <%!-- Phoenix.Component.upload_errors/2 returns a list of error atoms --%>
            <p :for={err <- upload_errors(@uploads.avatar, entry)} class="alert alert-danger">
              {error_to_string(err)}
            </p>
          </article>

          <%!-- Phoenix.Component.upload_errors/1 returns a list of error atoms --%>
          <p :for={err <- upload_errors(@uploads.avatar)} class="alert alert-danger">
            {error_to_string(err)}
          </p>
        </section>

        <span class={["", if(length(@uploads.avatar.entries) > 0, do: "hidden")]}>
          <.live_file_input class="btn" upload={@uploads.avatar} />
        </span>

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
     |> assign(:uploaded_picture, nil)
     |> allow_upload(:avatar,
       accept: ~w(.jpg .jpeg .png),
       max_file_size: 10_000_000,
       max_entries: 1
     )
     |> apply_action(socket.assigns.live_action, params)}
  end

  defp return_to("show"), do: "show"
  defp return_to(_), do: "index"

  defp error_to_string(:too_large), do: "Too large"
  defp error_to_string(:not_accepted), do: "You have selected an unacceptable file type"

  defp apply_action(socket, :edit, %{"assistant_id" => id}) do
    assistant = SmartAssistants.get_assistant!(socket.assigns.current_scope, id)

    socket
    |> assign(:page_title, "Edit Assistant")
    |> assign(:assistant, assistant)
    |> assign(
      :form,
      to_form(SmartAssistants.change_assistant(socket.assigns.current_scope, assistant))
    )
  end

  defp apply_action(socket, :new, _params) do
    assistant = %Assistant{user_id: socket.assigns.current_scope.user.id}

    socket
    |> assign(:page_title, "New Assistant")
    |> assign(:assistant, assistant)
    |> assign(
      :form,
      to_form(SmartAssistants.change_assistant(socket.assigns.current_scope, assistant))
    )
  end

  @impl true
  def handle_event("validate", %{"assistant" => assistant_params}, socket) do
    changeset =
      SmartAssistants.change_assistant(
        socket.assigns.current_scope,
        socket.assigns.assistant,
        assistant_params
      )

    socket.assigns |> IO.inspect()
    {:noreply, assign(socket, form: to_form(changeset, action: :validate))}
  end

  def handle_event("save", %{"assistant" => assistant_params}, socket) do
    save_assistant(socket, socket.assigns.live_action, assistant_params)

    uploaded_file =
      consume_uploaded_entries(socket, :avatar, fn %{path: path}, _entry ->
        ExAws.S3.put_object(
          "file-items",
          "assistants/#{socket.assigns.assistant.id}",
          File.read!(path)
        )
        |> ExAws.request()

        {:ok}
      end)

    {:noreply,
     socket
     |> push_navigate(
       to:
         return_path(
           socket.assigns.current_scope,
           socket.assigns.return_to,
           socket.assigns.assistant
         )
     )}
  end

  defp save_assistant(socket, :edit, assistant_params) do
    case SmartAssistants.update_assistant(
           socket.assigns.current_scope,
           socket.assigns.assistant,
           assistant_params
         ) do
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
