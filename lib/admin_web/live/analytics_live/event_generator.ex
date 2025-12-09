defmodule AdminWeb.AnalyticsLive.EventGenerator do
  use AdminWeb, :live_view

  alias Admin.Analytics.EventStore

  @impl true
  def render(assigns) do
    # creates an interface with a single button that send an event when pressed
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.button phx-click="send_event">Send Event</.button>
    </Layouts.admin>
    """
  end

  @impl true
  def handle_event("send_event", _params, socket) do
    EventStore.track_event(DateTime.utc_now())
    {:noreply, socket}
  end
end
