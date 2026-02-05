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
      </.header>

      <.form
        :let={form}
        for={@form}
        id="notification-form"
        phx-change="validate"
        phx-submit="submit"
      >
        <.input autofocus field={form[:name]} type="text" label="Name" phx-debounce="500" />

        <.input
          field={form[:audience]}
          type="select"
          prompt="Select the audience"
          options={[
            [key: "Active users", value: "active"],
            [key: "French speaking users", value: "french"],
            [key: "Graasp team", value: "graasp_team"],
            [key: "Inactive users", value: "inactive", disabled: true],
            [key: "All users", value: "all", disabled: true]
          ]}
          label="Target Audience"
        />

        <%= if Ecto.Changeset.get_change(@form, :audience) != nil do %>
          <div class="flex flex-col gap-2 mb-2">
            <.button
              :if={form[:audience].value != ""}
              type="button"
              phx-click="fetch_recipients"
              phx-value-audience={form[:audience].value}
            >
              Fetch Recipients
            </.button>
            <%= if @recipients != [] do %>
              <div
                class="border rounded p-2 bg-base-100 border-base-300 border"
                phx-click={JS.toggle_class("hidden", to: "#toggled-content")}
              >
                <div class="text-md">
                  {length(@recipients)} recipients for this audience (click to show)
                </div>
                <div class="text-sm hidden" id="toggled-content">
                  <ul class="list-disc list-inside">
                    <%= for %{name: name, email: email, lang: lang} <- @recipients do %>
                      <li>{name} ({email}) - {lang}</li>
                    <% end %>
                  </ul>
                </div>
              </div>
            <% end %>
          </div>
        <% end %>

        <.input
          field={form[:default_language]}
          type="select"
          prompt="Select the default language"
          label="Default Language"
          options={Admin.Languages.all_options()}
        />

        <fieldset class="fieldset">
          <legend class="label">Use only defined languages</legend>

          <.input
            type="checkbox"
            field={form[:use_strict_languages]}
            label="Only defined languages"
            class="checkbox checkbox-primary mb-0"
          />
          <p class="label">
            <%= if Ecto.Changeset.get_field(@form, :use_strict_languages) do %>
              Only users <strong>with a matching language</strong> will receive the notification.
            <% else %>
              <strong>All users in the target audience</strong>
              for undefined languages, <strong>the default language will be used</strong>.
            <% end %>
          </p>
        </fieldset>

        <footer>
          <.button variant="primary">Save Mail</.button>
          <.button navigate={return_path(@current_scope, @return_to, @notification)}>Cancel</.button>
        </footer>
      </.form>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(params, _session, socket) do
    socket =
      socket
      |> apply_action(socket.assigns.live_action, params)

    {:ok, socket}
  end

  defp apply_action(socket, :new, _params) do
    notification = %Notification{}

    changeset =
      Notifications.change_notification(socket.assigns.current_scope, notification, %{
        "name" => "",
        "audience" => "",
        "default_language" => "",
        "use_strict_languages" => false
      })

    socket
    |> assign(:page_title, "New Mail")
    |> assign(:notification, notification)
    |> assign(:form, changeset)
    |> assign(:recipients, [])
    |> assign(:return_to, "index")
  end

  defp apply_action(socket, :edit, %{"notification_id" => id}) do
    notification = Notifications.get_notification!(socket.assigns.current_scope, id)
    included_langs = notification.localized_emails |> Enum.map(& &1.language)

    {:ok, recipients, _meta} =
      Notifications.get_target_audience(
        socket.assigns.current_scope,
        notification.audience,
        if(notification.use_strict_languages, do: [only_langs: included_langs], else: [])
      )

    socket
    |> assign(:page_title, "Edit Mail")
    |> assign(:notification, notification)
    |> assign(
      :form,
      Notifications.change_notification(socket.assigns.current_scope, notification)
    )
    |> assign(:recipients, recipients)
    |> assign(:return_to, "show")
  end

  @impl true
  def handle_event("fetch_recipients", %{"audience" => audience}, socket) do
    {:ok, recipients, _meta} =
      Notifications.get_target_audience(socket.assigns.current_scope, audience)

    socket = socket |> assign(:recipients, recipients)
    {:noreply, socket}
  end

  @impl true
  def handle_event("validate", %{"notification" => params}, socket) do
    changeset =
      Notifications.change_notification(socket.assigns.current_scope, %Notification{}, params)
      |> Map.put(:action, :validate)

    {:noreply, socket |> assign(:form, changeset)}
  end

  @impl true
  def handle_event("submit", %{"notification" => params}, socket) do
    save_email_notification(socket, socket.assigns.live_action, params)
  end

  defp save_email_notification(socket, :new, params) do
    case Notifications.create_notification(socket.assigns.current_scope, params) do
      {:ok, %Notification{} = notif} ->
        {:noreply,
         socket
         |> push_navigate(to: ~p"/admin/notifications/#{notif}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply,
         socket
         |> assign(:form, changeset)}
    end
  end

  defp save_email_notification(socket, :edit, params) do
    case Notifications.update_notification(
           socket.assigns.current_scope,
           socket.assigns.notification,
           params
         ) do
      {:ok, %Notification{} = notif} ->
        {:noreply,
         socket
         |> push_navigate(to: ~p"/admin/notifications/#{notif}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply,
         socket
         |> assign(:form, changeset)}
    end
  end

  defp return_path(_scope, "show", notification), do: ~p"/admin/notifications/#{notification}"
  defp return_path(_scope, _, _), do: ~p"/admin/notifications"
end
