defmodule AdminWeb.HousekeepingLive.Index do
  use AdminWeb, :live_view

  alias Admin.Housekeeping

  @impl Phoenix.LiveView
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>
        Housekeeping
      </.header>
      <div class="flex flex-col gap-2">
        <.button phx-click="bust-cache" phx-disable-with="Calling backend">Bust cache</.button>
        <div :if={@bust_cache_response}>
          {gettext("Busted %{count} cache entries", count: @bust_cache_response)}
        </div>
      </div>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    socket = socket |> assign(:bust_cache_response, nil)
    {:ok, socket}
  end

  @impl true
  def handle_event("bust-cache", _params, socket) do
    case Housekeeping.bust_cache() do
      {:ok, result} ->
        {:noreply, assign(socket, :bust_cache_response, result)}

      {:error, message} ->
        {:noreply, put_flash(socket, :error, "Request failed with reason: #{message}")}
    end
  end
end
