defmodule Admin.SignedUrlCache do
  @moduledoc """
  A module that provides a simple key-value cache with TTL (time-to-live) support to store signed urls to s3 files.

  Options are:
  - `:cleanup_interval_ms`: the interval in milliseconds between cache cleanup runs (default: 5min)
  -
  """
  use GenServer

  @table_name :signed_url_cache

  @typedoc "Opaque cache key type"
  @type key :: term()

  @typedoc "The cached value – here a signed URL, but could be anything"
  @type value :: term()

  @typedoc "Return type from get/1"
  @type get_result :: {:ok, value()} | :not_found | :expired

  ## Public API

  @doc """
  Starts the SignedUrlCache GenServer and creates the ETS table.

  Typically added to your supervision tree:

      {Admin.SignedUrlCache, []}
  """
  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @doc """
  Fetch a value from the cache by key.

  Returns:
    * {:ok, value} if present and not expired
    * :expired if present but expired
    * :not_found if no entry exists

  When a key is expired, it is scheduled for deletion from the cache.
  """
  @spec get(key()) :: get_result()
  def get(key) do
    case :ets.lookup(@table_name, key) do
      [{^key, value, expires_at}] ->
        now = System.system_time(:second)

        if expires_at > now do
          {:ok, value}
        else
          # Lazy cleanup of expired entry
          delete(key)
          :expired
        end

      [] ->
        :not_found
    end
  end

  @doc """
  Put a value into the cache, with a TTL in seconds.

  This is asynchronous – it sends a cast to the GenServer and returns :ok.
  """
  @spec put(key(), value(), non_neg_integer()) :: :ok
  def put(key, value, ttl_seconds) when ttl_seconds >= 0 do
    expires_at = System.system_time(:second) + ttl_seconds
    GenServer.cast(__MODULE__, {:put, key, value, expires_at})
  end

  @doc """
  Delete a key from the cache.

  This goes through the GenServer to centralize writes.
  """
  @spec delete(key()) :: :ok
  def delete(key) do
    GenServer.cast(__MODULE__, {:delete, key})
  end

  @doc """
  Convenience: fetch-or-store.

  If the value is present and valid, returns it.
  If missing or expired, calls `fun` to compute a new value,
  stores it with the given TTL, and returns {:ok, value}.

  `fun` is expected to be a zero-arity function.
  """
  @spec get_or_put(key(), non_neg_integer(), (-> value())) :: get_result()
  def get_or_put(key, ttl_seconds, fun) when is_function(fun, 0) do
    case get(key) do
      {:ok, _} = ok ->
        ok

      :not_found ->
        # generate a value using the provided function
        value = fun.()
        # add the key to the cache with the given TTL
        put(key, value, ttl_seconds)
        {:ok, value}

      :expired ->
        value = fun.()
        put(key, value, ttl_seconds)
        {:ok, value}
    end
  end

  ## GenServer callbacks

  @impl true
  def init(opts) do
    table_opts = [
      :set,
      :protected,
      :named_table,
      read_concurrency: true,
      write_concurrency: true
    ]

    :ets.new(@table_name, table_opts)

    cleanup_interval_ms = Keyword.get(opts, :cleanup_interval_ms, :timer.minutes(5))

    # Schedule periodic cleanup of expired entries (optional, but nice to have)
    schedule_cleanup(cleanup_interval_ms)

    {:ok, %{cleanup_interval_ms: cleanup_interval_ms}}
  end

  @impl true
  def handle_cast({:put, key, value, expires_at}, state) do
    true = :ets.insert(@table_name, {key, value, expires_at})
    {:noreply, state}
  end

  @impl true
  def handle_cast({:delete, key}, state) do
    :ets.delete(@table_name, key)
    {:noreply, state}
  end

  @impl true
  def handle_info(:cleanup, %{cleanup_interval_ms: interval} = state) do
    now = System.system_time(:second)

    # Simple O(n) sweep over table. For very large tables you’d likely
    # want to batch this or use more selective strategies.
    @table_name
    |> :ets.tab2list()
    |> Enum.each(fn {key, _value, expires_at} ->
      if expires_at <= now do
        :ets.delete(@table_name, key)
      end
    end)

    schedule_cleanup(interval)
    {:noreply, state}
  end

  @impl true
  def terminate(_reason, _state) do
    # Optional: delete ETS table on shutdown
    :ets.delete(@table_name)
    :ok
  end

  ## Internal helpers

  defp schedule_cleanup(interval_ms) do
    Process.send_after(self(), :cleanup, interval_ms)
  end
end
