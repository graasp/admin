defmodule AdminWeb.Components.Library do
  @moduledoc """
  A module that defines the library component for the Admin application.
  """

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

  attr :publications, :list

  def publication_grid(assigns) do
    ~H"""
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <%= for publication <- @publications do %>
        <.link navigate={~p"/library/collections/#{publication.item.id}"}>
          <div class="bg-base-100 rounded-lg shadow-sm flex flex-row">
            <div class="p-2">
              <.thumbnail
                src={publication.thumbnails.medium}
                size="medium"
                alt={publication.item.name}
                item_id={publication.item.id}
              />
            </div>
            <div class="p-2">
              <h3 class="font-bold line-clamp-2">{publication.item.name}</h3>
              <span class="">
                <.raw_html
                  class="line-clamp-2"
                  html={publication.item.description}
                  text_only={true}
                />
              </span>
            </div>
          </div>
        </.link>
      <% end %>
    </div>
    """
  end
end
