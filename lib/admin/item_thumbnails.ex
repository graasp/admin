defmodule Admin.ItemThumbnails do
  @moduledoc """
  Module for getting signed urls for item thumbnails.
  """

  alias Admin.S3

  defp bucket, do: Application.get_env(:admin, :file_items_bucket, "file-items")

  defp thumbnail_paths(item_id),
    do: [
      "thumbnails/#{item_id}/small",
      "thumbnails/#{item_id}/medium",
      "thumbnails/#{item_id}/large",
      "thumbnails/#{item_id}/original"
    ]

  defp thumbnail_sizes, do: %{"small" => 40, "medium" => 256, "large" => 512}

  def get_item_thumbnails(item_id) do
    %{
      small: get_item_thumbnail(item_id, "small"),
      medium: get_item_thumbnail(item_id, "medium"),
      large: get_item_thumbnail(item_id, "large")
    }
  end

  defp get_item_thumbnail(item_id, size) when size in ["small", "medium", "large", "original"] do
    url = S3.get_object_url(bucket(), "thumbnails/#{item_id}/#{size}")
    url
  end

  def delete_thumbnails(item_id) do
    file_paths = thumbnail_paths(item_id)
    S3.delete_objects(bucket(), file_paths)
  end

  def create_thumbnail(%{path: file_path} = _file_attrs, item_id) do
    image = Image.open!(file_path)

    Enum.each(thumbnail_sizes(), fn {size, width} ->
      image
      |> Image.thumbnail!(width)
      |> Image.stream!(suffix: ".webp", buffer_size: 5 * 1024 * 1024)
      |> S3.upload_stream(bucket(), "thumbnails/#{item_id}/#{size}")
    end)
  end
end
