defmodule Admin.TrashCleanupWorker do
  @moduledoc """
  This worker cleans up the trash by deleting items that have not been restored 3 months.
  """
  use Oban.Worker, queue: :scheduled

  require Logger

  def perform(_args) do
    # fetch the 20k oldest trash items
    trash_item_paths = Admin.RecycledItems.get(limit: 20_000)

    for trash_item_path <- trash_item_paths do
      # get the descendants of the trash item
      descendants = Admin.Items.get_descendants(trash_item_path)

      if Enum.any?(descendants, fn d -> d.type == "etherpad" end) do
        Logger.warning(
          "Skipping trash item because it contains an etherpad descendant: #{trash_item_path}"
        )
      else
        process_entry(descendants)

        # delete items themselves
        Admin.Items.delete(trash_item_path)
      end
    end

    # send an email with the cleanup report containing
    # - the pie chart of the types of items
    # - the creation date of the olderst item and the creation date of the newest item
    # - the number of creators that got item deleted
  end

  defp process_entry(descendants) do
    # remove the associated s3 files
    files =
      descendants
      |> Enum.filter(&(&1.type == "file"))

    files_data =
      files
      |> Enum.map(fn file ->
        path = file.extra |> get_in(["file", "path"])
        %{id: file.id, path: path}
      end)

    # delete file and thumbnails
    Admin.ItemFiles.delete(files_data)

    # remove associated h5p files in s3
    h5p_files =
      descendants
      |> Enum.filter(&(&1.type == "h5p"))

    for h5p_item <- h5p_files do
      Admin.H5PItems.delete(h5p_item)
    end

    # notify etherpad that the pad needs to be deleted
    #
    #
  end
end
