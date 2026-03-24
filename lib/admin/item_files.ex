defmodule Admin.ItemFiles do
  @moduledoc """
  Handles items files operations.
  """

  alias Admin.Items.Item
  alias Admin.ItemThumbnails
  alias Admin.S3

  def bucket, do: Application.get_env(:admin, :file_items_bucket, "file-items")

  @doc """
  Takes a list of files to be deleted.
  Deletes the files and associated thumbnails from the bucket.
  """
  @spec delete(list(%{id: binary(), path: binary()})) :: :ok
  def delete(files_data) when is_list(files_data) do
    file_paths =
      files_data
      |> Enum.map(& &1.path)

    {:ok, _} = S3.delete_objects(bucket(), file_paths)
    file_ids = files_data |> Enum.map(& &1.id)
    {:ok, _} = ItemThumbnails.delete_thumbnails(file_ids)
    :ok
  end

  def delete(%Item{} = item) do
    path =
      get_in(item.extra, ["file", "path"]) ||
        get_in(item.extra, ["file", "key"])

    case path do
      nil ->
        # try deleting thumbnails by item id
        {:ok, _} = ItemThumbnails.delete_thumbnails(item.id)

      _ ->
        delete([%{id: item.id, path: path}])
    end
  end

  def upload(%{path: file_path, mimetype: _mimetype} = file_attrs, item_id)
      when is_binary(item_id) do
    # create thumbnails
    :ok = ItemThumbnails.create_thumbnail(file_attrs, item_id)
    # upload file
    key = "files/#{item_id}"
    S3.upload(bucket(), key, file_path)
    key
  end
end
