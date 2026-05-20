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

  attr :folders, :list, required: true

  def table_of_contents(assigns) do
    ~H"""
    <ol class="flex flex-col gap-1">
      <li
        :for={folder <- @folders}
        class="flex items-center gap-2 overflow-hidden"
        style={"padding-left: #{(folder.depth - 1) * 1.25}rem"}
      >
        <.icon name="hero-folder" class="size-5 shrink-0" />
        <span class="overflow-hidden ellipsis w-full text-ellipsis text-nowrap">{folder.name}</span>
      </li>
    </ol>
    """
  end

  attr :publications, :list

  def publication_grid(assigns) do
    ~H"""
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <%= for publication <- @publications do %>
        <div class="bg-base-100 rounded-lg shadow-sm flex flex-row relative">
          <div class="p-2">
            <.thumbnail
              src={publication.thumbnails.medium}
              size="medium"
              alt={publication.item.name}
              item_id={publication.item.id}
            />
          </div>
          <div class="p-2">
            <.link
              class="font-bold line-clamp-2 before:absolute before:inset-0"
              navigate={~p"/library-beta/collections/#{publication.item.id}"}
            >
              {publication.item.name}
            </.link>
            <span class="">
              <.raw_html
                class="line-clamp-2 [&_a]:relative [&_a]:z-10"
                html={publication.item.description}
                text_only={true}
              />
            </span>
          </div>
        </div>
      <% end %>
    </div>
    """
  end
end
