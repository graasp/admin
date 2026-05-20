defmodule AdminWeb.LibraryLive.Show do
  use AdminWeb, :live_view
  use Gettext, backend: AdminWeb.Gettext

  alias Admin.Actions
  alias Admin.Items
  alias Admin.Publications
  alias AdminWeb.Components.Library

  @impl Phoenix.LiveView
  def mount(%{"item_id" => item_id}, _session, socket) do
    if connected?(socket) do
      # save an action view when users are connected to the socket
      Admin.Actions.create_action(%{
        type: "collection-view",
        view: "library",
        item_id: item_id,
        account_id: nil
      })
    end

    publication =
      Publications.get_publication_id_for_item_id(item_id)
      |> Publications.get_published_item!()
      |> Publications.with_item()

    socket =
      socket
      |> assign(
        :publication,
        publication
      )
      |> assign(:authors, Publications.get_authors(publication.item))
      |> assign(:collection_toc, Publications.get_collection_folders(publication.item))
      |> assign(:page_title, publication.item.name)
      |> assign(:page_description, publication.item.description)
      |> assign(:page_image, url(~p"/library/collections/#{publication.item}/thumbnail"))
      |> assign(:like_count, Items.count_likes(publication.item.id))
      |> assign(:view_count, Actions.get_count_by_type(item_id, "collection-view"))

    {:ok, socket}
  end

  @impl Phoenix.LiveView
  def render(assigns) do
    ~H"""
    <Layouts.landing {assigns}>
      <div class="max-w-screen-lg m-auto p-4 mt-10">
        <div class="flex flex-col gap-10">
          <.button variant="ghost" class="w-fit" navigate={~p"/library-beta"}>
            <.icon name="hero-arrow-left" class="size-5" />{gettext("Back")}
          </.button>
          <div class="flex flex-col gap-12 sm:flex-row">
            <.thumbnail
              src={@publication.thumbnails.large}
              size="large"
              alt={@publication.item.name}
              item_id={@publication.item.id}
            />
            <div class="flex flex-col gap-4 w-full">
              <div class="flex flex-col md:flex-row gap-2 w-full justify-between">
                <h1 class="text-3xl font-bold mb-4">{@publication.item.name}</h1>
                <div class="flex flex-row gap-2">
                  <.link
                    class="btn btn-primary btn-lg"
                    href={"/player/#{@publication.item.id}/#{@publication.item.id}"}
                  >
                    <.icon name="hero-play" class="size-5" />
                    {gettext("Preview")}
                  </.link>
                  <.link
                    class="btn btn-lg"
                    href={"/builder/items/#{@publication.item.id}?copyOpen=true"}
                  >
                    <.icon name="hero-document-duplicate" class="size-5" />
                  </.link>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  :for={tag <- @publication.item.tags}
                  class="badge badge-neutral rounded-full"
                >
                  {tag.name}
                </span>
              </div>
              <div
                :if={
                  @publication.item.description != nil and @publication.item.description != "<br/>"
                }
                class="flex flex-col gap-1"
              >
                <.raw_html
                  id="description"
                  class="line-clamp-5"
                  html={@publication.item.description}
                />
                <.button
                  size="sm"
                  class="w-fit"
                  phx-click={JS.toggle_class("line-clamp-5", to: "#description")}
                >
                  {gettext("Show more")}
                </.button>
              </div>
              <div class="flex flex-row items-center">
                <div class="avatar-group -space-x-4">
                  <div :for={user <- @authors}>
                    <.link navigate={~p"/library-beta/members/#{user.id}"}>
                      <object
                        data={user.thumbnails.small}
                        type="image/webp"
                        class="avatar avatar-placeholder"
                        title={user.name}
                      >
                        <div class="bg-neutral text-neutral-content size-[40px] rounded-full">
                          <span class="text-xs"><.icon name="hero-user" class="size-5" /></span>
                        </div>
                      </object>
                    </.link>
                  </div>
                </div>
                <div class="divider divider-horizontal"></div>
                <div class="flex flex-row items-center gap-4">
                  <div class="flex flex-row items-center gap-1 text-primary">
                    <.icon name="hero-heart" class="size-5" />
                    <span>{@like_count}</span>
                  </div>
                  <div class="flex flex-row items-center gap-1 text-primary">
                    <.icon name="hero-eye" class="size-5" />
                    <span>{@view_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :if={@collection_toc != []} class="flex flex-col gap-4">
            <span class="text-xl font-bold">{gettext("Table of contents")}</span>
            <div class="border border-slate-200 rounded-lg p-2 md:p-4">
              <Library.table_of_contents folders={@collection_toc} />
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <span class="text-xl font-bold">{gettext("Details")}</span>
            <div class="flex flex-col gap-2 border border-slate-200 rounded-lg p-2 md:p-4">
              <Library.detail_bullet label={gettext("Created")}>
                {@publication.item.created_at
                |> Admin.Cldr.Date.to_string!(
                  format: :medium,
                  locale: Gettext.get_locale(AdminWeb.Gettext)
                )}
              </Library.detail_bullet>
              <Library.detail_bullet label={gettext("Updated")}>
                {@publication.item.updated_at
                |> Admin.Cldr.Date.to_string!(
                  format: :medium,
                  locale: Gettext.get_locale(AdminWeb.Gettext)
                )}
              </Library.detail_bullet>
              <Library.detail_bullet label={gettext("Language")}>
                <div class="badge badge-primary">
                  {Admin.Languages.get_label(@publication.item.lang)}
                </div>
              </Library.detail_bullet>
              <Library.detail_bullet label={gettext("License")}>
                {@publication.item.settings |> Map.get("ccLicenseAdaption")}
              </Library.detail_bullet>
            </div>
          </div>
        </div>
      </div>
    </Layouts.landing>
    """
  end
end
