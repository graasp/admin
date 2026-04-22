defmodule Admin.ItemFiles do
  @moduledoc """
  Handles items files operations.
  """
  alias Admin.S3

  require Logger

  defp file_bucket, do: Application.get_env(:admin, :file_items_bucket, "file-items")

  def delete([]), do: :ok

  def delete(files_data) when is_list(files_data) and files_data != [] do
    file_paths = files_data |> Enum.map(& &1.path)
    # key length can not exceed 1024 bytes
    {valid_keys, _invalid_keys} = file_paths |> Enum.split_with(&(String.length(&1) <= 1023))
    {:ok, _} = S3.delete_objects(file_bucket(), valid_keys)

    files_data
    |> Enum.each(fn file ->
      {:ok, _} = Admin.ItemThumbnails.delete_thumbnails(file.id)
    end)

    :ok
  end
end
