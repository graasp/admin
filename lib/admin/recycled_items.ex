defmodule Admin.RecycledItems do
  @moduledoc """
  This module deals with recycled items.
  """
  import Ecto.Query, warn: false
  alias Admin.RecycledItems.RecycledItemData
  alias Admin.Repo

  @doc """
  Returns a list of expired recycled items.

  An item is considered to be expired if it has been in the recycle bin for more than 3 months.
  We query maximum `limit` items at a time. They are taken by order of oldest first.
  """
  def get_expired(opts \\ []) do
    limit = Keyword.get(opts, :limit, 100)

    from(rid in RecycledItemData,
      select: rid.item_path,
      where: fragment("? < NOW() - INTERVAL '3 months'", rid.created_at),
      order_by: [asc: rid.created_at],
      limit: ^limit
    )
    |> Repo.all()
  end
end
