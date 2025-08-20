defmodule Admin.Publications do
  @moduledoc """
  The Publications context.
  """

  import Ecto.Query, warn: false
  alias Admin.Accounts.UserNotifier
  alias Admin.Publications.RemovalNotice
  alias Admin.Repo
  alias Ecto.Multi

  alias Admin.Publications.PublishedItem
  alias Admin.Accounts.Scope

  @doc """
  Subscribes to scoped notifications about any published_item changes.

  The broadcasted messages match the pattern:

    * {:created, %PublishedItem{}}
    * {:updated, %PublishedItem{}}
    * {:deleted, %PublishedItem{}}

  """
  def subscribe_published_items(%Scope{} = scope) do
    key = scope.user.id

    Phoenix.PubSub.subscribe(Admin.PubSub, "user:#{key}:published_items")
  end

  defp broadcast(%Scope{} = scope, message) do
    key = scope.user.id

    Phoenix.PubSub.broadcast(Admin.PubSub, "user:#{key}:published_items", message)
  end

  @doc """
  Returns the list of published_items.

  ## Examples

      iex> list_published_items()
      [%PublishedItem{}, ...]

  """
  def list_published_items() do
    Repo.all(PublishedItem)
  end

  @doc """
  Returns the list of published items for all users
  """
  def list_published_items(limit) do
    Repo.all(from p in PublishedItem, order_by: [desc: :inserted_at], limit: ^limit)
  end

  @doc """
  Checks if a publicaiton exists for the supplied id
  """
  def exists?(id) do
    Repo.exists?(from(p in PublishedItem, where: p.id == ^id))
  end

  @doc """
  Gets a single published_item.

  Raises `Ecto.NoResultsError` if the Published item does not exist.

  ## Examples

      iex> get_published_item!(scope, 123)
      %PublishedItem{}

      iex> get_published_item!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_published_item!(id) do
    Repo.get!(PublishedItem, id) |> Repo.preload([:creator])
  end

  def get_published_item!(%Scope{} = scope, id) do
    Repo.get_by!(PublishedItem, id: id, creator_id: scope.user.id) |> Repo.preload([:creator])
  end

  @doc """
  Creates a published_item.

  ## Examples

      iex> create_published_item(scope, %{field: value})
      {:ok, %PublishedItem{}}

      iex> create_published_item(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_published_item(%Scope{} = scope, attrs) do
    with {:ok, published_item = %PublishedItem{}} <-
           %PublishedItem{}
           |> PublishedItem.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast(scope, {:created, published_item})
      {:ok, published_item}
    end
  end

  @doc """
  Updates a published_item.

  ## Examples

      iex> update_published_item(scope, published_item, %{field: new_value})
      {:ok, %PublishedItem{}}

      iex> update_published_item(scope, published_item, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_published_item(%Scope{} = scope, %PublishedItem{} = published_item, attrs) do
    true = published_item.creator_id == scope.user.id

    with {:ok, published_item = %PublishedItem{}} <-
           published_item
           |> PublishedItem.changeset(attrs, scope)
           |> Repo.update() do
      broadcast(scope, {:updated, published_item})
      {:ok, published_item}
    end
  end

  @doc """
  Deletes a published_item.

  ## Examples

      iex> delete_published_item(scope, published_item)
      {:ok, %PublishedItem{}}

      iex> delete_published_item(scope, published_item)
      {:error, %Ecto.Changeset{}}

  """
  def delete_published_item(%Scope{} = scope, %PublishedItem{} = published_item) do
    true = published_item.creator_id == scope.user.id

    with {:ok, published_item = %PublishedItem{}} <-
           Repo.delete(published_item) do
      broadcast(scope, {:deleted, published_item})
      {:ok, published_item}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking published_item changes.

  ## Examples

      iex> change_published_item(scope, published_item)
      %Ecto.Changeset{data: %PublishedItem{}}

  """
  def change_published_item(%Scope{} = scope, %PublishedItem{} = published_item, attrs \\ %{}) do
    true = published_item.creator_id == scope.user.id

    PublishedItem.changeset(published_item, attrs, scope)
  end

  @doc """
  Returns an `Ecto.Changeset{}` for tracking removal_notice changes.
  """
  def create_removal_notice(%Scope{} = scope, %PublishedItem{} = published_item, attrs \\ %{}) do
    RemovalNotice.changeset(%RemovalNotice{}, attrs, published_item, scope)
  end

  @doc """
  Removes a publication. Deletes the publication and send a notification email to the user to inform them.
  """
  def remove_publication_with_notice(
        %Scope{} = scope,
        %PublishedItem{} = published_item,
        attrs \\ %{}
      ) do
    removal_notice = create_removal_notice(scope, published_item, attrs)

    multi =
      Multi.new()
      |> Multi.insert(:notice, removal_notice)
      |> Multi.delete(:publication, published_item)
      |> Multi.run(:send_notice, fn _repo, %{notice: notice, publication: published_item} ->
        case UserNotifier.deliver_publication_removal(
               Repo.get(Admin.Accounts.User, published_item.creator_id),
               published_item,
               notice
             ) do
          {:ok, _response} -> {:ok, :sent}
          {:error, reason} -> {:error, reason}
        end
      end)

    Repo.transaction(multi)
  end
end
