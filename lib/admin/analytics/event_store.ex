defmodule Admin.Analytics.EventStore do
  @moduledoc """
  GenServer that owns an ETS table for per-second event counts.
  Start under supervision in MyApp.Application.
  """

  use GenServer

  @table :analytics_events

  # Public API

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, :ok, Keyword.merge([name: __MODULE__], opts))
  end

  @doc """
  Track an event at the given timestamp (DateTime, NaiveDateTime, or ISO8601 string).
  Safe to call from anywhere; the GenServer owns the ETS table.
  """
  def track_event(ts) do
    GenServer.cast(__MODULE__, {:track_event, ts})
  end

  @doc """
  Get count for a specific second key {y,m,d,h,mm,ss}.
  """
  def get_count({_y, _m, _d, _h, _mm, _ss} = key) do
    case :ets.lookup(@table, key) do
      [{^key, count}] -> count
      [] -> 0
    end
  end

  @doc """
  List all counters sorted by time.
  """
  def list_all do
    :ets.tab2list(@table)
    |> Enum.sort_by(fn {{y, m, d, h, mm, ss}, _} -> {y, m, d, h, mm, ss} end)
  end

  @doc """
  List counts for a range of seconds [start, end], inclusive.
  Inputs can be DateTime, NaiveDateTime, or ISO8601 strings.
  Returns a list of {{y,m,d,h,mm,ss}, count} sorted by time.
  """
  def list_all_in_range(start_ts, end_ts) do
    {start_sec, end_sec} =
      {to_utc_unix_sec(start_ts), to_utc_unix_sec(end_ts)}
      |> then(fn {s, e} -> if s <= e, do: {s, e}, else: {e, s} end)

    start_sec..end_sec
    |> Enum.map(fn sec ->
      dt = DateTime.from_unix!(sec, :second)
      key = {dt.year, dt.month, dt.day, dt.hour, dt.minute, dt.second}

      count =
        case :ets.lookup(@table, key) do
          [{^key, c}] -> c
          [] -> 0
        end

      {key, count}
    end)
  end

  @doc """
  Returns tabular rows for a second range: [%{timestamp: "YYYY-MM-DD HH:MM:SS", count: n}, ...]
  """
  def list_all_in_range_tabular(start_ts, end_ts) do
    list_all_in_range(start_ts, end_ts)
    |> Enum.map(fn {{y, m, d, h, mm, ss}, count} ->
      %{
        timestamp: format_ymd_hms(y, m, d, h, mm, ss),
        count: count
      }
    end)
  end

  # GenServer callbacks

  @impl true
  def init(:ok) do
    # Owned ETS table so it lives with this process
    :ets.new(@table, [
      :set,
      :protected,
      :named_table,
      read_concurrency: true,
      write_concurrency: true
    ])

    {:ok, %{table: @table}}
  end

  @impl true
  def handle_cast({:track_event, ts}, _state) do
    key = get_key_from_ts(ts)

    # Atomic counter update; if row absent, initialize to 0 then increment by 1
    :ets.update_counter(@table, key, {2, 1}, {key, 0})

    {:noreply, %{table: @table}}
  end

  # Helpers

  defp get_key_from_ts(ts) when is_binary(ts) do
    case DateTime.from_iso8601(ts) do
      {:ok, dt, _} ->
        second_key_from_dt(DateTime.shift_zone!(dt, "Etc/UTC"))

      _ ->
        case NaiveDateTime.from_iso8601(ts) do
          {:ok, ndt} -> second_key_from_naive(ndt)
        end
    end
  end

  defp get_key_from_ts(ts)
       when match?(%DateTime{}, ts),
       do: second_key_from_dt(DateTime.shift_zone!(ts, "Etc/UTC"))

  defp get_key_from_ts(ts)
       when match?(%NaiveDateTime{}, ts),
       do: second_key_from_naive(ts)

  defp get_key_from_ts(_ts), do: second_key_from_dt(DateTime.utc_now())

  defp second_key_from_naive(%NaiveDateTime{
         year: y,
         month: m,
         day: d,
         hour: h,
         minute: mm,
         second: ss
       }),
       do: {y, m, d, h, mm, ss}

  defp second_key_from_dt(%DateTime{year: y, month: m, day: d, hour: h, minute: mm, second: ss}),
    do: {y, m, d, h, mm, ss}

  defp to_utc_unix_sec(%DateTime{} = dt) do
    dt |> DateTime.shift_zone!("Etc/UTC") |> DateTime.to_unix(:second)
  end

  defp to_utc_unix_sec(%NaiveDateTime{} = ndt) do
    ndt |> DateTime.from_naive!("Etc/UTC") |> DateTime.to_unix(:second)
  end

  defp to_utc_unix_sec(ts) when is_binary(ts) do
    case DateTime.from_iso8601(ts) do
      {:ok, dt, _} ->
        to_utc_unix_sec(dt)

      _ ->
        case NaiveDateTime.from_iso8601(ts) do
          {:ok, ndt} -> to_utc_unix_sec(ndt)
          _ -> DateTime.to_unix(DateTime.utc_now(), :second)
        end
    end
  end

  defp format_ymd_hms(y, m, d, h, mm, ss) do
    # Zero-pad to ensure stable tabular formatting
    :io_lib.format("~4..0B-~2..0B-~2..0B ~2..0B:~2..0B:~2..0B", [y, m, d, h, mm, ss])
    |> IO.iodata_to_binary()
  end
end
