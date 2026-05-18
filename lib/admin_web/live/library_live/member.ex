defmodule AdminWeb.LibraryLive.Member do
  use AdminWeb, :live_view

  alias Admin.Accounts
  alias Admin.Publications
  alias AdminWeb.Components.Library

  @impl Phoenix.LiveView
  def render(assigns) do
    ~H"""
    <Layouts.landing {assigns} class="bg-base-200">
      <div class="max-w-screen-lg m-auto p-4 mt-10">
        <div class="flex flex-col gap-10">
          <div class="flex flex-row gap-4 items-center">
            <.thumbnail src={@user.thumbnails.medium} alt={@user.name} size="medium" />
            <div class="flex flex-col gap-1">
              <h1 class="text-2xl">{@user.name}</h1>
              <p class="text-sm text-gray-500">
                {gettext("Joined on %{date}",
                  date:
                    @user.created_at
                    |> Admin.Cldr.Date.to_string!(locale: Gettext.get_locale(AdminWeb.Gettext))
                )}
              </p>
            </div>
          </div>
          <div>
            {gettext("Most recent publications")}
            <Library.publication_grid publications={@publications} />
          </div>
        </div>
      </div>
    </Layouts.landing>
    """
  end

  @impl Phoenix.LiveView
  def mount(%{"member_id" => member_id}, _session, socket) do
    {:ok, user} = Accounts.get_member_by_id(member_id)
    publications = Publications.list_published_items_for_member(member_id)
    socket = socket |> assign(:user, user) |> assign(:publications, publications)
    {:ok, socket}
  end
end
