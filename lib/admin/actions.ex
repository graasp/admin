defmodule Admin.Actions do
  @moduledoc """
  The Actions context.
  """

  import Ecto.Query, warn: false

  alias Admin.Actions.Action
  alias Admin.Items.Item
  alias Admin.Repo

  @doc """
  Creates an action.
  """
  def create_action(attrs \\ %{}) do
    %Action{}
    |> Action.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Creates an action only if no action of the same type was recorded for the same
  account and item within the last `debounce_minutes` minutes (default 15).
  Returns `{:ok, :debounced}` when skipped, otherwise the usual `{:ok, action}` / `{:error, changeset}`.
  Skips the debounce check when `account_id` is nil and always records.
  """
  def create_action_debounced(attrs, debounce_minutes \\ 15) do
    account_id = Map.get(attrs, :account_id) || Map.get(attrs, "account_id")

    if is_nil(account_id) do
      create_action(attrs)
    else
      cutoff = DateTime.utc_now() |> DateTime.add(-debounce_minutes * 60, :second)
      type = Map.get(attrs, :type) || Map.get(attrs, "type")
      item_id = Map.get(attrs, :item_id) || Map.get(attrs, "item_id")

      already_recorded =
        from(a in Action,
          where:
            a.type == ^type and
              a.item_id == ^item_id and
              a.account_id == ^account_id and
              a.created_at > ^cutoff
        )
        |> Repo.exists?()

      if already_recorded do
        {:ok, :debounced}
      else
        create_action(attrs)
      end
    end
  end

  @doc """
  Returns all actions of a given type.
  """
  def list_actions_by_type(type) when is_binary(type) do
    from(a in Action,
      where: a.type == ^type,
      order_by: [desc: a.created_at]
    )
    |> Repo.all()
  end

  @doc """
  Returns the count of an action for an item
  """
  def get_count_by_type(item_id, type) do
    Repo.aggregate(
      from(a in Action,
        where: a.type == ^type,
        where: a.item_id == ^item_id
      ),
      :count
    )
  end

  @doc """
  Returns all actions for a specific item.
  """
  def list_actions_for_item(item_id) do
    from(a in Action,
      where: a.item_id == ^item_id,
      order_by: [desc: a.created_at]
    )
    |> Repo.all()
  end

  @doc """
  Returns all actions for an item and all its descendants in the hierarchy.
  Uses ltree path containment to find items in the subtree rooted at item_id.
  """
  def list_actions_for_item_hierarchy(item_id) do
    items_in_hierarchy =
      from(item in Item,
        join: root in Item,
        on: root.id == ^item_id,
        where: fragment("? @> ?", root.path, item.path),
        select: item.id
      )

    from(a in Action,
      where: a.item_id in subquery(items_in_hierarchy),
      order_by: [desc: a.created_at]
    )
    |> Repo.all()
  end
end
