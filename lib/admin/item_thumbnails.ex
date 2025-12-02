defmodule Admin.ItemThumbnails do
  @moduledoc """
  Module for getting signed urls for item thumbnails.
  """

  alias Admin.S3

  defp file_bucket, do: Application.get_env(:admin, :file_items_bucket, "file_items")

  def get_item_thumbnails(item_id) do
    %{
      small: get_item_thumbnail(item_id, "small"),
      medium: get_item_thumbnail(item_id, "medium"),
      large: get_item_thumbnail(item_id, "large")
    }
  end

  defp get_item_thumbnail(item_id, size) when size in ["small", "medium", "large", "original"] do
    url = S3.get_object_url(file_bucket(), "thumbnails/#{item_id}/#{size}")
    url
  end
end
