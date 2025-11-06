defmodule AdminWeb.AnalyticsLive.Example do
  use AdminWeb, :live_view

  alias VegaLite, as: Vl

  @intervall_ms 1_000

  @impl true
  def render(assigns) do
    ~H"""
    <div>
      <div
        id={"vega-lite-#{@id}"}
        phx-hook="VegaLite"
        phx-update="ignore"
        data-id={@id}
        data-spec={@spec}
      >
      </div>
    </div>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    socket = socket |> assign(id: "example")

    if connected?(socket) do
      :timer.send_interval(:tick, @intervall_ms)
    end

    data =
      Admin.Analytics.EventStore.list_all_in_range_tabular(
        DateTime.add(DateTime.utc_now(), -30, :second),
        DateTime.utc_now()
      )

    # Send the specification object to the hook, where it gets
    # rendered using the client side Vega-Lite package
    {:ok, socket |> assign(spec: example_vega_lite_spec(data))}
  end

  @impl true
  def handle_info(:tick, socket) do
    data =
      Admin.Analytics.EventStore.list_all_in_range_tabular(
        DateTime.add(DateTime.utc_now(), -30, :second),
        DateTime.utc_now()
      )
      |> IO.inspect()

    {:noreply, socket |> assign(:spec, example_vega_lite_spec(data))}
  end

  defp example_vega_lite_spec(data) do
    Vl.new(width: 400, height: 400)
    |> Vl.config(background: "transparent")
    |> Vl.data_from_values(data)
    |> Vl.mark(:line)
    |> Vl.encode_field(:x, "iteration", type: :temporal)
    |> Vl.encode_field(:y, "score", type: :quantitative)
    # Get the underlying Vega-Lite specification object
    |> Vl.to_spec()
  end
end
