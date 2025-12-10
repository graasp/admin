defmodule AdminWeb.NotificationMessageLive.New do
  use AdminWeb, :live_view

  alias Admin.Accounts
  alias Admin.Notifications
  alias Admin.Notifications.Notification
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
          options={[
            English: "en",
            French: "fr",
            Spanish: "es",
            Italian: "it",
            German: "de"
          ]}
          label="Language"
        />
        <.input field={form[:subject]} type="text" label="Subject" />
        <.input field={form[:message]} type="textarea" label="Message" rows={5} />
        <.input field={form[:button_text]} type="text" label="Button Text" />
        <.input field={form[:button_url]} type="url" label="Button URL" />

        <footer>
          <.button variant="primary">Save Mail</.button>
        </footer>
      </.form>

      <iframe
        id="preview-frame"
        class="w-full h-100"
        srcdoc={@preview_html}
      />
    </Layouts.admin>
    """
  end

  @impl true
  def mount(%{"notification_id" => notification_id}, _session, socket) do
    localized_email =
      Notifications.change_localized_email(
        socket.assigns.current_scope,
        %LocalizedEmail{notification_id: notification_id},
        %{
          "subject" => "",
          "message" => "",
          "button_text" => "",
          "button_url" => "",
          "language" => ""
        }
      )

    socket =
      socket
      |> assign(:page_title, "New Mailing")
      |> assign(:form, localized_email)
      |> assign(:preview_html, "")
      # start with one empty input
      |> assign(:recipients, [])

    {:ok, socket}
  end

  @impl true
  def handle_event("validate", %{"localized_email" => params}, socket) do
    changeset =
      Notifications.change_localized_email(
        socket.assigns.current_scope,
        %LocalizedEmail{},
        params
      )
      |> Map.put(:action, :validate)

    preview_html =
      AdminWeb.EmailTemplates.render("call_to_action", %{
        name: "YOUR NAME",
        message: Ecto.Changeset.get_field(changeset, :message),
        button_text: Ecto.Changeset.get_field(changeset, :button_text),
        button_url: Ecto.Changeset.get_field(changeset, :button_url)
      })

    {:noreply,
     socket
     |> assign(:form, changeset)
     |> assign(:preview_html, preview_html)}
  end
end
