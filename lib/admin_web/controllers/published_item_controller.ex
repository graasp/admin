defmodule AdminWeb.PublishedItemController do
  use AdminWeb, :controller
  require Logger

  alias AdminWeb.Forms.PublicationItemForm
  alias Admin.Publications
  alias Admin.Publications.PublishedItem

  def index(conn, _params) do
    published_items = Publications.list_published_items(conn.assigns.current_scope)

    render(conn, :index,
      published_items: published_items,
      changeset: PublicationItemForm.changeset(%PublicationItemForm{}, %{})
    )
  end

  def new(conn, _params) do
    changeset =
      Publications.change_published_item(conn.assigns.current_scope, %PublishedItem{
        user_id: conn.assigns.current_scope.user.id
      })

    render(conn, :new, changeset: changeset)
  end

  def create(conn, %{"published_item" => published_item_params}) do
    case Publications.create_published_item(conn.assigns.current_scope, published_item_params) do
      {:ok, published_item} ->
        conn
        |> put_flash(:info, "Published item created successfully.")
        |> redirect(to: ~p"/published_items/#{published_item}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :new, changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    published_item = Publications.get_published_item!(conn.assigns.current_scope, id)
    render(conn, :show, published_item: published_item)
  end

  def edit(conn, %{"id" => id}) do
    published_item = Publications.get_published_item!(conn.assigns.current_scope, id)
    changeset = Publications.change_published_item(conn.assigns.current_scope, published_item)
    render(conn, :edit, published_item: published_item, changeset: changeset)
  end

  def update(conn, %{"id" => id, "published_item" => published_item_params}) do
    published_item = Publications.get_published_item!(conn.assigns.current_scope, id)

    case Publications.update_published_item(
           conn.assigns.current_scope,
           published_item,
           published_item_params
         ) do
      {:ok, published_item} ->
        conn
        |> put_flash(:info, "Published item updated successfully.")
        |> redirect(to: ~p"/published_items/#{published_item}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :edit, published_item: published_item, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    published_item = Publications.get_published_item!(conn.assigns.current_scope, id)

    {:ok, _published_item} =
      Publications.delete_published_item(conn.assigns.current_scope, published_item)

    conn
    |> put_flash(:info, "Published item deleted successfully.")
    |> redirect(to: ~p"/published_items")
  end

  def search(conn, %{"publication_item_form" => params}) do
    changeset = PublicationItemForm.changeset(%PublicationItemForm{}, params)

    if changeset.valid? do
      item_id = changeset.changes.item_id

      case Publications.exists?(item_id) do
        false ->
          changeset =
            Ecto.Changeset.add_error(
              changeset,
              :item_id,
              "Publication with id '#{item_id}' could not be found"
            )

          Logger.info("updated changeset: #{inspect(changeset)}")

          publication_items =
            Publications.list_published_items(conn.assigns.current_scope)

          render(conn, :index, published_items: publication_items, changeset: changeset)

        true ->
          redirect(conn, to: ~p"/published_items/#{item_id}")
      end
    end
  end
end
