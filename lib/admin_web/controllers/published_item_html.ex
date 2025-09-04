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
    <div class="flex flex-row justify-between items-center min-w-0 border border-gray-300 p-2 gap-1 rounded">
      <div class="flex flex-row shrink-1 gap-2 align-center min-w-0">
        <div class="shrink-0 size-12 bg-gray-500 rounded" />
        <div class="flex flex-col align-start min-w-0">
          <span class="font-bold text-nowrap text-ellipsis overflow-hidden">
            {@publication.item.name}
          </span>
          <span class="text-sm text-secondary">
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
    case assigns.publication.creator do
      nil ->
        ~H"""
        <span class="italic">Deleted User</span>
        """

      _ ->
        ~H"""
        <span>{@publication.creator.email}</span>
        """
    end
  end
end
