defmodule Admin.Items.PathUtils do
  @moduledoc """
  This module provides utilities for working with UUIDs when used in paths.
  """

  def from_uuids(uuids) do
    uuids |> Enum.map_join(".", &String.replace(&1, "-", "_"))
  end

  def to_uuids(path) when is_binary(path) do
    path |> String.split(".") |> Enum.map(&String.replace(&1, "_", "-"))
  end

  def to_ltree(ids) when is_list(ids) do
    path_comp = ids |> Enum.map(&String.replace(&1, "-", "_"))
    %EctoLtree.LabelTree{labels: path_comp}
  end

  def to_string(%EctoLtree.LabelTree{} = path) do
    path.labels |> Enum.join(".")
  end
end
