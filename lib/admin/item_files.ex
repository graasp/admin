defmodule Admin.ItemFiles do
  @moduledoc """
  Handles items files operations.
  """
  alias Admin.S3

  defp file_bucket, do: Application.get_env(:admin, :file_items_bucket, "file_items")

  def delete(files_data) do
    file_paths = files_data |> Enum.map(& &1.path)
    {:ok, _} = S3.delete_objects(file_bucket(), file_paths)
    file_ids = files_data |> Enum.map(& &1.id)
    {:ok, _} = Admin.ItemThumbnails.delete_thumbnails(file_ids)
    :ok
  end
end
