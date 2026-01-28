defmodule AdminWeb.PublishedItemHTML do
  use AdminWeb, :html
  alias Admin.Publications.PublishedItem

  embed_templates "published_item_html/*"

  @doc """
  Renders a published_item form.

  The form is defined in the template at
  published_item_html/published_item_form.html.heex
  """
  attr :changeset, Ecto.Changeset, required: true
  attr :action, :string, required: true
  attr :return_to, :string, default: nil

  def published_item_form(assigns)

  @doc """
  Renders a publication item row
  """
  attr :publication, PublishedItem, required: true
  slot :action, doc: "Actions to perform on the publication row"

  def publication_row(assigns) do
    ~H"""
    <div class="flex flex-row justify-between items-start min-w-0 border border-base-300 bg-base-100 p-2 gap-1 rounded">
      <div class="flex flex-row shrink-1 gap-2 align-center min-w-0">
        <%= if Map.get(@publication, :thumbnails) |> Map.get(:small) do %>
          <.thumbnail
            src={@publication.thumbnails.small}
            size="small"
            alt={@publication.item.name}
          />
        <% else %>
          <div class="shrink-0 size-12 bg-gray-500 rounded" />
        <% end %>
        <div class="flex flex-col align-start min-w-0">
          <span class="font-bold text-nowrap text-ellipsis overflow-hidden">
            {@publication.item.name}
          </span>
          <span class="text-sm text-secondary line-clamp-4">
            <.raw_html html={@publication.item.description} />
          </span>
        </div>
      </div>
      {render_slot(@action)}
    </div>
    """
  end

  attr :publication, PublishedItem, required: true

  def publication_creator(assigns) do
    case assigns.publication.creator_id do
      nil ->
        ~H"""
        <span class="italic">Deleted User</span>
        """

      _ ->
        ~H"""
        <div class="flex flex-col align-start min-w-0">
          <span class=" text-nowrap text-ellipsis overflow-hidden">
            <span>{@publication.creator.name}</span>
          </span>
          <span class="text-sm text-neutral">({@publication.creator_id})</span>

          <div class="text-sm">
            <.with_copy
              id={"#{@publication.creator_id}-creator-email"}
              aria_label="Copy creator email to clipboard"
            >
              {@publication.creator.email}
            </.with_copy>
          </div>
        </div>
        """
    end
  end
end
