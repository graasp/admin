defmodule Admin.Platforms do
  @moduledoc """
  Generate platform URLs.
  """

  defp base_host, do: Application.get_env(:admin, :base_host)

  def get_url(:library, item_id) do
    "https://library.#{base_host()}/collections/#{item_id}"
  end

  def get_url(:player, root_id), do: get_url(:player, root_id, root_id)

  def get_url(:player, root_id, item_id) do
    "https://#{base_host()}/player/#{root_id}/#{item_id}"
  end


end
