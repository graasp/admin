defmodule Admin.Items.PathUtils do
  @moduledoc """
  This module provides utilities for working with UUIDs when used in paths.
  """

  def from_uuids(uuids) do
    uuids |> Enum.map_join(".", &String.replace(&1, "-", "_"))
  end
end
