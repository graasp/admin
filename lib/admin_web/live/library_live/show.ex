defmodule AdminWeb.LibraryLive.Show do
  use AdminWeb, :live_view

  alias Admin.Publications

  @impl Phoenix.LiveView
  def mount(%{"item_id" => item_id}, _session, socket) do
    publication =
      Publications.get_published_item_id_for_item_id(item_id)
      |> Publications.get_published_item!()
      |> Publications.with_item()

    socket =
      socket
      |> assign(
        :publication,
        publication
      )
      |> assign(:page_title, publication.item.name)
      |> assign(:page_description, publication.item.description)

    {:ok, socket}
  end

  @impl Phoenix.LiveView
  def render(assigns) do
    ~H"""
    <Layouts.landing {assigns}>
      <div class="max-w-screen-lg m-auto p-4">
        <div class="flex flex-col gap-4 ">
          <.button class="w-fit" navigate={~p"/library"}>
            <.icon name="hero-arrow-left" class="size-4 mr-2" />Back to all collections
          </.button>
          <.thumbnail
            src={@publication.thumbnails.large}
            size="large"
            alt={@publication.item.name}
          />
          <h1 class="text-2xl font-bold mb-4">{@publication.item.name}</h1>
          <.raw_html html={@publication.item.description} />
        </div>
      </div>
    </Layouts.landing>
    """
  end
end
