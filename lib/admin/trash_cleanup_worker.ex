defmodule Admin.TrashCleanupWorker do
  use Oban.Worker, queue: :scheduled

  def perform(_args) do
    # fetch the 20k oldest trash items
    #
    # remove the associated s3 files
    #
    # remove associated thumbnails in s3
    #
    # remove associated h5p files in s3
    #
    # notify etherpad that the pad needs to be deleted
    #
    #
    # send an email with the cleanup report containing
    # - the pie chart of the types of items
    # - the creation date of the olderst item and the creation date of the newest item
    # - the number of creators that got item deleted
  end
end
