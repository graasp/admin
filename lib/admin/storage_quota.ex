defmodule Admin.StorageQuota do
  @moduledoc """
  The StorageQuota context.
  """

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.StorageQuota.Quota
  alias Admin.Accounts.Scope

  @doc """
  Subscribes to scoped notifications about any quota changes.

  The broadcasted messages match the pattern:

    * {:created, %Quota{}}
    * {:updated, %Quota{}}
    * {:deleted, %Quota{}}

  """
  def subscribe_quotas(%Scope{} = scope) do
    key = scope.user.id

    Phoenix.PubSub.subscribe(Admin.PubSub, "user:#{key}:quotas")
  end

  defp broadcast(%Scope{} = scope, message) do
    key = scope.user.id

    Phoenix.PubSub.broadcast(Admin.PubSub, "user:#{key}:quotas", message)
  end

  @doc """
  Returns the list of quotas.

  ## Examples

      iex> list_quotas(scope)
      [%Quota{}, ...]

  """
  def list_quotas(%Scope{} = scope) do
    Repo.all_by(Quota, user_id: scope.user.id)
  end

  @doc """
  Gets a single quota.

  Raises `Ecto.NoResultsError` if the Quota does not exist.

  ## Examples

      iex> get_quota!(scope, 123)
      %Quota{}

      iex> get_quota!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_quota!(%Scope{} = scope, id) do
    Repo.get_by!(Quota, id: id, user_id: scope.user.id)
  end

  @doc """
  Creates a quota.

  ## Examples

      iex> create_quota(scope, %{field: value})
      {:ok, %Quota{}}

      iex> create_quota(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_quota(%Scope{} = scope, attrs) do
    with {:ok, quota = %Quota{}} <-
           %Quota{}
           |> Quota.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast(scope, {:created, quota})
      {:ok, quota}
    end
  end

  @doc """
  Updates a quota.

  ## Examples

      iex> update_quota(scope, quota, %{field: new_value})
      {:ok, %Quota{}}

      iex> update_quota(scope, quota, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_quota(%Scope{} = scope, %Quota{} = quota, attrs) do
    true = quota.user_id == scope.user.id

    with {:ok, quota = %Quota{}} <-
           quota
           |> Quota.changeset(attrs, scope)
           |> Repo.update() do
      broadcast(scope, {:updated, quota})
      {:ok, quota}
    end
  end

  @doc """
  Deletes a quota.

  ## Examples

      iex> delete_quota(scope, quota)
      {:ok, %Quota{}}

      iex> delete_quota(scope, quota)
      {:error, %Ecto.Changeset{}}

  """
  def delete_quota(%Scope{} = scope, %Quota{} = quota) do
    true = quota.user_id == scope.user.id

    with {:ok, quota = %Quota{}} <-
           Repo.delete(quota) do
      broadcast(scope, {:deleted, quota})
      {:ok, quota}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking quota changes.

  ## Examples

      iex> change_quota(scope, quota)
      %Ecto.Changeset{data: %Quota{}}

  """
  def change_quota(%Scope{} = scope, %Quota{} = quota, attrs \\ %{}) do
    true = quota.user_id == scope.user.id

    Quota.changeset(quota, attrs, scope)
  end
end
