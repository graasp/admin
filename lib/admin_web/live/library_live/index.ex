defmodule AdminWeb.LibraryLive.Index do
  use AdminWeb, :live_view

  alias Admin.Publications
  alias AdminWeb.Components.Library

  @impl Phoenix.LiveView
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:publications, Publications.list_published_items(24))
      |> assign(:page_title, gettext("Published Items"))

    {:ok, socket}
  end

  @impl Phoenix.LiveView
  def render(assigns) do
    ~H"""
    <Layouts.landing {assigns} class="bg-base-200">
      <div class="max-w-screen-lg m-auto p-4 mt-10">
        <h1 class="text-2xl font-bold mb-4">{gettext("Published Items")}</h1>

        <Library.publication_grid publications={@publications} />
      </div>
    </Layouts.landing>
    """
  end
end
