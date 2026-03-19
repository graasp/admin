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
      where: rid.created_at <= date_add(^Date.utc_today(), -90, "day"),
      order_by: [asc: rid.created_at],
      limit: ^limit
    )
    |> Repo.all()
  end

  @doc """
  Returns statistics about recycled items.
  """
  def get_stats do
    total = Repo.aggregate(RecycledItemData, :count, :id)

    scheduled =
      Repo.aggregate(
        from(rid in RecycledItemData,
          where: rid.created_at <= date_add(^Date.utc_today(), -90, "day")
        ),
        :count,
        :id
      )

    pending =
      Repo.aggregate(
        from(rid in RecycledItemData,
          where: rid.created_at > date_add(^Date.utc_today(), -90, "day")
        ),
        :count,
        :id
      )

    %{total: total, scheduled: scheduled, pending: pending}
  end

  def trash(%{item_path: _item_path, creator_id: _creator_id} = attrs) do
    RecycledItemData.changeset(%RecycledItemData{}, attrs)
    |> Repo.insert!()
  end
end
