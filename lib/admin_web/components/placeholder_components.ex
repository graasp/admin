defmodule AdminWeb.Placeholders do
  @moduledoc """
  Contains a collection of components to render placeholders.

  These components are usefull when designing an interface with you do not have content available yet.
  """
  use Phoenix.Component

  @doc """
  Renders a mock section for placeholder components

  ## Examples

      <.mock_section title="My Section">
        <:action>
          <.button navigate={~p"/other_route"}>View</.button>
        </:action>
        <:placeholder />
        <:placeholder />
        <:placeholder />
      </.mock_section>
  """
  attr :title, :string, required: true

  slot :placeholder, required: false

  slot :action, doc: "the slot for showing user actions in the header"

  def mock_section(assigns) do
    ~H"""
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <h2>{@title}</h2>
        <%= if @action do %>
          {render_slot(@action)}
        <% end %>
      </div>
      <%= for placeholder <- @placeholder do %>
        <div class="h-5 w-full bg-neutral rounded"></div>
      <% end %>
    </div>
    """
  end
end
