defmodule AdminWeb.ThumbnailController do
  use AdminWeb, :controller

  def show(conn, %{"item_id" => item_id}) do
    url = Admin.ItemThumbnails.get_item_thumbnail(item_id, "large")
    redirect(conn, external: url)
  end
end
