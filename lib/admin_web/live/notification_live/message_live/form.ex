defmodule AdminWeb.NotificationMessageLive.Form do
  use AdminWeb, :live_view

  alias Admin.Notifications
  alias Admin.Notifications.LocalizedEmail

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Add a Message
      </.header>

      <.form
        :let={form}
        for={@form}
        id="notification-message-form"
        phx-change="validate"
        phx-submit="submit"
      >
        <.input
          field={form[:language]}
          type="select"
          prompt="Select the language"
          options={@language_options}
          label="Language"
        />
        <.input field={form[:subject]} type="text" label="Subject" />
        <.input field={form[:message]} type="textarea" label="Message" rows={5} />
        <.input field={form[:button_text]} type="text" label="Button Text" />
        <.input field={form[:button_url]} type="url" label="Button URL" />

        <footer>
          <.button variant="primary">Save Mail</.button>
          <.button type="button" variant="primary" navigate={~p"/notifications/#{@notification}"}>
            Cancel
          </.button>
        </footer>
      </.form>

      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <legend class="fieldset-legend">Preview</legend>
        <iframe
          id="preview-frame"
          class="w-full h-100"
          srcdoc={@preview_html}
        />
      </fieldset>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(%{"notification_id" => notification_id}, _session, socket) do
    notification = Notifications.get_notification!(socket.assigns.current_scope, notification_id)
    already_assigned_langs = notification.localized_emails |> Enum.map(& &1.language)

    language_options =
      [
        English: "en",
        French: "fr",
        Spanish: "es",
        Italian: "it",
        German: "de"
      ]
      |> Enum.map(fn {name, code} ->
        Keyword.new(key: name, value: code, disabled: Enum.member?(already_assigned_langs, code))
      end)

    localized_email =
      Notifications.change_localized_email(
        socket.assigns.current_scope,
        notification,
        %LocalizedEmail{},
        %{
          "subject" => "",
          "message" => "",
          "button_text" => "",
          "button_url" => "",
          "language" => ""
        }
      )

    preview_html = render_email_preview(localized_email)

    socket =
      socket
      |> assign(:page_title, "New Mailing")
      |> assign(:notification, notification)
      |> assign(:form, localized_email)
      |> assign(:language_options, language_options)
      |> assign(:preview_html, preview_html)
      # start with one empty input
      |> assign(:recipients, [])

    {:ok, socket}
  end

  @impl true
  def handle_event("validate", %{"localized_email" => params}, socket) do
    changeset =
      Notifications.change_localized_email(
        socket.assigns.current_scope,
        socket.assigns.notification,
        %LocalizedEmail{},
        params
      )
      |> Map.put(:action, :validate)

    preview_html = render_email_preview(changeset)

    {:noreply,
     socket
     |> assign(:form, changeset)
     |> assign(:preview_html, preview_html)}
  end

  @impl true
  def handle_event("submit", %{"localized_email" => params}, socket) do
    case Notifications.create_localized_email(
           socket.assigns.current_scope,
           socket.assigns.notification.id,
           params
         ) do
      {:ok, %LocalizedEmail{} = _localized_email} ->
        {:noreply,
         socket
         |> put_flash(:info, "Localized email created")
         |> push_navigate(to: ~p"/notifications/#{socket.assigns.notification}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply,
         socket
         |> assign(:form, changeset)}
    end
  end

  defp render_email_preview(changeset) do
    AdminWeb.EmailTemplates.render("call_to_action", %{
      name: "<USER_NAME>",
      message: Ecto.Changeset.get_field(changeset, :message),
      button_text: Ecto.Changeset.get_field(changeset, :button_text),
      button_url: Ecto.Changeset.get_field(changeset, :button_url)
    })
  end
end
