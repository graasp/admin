defmodule Admin.Items.PathUtils do
  def fromUUIDs(uuids) do
    uuids |> Enum.map(&String.replace(&1, "-", "_")) |> Enum.join(".")
  end
end
