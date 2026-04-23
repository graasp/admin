defmodule Admin.H5PItems do
  @moduledoc """
  Handles Managing H5p items.
  """
  alias Admin.S3

  require Logger

  defp h5p_bucket, do: Application.get_env(:admin, :h5p_bucket, "h5p-items")

  @spec integrity_check() :: %{valid: [String.t()], invalid: [String.t()]}
  def integrity_check do
    S3.list_folders(h5p_bucket(), "h5p-content/")
    |> Enum.reduce(%{valid: [], invalid: []}, fn key, acc ->
      Logger.debug("Checking #{key}")
      item = Admin.Items.get_by_h5p_content_id(key)

      case item do
        nil ->
          Logger.debug("H5P with contentId '#{key}' is leftover")
          acc |> Map.update!(:invalid, &(&1 ++ [key]))

        _ ->
          Logger.debug("Found a matching item for h5p with contentId: '#{key}'")
          acc |> Map.update!(:valid, &(&1 ++ [key]))
      end
    end)
  end

  def remove_inconsistent do
    integrity_check()
    |> Map.get(:invalid)
    |> Enum.each(&delete_with_content_id/1)
  end

  def delete(item) do
    content_id = item.extra |> get_in(["h5p", "contentId"])
    delete_with_content_id(content_id)
  end

  defp delete_with_content_id(content_id) do
    key = "h5p-content/#{content_id}"

    if String.length(key) >= 1024 do
      Logger.warning("ContentId '#{key}' is too long, skipping deletion")
    else
      S3.delete_with_prefix(h5p_bucket(), key)
    end
  end
end
