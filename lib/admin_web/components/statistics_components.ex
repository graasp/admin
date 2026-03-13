defmodule AdminWeb.StatisticsComponents do
  @moduledoc """
  Components for displaying statistics.
  """
  use Phoenix.Component

  import AdminWeb.IconComponents

  slot :inner_block

  attr :title, :string, required: true
  attr :value, :any, required: true

  def stat(assigns) do
    ~H"""
    <div class="stat">
      <div class="stat-title">{@title}</div>
      <div class="stat-value">{@value}</div>
      <div class="stat-desc">{render_slot(@inner_block)}</div>
    </div>
    """
  end

  attr :stat, :map, required: true
  attr :title, :string, required: true

  def stat_comparison(assigns) do
    diff = assigns.stat.current - assigns.stat.prev

    diff_percent =
      case assigns.stat.prev do
        0 -> 100
        _ -> div(diff * 100, assigns.stat.prev)
      end

    is_inc = diff >= 0

    assigns =
      assigns
      |> assign(is_inc: is_inc)
      |> assign(diff: diff)
      |> assign(diff_percent: abs(diff_percent))

    ~H"""
    <.stat title={@title} value={@stat.current}>
      <%= if assigns.is_inc do %>
        <.icon name="hero-arrow-trending-up" class="text-success size-4" />
      <% else %>
        <.icon name="hero-arrow-trending-down" class="text-error size-4" />
      <% end %>
      {@diff} ({@diff_percent}%)
    </.stat>
    """
  end
end
