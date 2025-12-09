defmodule AdminWeb.Components.Graphs do
  @moduledoc """
  Module for rendering graphs using Vega Lite.
  """

  use Phoenix.Component

  def init(assigns) do
    ~H"""
    <%!-- Vega lite dependencies --%>
    <script src="https://cdn.jsdelivr.net/npm/vega@6">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/vega-lite@6">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/vega-embed@7.0.2">
    </script>
    """
  end
end
