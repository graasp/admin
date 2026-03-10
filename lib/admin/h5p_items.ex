defmodule Admin.H5PItems do
  @moduledoc """
  Handles Managing H5p items.
  """
  alias Admin.S3

  defp h5p_bucket, do: Application.get_env(:admin, :h5p_bucket, "h5p_files")

  def delete(item) do
    content_id = item.extra |> get_in(["h5p", "content_id"])
    {:ok, _} = S3.delete_with_prefix(h5p_bucket(), "h5p-content/#{content_id}/*")
  end
end
