defmodule AdminWeb.Components.Library do
  use AdminWeb, :html

  attr :label, :string
  slot :inner_block

  def detail_bullet(assigns) do
    ~H"""
    <div class="flex items-center gap-2">
      <span class="font-bold">{@label}</span>
      {render_slot(@inner_block)}
    </div>
    """
  end
end
