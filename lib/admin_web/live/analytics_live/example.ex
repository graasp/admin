defmodule AdminWeb.AnalyticsLive.Example do
  use AdminWeb, :live_view
  alias Admin.Analytics.EventStore
  alias VegaLite, as: Vl

  @intervall_ms 1_000

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Vega lite chart example
        <:subtitle>Example of a Vega lite chart</:subtitle>
        <:actions>
          <.button href={~p"/analytics/events"}>
            Event generation page
          </.button>
        </:actions>
      </.header>
      <div
        class="w-full"
        id={"vega-lite-#{@id}"}
        phx-hook="VegaLite"
        phx-update="ignore"
        data-id={@id}
      >
      </div>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    socket = socket |> assign(id: "example")

    if connected?(socket) do
      :timer.send_interval(@intervall_ms, :tick)
    end

    data =
      EventStore.list_all_in_range_tabular(
        DateTime.add(DateTime.utc_now(), -30, :second),
        DateTime.utc_now()
      )

    # Send the specification object to the hook, where it gets
    # rendered using the client side Vega-Lite package
    {:ok,
     socket
     |> push_event("vega_lite:#{socket.assigns.id}:init", %{
       spec: example_vega_lite_spec(data)
     })}
  end

  @impl true
  def handle_info(:tick, socket) do
    data =
      EventStore.list_all_in_range_tabular(
        DateTime.add(DateTime.utc_now(), -60, :second),
        DateTime.utc_now()
      )

    {:noreply,
     socket
     |> push_event("vega_lite:#{socket.assigns.id}:update", %{spec: example_vega_lite_spec(data)})}
  end

  defp example_vega_lite_spec(data) do
    Vl.new(width: -1, height: 200)
    |> Vl.config(background: "transparent")
    |> Vl.data_from_values(data)
    |> Vl.mark(:bar)
    |> Vl.encode_field(:x, "timestamp", type: :temporal)
    |> Vl.encode_field(:y, "count", type: :quantitative)
    # Get the underlying Vega-Lite specification object
    |> Vl.to_spec()
  end
end
