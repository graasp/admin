defmodule Admin.Apps.AppSettingFile do
  @moduledoc """
  Stores a file for an app_setting in S3, mirroring `Admin.ItemFiles`'s
  `"files/item_id"` key convention (same `file_items_bucket`), but under
  a distinct `"apps/"` prefix so it can't collide with an actual item file.

  The S3 key is namespaced by `item_id` and the app_setting's id, so
  different app_settings on the same item can each store their own file
  without colliding. Persisting the key on the app_setting itself (and
  treating that as the source of truth for "is a file configured") is left
  to the caller.
  """

  alias Admin.S3

  @ttl 3600

  def bucket, do: Application.get_env(:admin, :file_items_bucket, "file-items")

  def key(item_id, setting_id), do: "apps/app-setting/#{item_id}/#{setting_id}"

  @doc """
  Uploads a local file (e.g. a LiveView upload's consumed temp path) as the
  file for the item's `setting_id` app_setting. Returns the S3 key to
  persist on the app_setting.
  """
  @spec upload(item_id :: String.t(), setting_id :: String.t(), file_path :: String.t()) ::
          String.t()
  def upload(item_id, setting_id, file_path) do
    key = key(item_id, setting_id)
    S3.upload(bucket(), key, file_path)
    key
  end

  @doc "Deletes the file for the item's `setting_id` app_setting, if any."
  @spec delete(item_id :: String.t(), setting_id :: String.t()) :: :ok
  def delete(item_id, setting_id) do
    S3.delete_object(bucket(), key(item_id, setting_id))
    :ok
  end

  @doc "Signed URL to fetch the file, cached the same way item thumbnails are."
  @spec url(path :: String.t()) :: String.t()
  def url(path) do
    {:ok, url} =
      Admin.SignedUrlCache.get_or_put(path, @ttl, fn ->
        S3.get_object_url(bucket(), path, expires_in: @ttl)
      end)

    url
  end
end
