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
        <.input field={form[:message]} type="textarea" label="Message" rows={5} phx-debounce="500" />
        <.input field={form[:button_text]} type="text" label="Button Text" phx-debounce="500" />
        <.input field={form[:button_url]} type="url" label="Button URL" phx-debounce="500" />

        <footer>
          <.button variant="primary">Save Mail</.button>
          <.button type="button" navigate={~p"/admin/notifications/#{@notification}"}>
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
  def mount(%{"notification_id" => notification_id} = params, _session, socket) do
    notification = Notifications.get_notification!(socket.assigns.current_scope, notification_id)
    already_assigned_langs = notification.localized_emails |> Enum.map(& &1.language)

    language_options = Admin.Languages.disabling(already_assigned_langs)

    socket =
      socket
      |> assign(:notification, notification)
      |> assign(:language_options, language_options)
      |> apply_action(socket.assigns.live_action, params)

      # start with one empty input
      |> assign(:recipients, [])

    {:ok, socket}
  end

  def apply_action(socket, :new, params) do
    localized_email = %LocalizedEmail{}
    # language supplied in the params of the url
    language = Map.get(params, "language", "")

    # set the locale for the email translation
    Gettext.put_locale(AdminWeb.EmailTemplates.Gettext, language)

    changeset =
      Notifications.change_localized_email(
        socket.assigns.current_scope,
        socket.assigns.notification,
        localized_email,
        %{
          "subject" => "",
          "message" => "",
          "button_text" => "",
          "button_url" => "",
          "language" => language
        }
      )

    preview_html = render_email_preview(changeset)

    socket
    |> assign(:page_title, "New localized message")
    |> assign(:localized_email, localized_email)
    |> assign(:form, changeset)
    |> assign(:preview_html, preview_html)
  end

  def apply_action(socket, :edit, %{"lang" => lang} = _params) do
    localized_email =
      Notifications.get_localized_email_by_lang!(
        socket.assigns.current_scope,
        socket.assigns.notification.id,
        lang
      )

    # set the locale for the email translation
    Gettext.put_locale(AdminWeb.EmailTemplates.Gettext, lang)

    changeset =
      Notifications.change_localized_email(
        socket.assigns.current_scope,
        socket.assigns.notification,
        localized_email,
        %{}
      )

    preview_html = render_email_preview(changeset)

    socket
    |> assign(:page_title, "Edit Mailing")
    |> assign(:localized_email, localized_email)
    |> assign(:form, changeset)
    |> assign(:preview_html, preview_html)
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

    # get updated value
    language = Ecto.Changeset.get_field(changeset, :language)
    # set the locale for the email translation
    Gettext.put_locale(AdminWeb.EmailTemplates.Gettext, language)

    preview_html = render_email_preview(changeset)

    {:noreply,
     socket
     |> assign(:form, changeset)
     |> assign(:preview_html, preview_html)}
  end

  @impl true
  def handle_event("submit", %{"localized_email" => localized_email_params}, socket) do
    save_localized_email(socket, socket.assigns.live_action, localized_email_params)
  end

  defp save_localized_email(socket, :edit, localized_email_params) do
    case Notifications.update_localized_email(
           socket.assigns.current_scope,
           socket.assigns.localized_email,
           localized_email_params
         ) do
      {:ok, %LocalizedEmail{} = _localized_email} ->
        {:noreply,
         socket
         |> put_flash(:info, "Localized email updated successfully")
         |> push_navigate(to: ~p"/admin/notifications/#{socket.assigns.notification}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp save_localized_email(socket, :new, localized_email_params) do
    case Notifications.create_localized_email(
           socket.assigns.current_scope,
           socket.assigns.notification.id,
           localized_email_params
         ) do
      {:ok, %LocalizedEmail{} = _localized_email} ->
        {:noreply,
         socket
         |> put_flash(:info, "Localized email created")
         |> push_navigate(to: ~p"/admin/notifications/#{socket.assigns.notification}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply,
         socket
         |> assign(:form, changeset)}
    end
  end

  defp render_email_preview(changeset) do
    Gettext.get_locale(AdminWeb.EmailTemplates.Gettext) |> IO.inspect(label: "email local")

    AdminWeb.EmailTemplates.render("call_to_action", %{
      name: "<USER_NAME>",
      message: Ecto.Changeset.get_field(changeset, :message),
      button_text: Ecto.Changeset.get_field(changeset, :button_text),
      button_url: Ecto.Changeset.get_field(changeset, :button_url)
    })
  end
end
