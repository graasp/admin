defmodule Admin.Items do
  @moduledoc """
  The Items context.
  """

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.Accounts.Scope
  alias Admin.Items.Item

  @doc """
  Subscribes to scoped notifications about any item changes.

  The broadcasted messages match the pattern:

    * {:created, %Item{}}
    * {:updated, %Item{}}
    * {:deleted, %Item{}}

  """
  def subscribe_item do
    Phoenix.PubSub.subscribe(Admin.PubSub, "user:item")
  end

  defp broadcast(message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "user:item", message)
  end

  @doc """
  Returns the list of item.

  ## Examples

      iex> list_item(scope)
      [%Item{}, ...]

  """
  def list_item(%Scope{} = _scope) do
    Repo.all(Item)
  end

  @doc """
  Gets a single item.

  Raises `Ecto.NoResultsError` if the Item does not exist.

  ## Examples

      iex> get_item!(scope, 123)
      %Item{}

      iex> get_item!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_item!(%Scope{} = _scope, id) do
    Repo.get!(Item, id)
  end

  @doc """
  Creates a item.

  ## Examples

      iex> create_item(scope, %{field: value})
      {:ok, %Item{}}

      iex> create_item(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_item(%Scope{} = _scope, attrs) do
    with {:ok, item = %Item{}} <-
           %Item{}
           |> Item.changeset(attrs)
           |> Repo.insert() do
      broadcast({:created, item})
      {:ok, item}
    end
  end

  @doc """
  Updates a item.

  ## Examples

      iex> update_item(scope, item, %{field: new_value})
      {:ok, %Item{}}

      iex> update_item(scope, item, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_item(%Scope{} = _scope, %Item{} = item, attrs) do
    with {:ok, item = %Item{}} <-
           item
           |> Item.changeset(attrs)
           |> Repo.update() do
      broadcast({:updated, item})
      {:ok, item}
    end
  end

  @doc """
  Deletes a item.

  ## Examples

      iex> delete_item(scope, item)
      {:ok, %Item{}}

      iex> delete_item(scope, item)
      {:error, %Ecto.Changeset{}}

  """
  def delete_item(%Scope{} = _scope, %Item{} = item) do
    with {:ok, item = %Item{}} <-
           Repo.delete(item) do
      broadcast({:deleted, item})
      {:ok, item}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking item changes.

  ## Examples

      iex> change_item(scope, item)
      %Ecto.Changeset{data: %Item{}}

  """
  def change_item(%Scope{} = _scope, %Item{} = item, attrs \\ %{}) do
    Item.changeset(item, attrs)
  end
end
