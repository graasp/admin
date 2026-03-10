defmodule Admin.RecycledItems do
  @moduledoc """
  This module deals with recycled items.
  """
  import Ecto.Query, warn: false
  alias Admin.RecycledItems.RecycledItemData
  alias Admin.Repo

  def get(limit) do
    from(rid in RecycledItemData,
      select: rid.item_path,
      limit: ^limit
    )
    |> Repo.all()
  end
end
