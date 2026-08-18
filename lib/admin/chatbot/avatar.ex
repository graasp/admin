defmodule Admin.Chatbot.Avatar do
  @moduledoc """
  Stores the chatbot's avatar image in S3, mirroring `Admin.ItemFiles`'s
  `"files/item_id"` key convention (same `file_items_bucket`), but under
  a distinct `"apps/"` prefix so it can't collide with an actual item file.

  The S3 key is persisted in the `"chatbot-avatar"` app_setting
  (`data["avatarPath"]`, see `AdminWeb.Chatbot.PlayerLive`) — that setting is
  the source of truth for "is an avatar configured", not S3 itself.
  """

  alias Admin.S3

  @ttl 3600

  def bucket, do: Application.get_env(:admin, :file_items_bucket, "file-items")

  def key(item_id), do: "apps/#{item_id}/chatbot-avatar"

  @doc """
  Uploads a local file (e.g. a LiveView upload's consumed temp path) as the
  item's chatbot avatar. Returns the S3 key to persist on the app_setting.
  """
  @spec upload(item_id :: String.t(), file_path :: String.t()) :: String.t()
  def upload(item_id, file_path) do
    key = key(item_id)
    S3.upload(bucket(), key, file_path)
    key
  end

  @doc "Deletes the avatar object for an item, if any."
  @spec delete(item_id :: String.t()) :: :ok
  def delete(item_id) do
    S3.delete_object(bucket(), key(item_id))
    :ok
  end

  @doc "Signed URL to display the avatar image, cached the same way item thumbnails are."
  @spec url(path :: String.t()) :: String.t()
  def url(path) do
    {:ok, url} =
      Admin.SignedUrlCache.get_or_put(path, @ttl, fn ->
        S3.get_object_url(bucket(), path, expires_in: @ttl)
      end)

    url
  end
end
