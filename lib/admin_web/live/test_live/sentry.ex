defmodule AdminWeb.TestLive.Sentry do
  use AdminWeb, :live_view

  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Sentry
        <:subtitle></:subtitle>
        <:actions>
          <.button phx-click="send_message">Create Sentry exception</.button>
        </:actions>
      </.header>
    </Layouts.admin>
    """
  end

  def mount(_params, _session, socket) do
    socket = socket |> assign(:page_title, "Sentry")
    {:ok, socket}
  end

  def handle_event("send_message", _params, socket) do
    Sentry.capture_message("Testing Sentry from admin interface")
    {:noreply, socket}
  end
end
