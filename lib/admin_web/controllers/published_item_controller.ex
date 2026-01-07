defmodule AdminWeb.PublishedItemController do
  use AdminWeb, :controller
  require Logger

  require IEx
  alias Admin.Publications
  alias Admin.Publications.PublishedItem
  alias AdminWeb.Forms.PublishedItemSearchForm

  def index(conn, _params) do
    published_items = Publications.list_published_items(50)

    render(conn, :index,
      page_title: "Published Items",
      published_items: published_items,
      changeset: PublishedItemSearchForm.changeset(%PublishedItemSearchForm{}, %{})
    )
  end

  def new(conn, _params) do
    changeset =
      Publications.change_published_item(conn.assigns.current_scope, %PublishedItem{
        creator_id: conn.assigns.current_scope.user.id
      })

    render(conn, :new, changeset: changeset)
  end

  def create(conn, %{"published_item" => published_item_params}) do
    case Publications.create_published_item(conn.assigns.current_scope, published_item_params) do
      {:ok, published_item} ->
        conn
        |> put_flash(:info, "Published item created successfully.")
        |> redirect(to: ~p"/admin/published_items/#{published_item}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :new, changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    published_item = Publications.get_published_item!(id)
    render(conn, :show, published_item: published_item)
  end

  def search(conn, %{"published_item_search_form" => params}) do
    changeset = PublishedItemSearchForm.changeset(%PublishedItemSearchForm{}, params)

    if changeset.valid? do
      published_item_id = Ecto.Changeset.get_field(changeset, :published_item_id)
      redirect(conn, to: ~p"/admin/published_items/#{published_item_id}")
    else
      published_items =
        Publications.list_published_items()

      render(conn, :index, published_items: published_items, changeset: changeset)
    end
  end

  def featured(conn, _params) do
    featured_published_items =
      Publications.list_featured_published_items()

    render(conn, :featured, published_items: featured_published_items)
  end
end
