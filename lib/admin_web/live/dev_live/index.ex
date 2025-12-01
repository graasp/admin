defmodule AdminWeb.DevLive.Index do
  use AdminWeb, :live_view

  alias Admin.Accounts.Account
  alias Admin.Accounts.UserNotifier

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <h1>Dev Live Index</h1>
      <.button phx-click="send_removal_email">Send removal email</.button>
      <.button phx-click="send_notification_email">Send notification email</.button>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:page_title, "Dev tools")

    {:ok, socket}
  end

  @impl true
  def handle_event("send_removal_email", _, socket) do
    UserNotifier.deliver_publication_removal(
      %Account{name: "John Doe", email: "test@graasp.org"},
      %{created_at: ~U[2023-01-01 00:00:00Z], item: %{name: "Sample name"}},
      %{
        reason: "Some reason that can look believable\n\neven on multiple lines\n\nSample reason"
      }
    )

    {:noreply, socket |> put_flash(:info, "Removal Email sent")}
  end

  def handle_event("send_notification_email", _, socket) do
    UserNotifier.deliver_notification(
      %Account{name: "John Doe", email: "test@graasp.org"},
      "A notification subject",
      "Some Notification text that the user will receive \n\neven on multiple lines\n\nI hope it looks nice"
    )

    {:noreply, socket |> put_flash(:info, "Notification Email sent")}
  end
end
