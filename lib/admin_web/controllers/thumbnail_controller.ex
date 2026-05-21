defmodule AdminWeb.ThumbnailController do
  use AdminWeb, :controller

  def show(conn, %{"item_id" => item_id}) do
    blob = Admin.ItemThumbnails.download_item_thumbnail(item_id)

    conn
    |> put_resp_content_type("image/webp")
    # default to browser caching for 1 day
    |> put_resp_header("cache-control", "public, max-age=86400")
    |> send_resp(200, blob)
  end
end
