defmodule Admin.TrashCleanupWorker do
  @moduledoc """
  This worker cleans up the trash by deleting items that have not been restored 3 months.
  """
  use Oban.Worker, queue: :trash_schedule

  require Logger

  def perform(_args) do
    # fetch the 20k oldest trash items
    Logger.info("Fetching expired trash items...")
    trash_item_paths = Admin.RecycledItems.get_expired(limit: 20_000)

    # rewrite this to use a reduce that allows to accumulate the report
    result =
      Enum.reduce(trash_item_paths, %{success: 0, skipped: 0}, fn trash_item_path, acc ->
        # get the descendants of the trash item
        descendants = Admin.Items.get_descendants(trash_item_path)

        if Enum.any?(descendants, fn d -> d.type == "etherpad" end) do
          Logger.warning(
            "Skipping trash item because it contains an etherpad descendant: #{trash_item_path}"
          )

          acc |> Map.update!(:skipped, &(&1 + 1))
        else
          process_entry(descendants)

          # delete items themselves
          Admin.Items.delete(trash_item_path)
          acc |> Map.update!(:success, &(&1 + 1))
        end
      end)

    # send an email with the cleanup report containing
    # - the pie chart of the types of items
    # - the creation date of the olderst item and the creation date of the newest item
    # - the number of creators that got item deleted
    #
    report = %{
      total_fetched: length(trash_item_paths),
      success: result.success,
      skipped: result.skipped
    }

    Logger.info("Cleanup report: #{inspect(report)}")

    {:ok, report}
  end

  defp process_entry(descendants) do
    # remove the associated s3 files
    files =
      descendants
      |> Enum.filter(&(&1.type == "file"))

    files_data =
      files
      |> Enum.map(fn %{extra: extra, id: id} ->
        path = extra |> get_in(["file", "path"])
        key = extra |> get_in(["file", "key"])
        %{id: id, path: path || key}
      end)
      |> Enum.reject(fn %{path: path} -> path == nil end)

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
