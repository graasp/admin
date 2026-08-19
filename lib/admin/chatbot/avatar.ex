defmodule Admin.Chatbot.Avatar do
  @moduledoc """
  Stores the chatbot's avatar image as the `"chatbot-avatar"` app_setting's
  file, via `Admin.Apps.AppSettingFile`.

  The S3 key is persisted in the `"chatbot-avatar"` app_setting
  (`data["avatarPath"]`, see `AdminWeb.Chatbot.PlayerLive`) — that setting is
  the source of truth for "is an avatar configured", not S3 itself.
  """

  alias Admin.Apps.AppSettingFile

  @doc """
  Uploads a local file (e.g. a LiveView upload's consumed temp path) as the
  item's chatbot avatar, keyed by the `"chatbot-avatar"` app_setting's id.
  Returns the S3 key to persist on the app_setting.
  """
  @spec upload(item_id :: String.t(), setting_id :: String.t(), file_path :: String.t()) ::
          String.t()
  def upload(item_id, setting_id, file_path),
    do: AppSettingFile.upload(item_id, setting_id, file_path)

  @doc "Deletes the avatar object for an item's `\"chatbot-avatar\"` app_setting, if any."
  @spec delete(item_id :: String.t(), setting_id :: String.t()) :: :ok
  def delete(item_id, setting_id), do: AppSettingFile.delete(item_id, setting_id)

  @doc "Signed URL to display the avatar image, cached the same way item thumbnails are."
  @spec url(path :: String.t()) :: String.t()
  def url(path), do: AppSettingFile.url(path)
end
