defmodule Admin.Apps do
  @moduledoc """
  The Apps context.
  """

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.Apps.AppInstance
  alias Admin.Accounts.Scope

  @doc """
  Subscribes to scoped notifications about any app_instance changes.

  The broadcasted messages match the pattern:

    * {:created, %AppInstance{}}
    * {:updated, %AppInstance{}}
    * {:deleted, %AppInstance{}}

  """
  def subscribe_apps() do
    Phoenix.PubSub.subscribe(Admin.PubSub, "apps")
  end

  defp broadcast(message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "apps", message)
  end

  @doc """
  Returns the list of apps.

  ## Examples

      iex> list_apps(scope)
      [%AppInstance{}, ...]

  """
  def list_apps(%Scope{} = scope) do
    Repo.all_by(AppInstance, user_id: scope.user.id)
  end

  @doc """
  Gets a single app_instance.

  Raises `Ecto.NoResultsError` if the App instance does not exist.

  ## Examples

      iex> get_app_instance!(scope, 123)
      %AppInstance{}

      iex> get_app_instance!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_app_instance!(%Scope{} = scope, id) do
    Repo.get_by!(AppInstance, id: id, user_id: scope.user.id)
  end

  @doc """
  Creates a app_instance.

  ## Examples

      iex> create_app_instance(scope, %{field: value})
      {:ok, %AppInstance{}}

      iex> create_app_instance(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_instance(%Scope{} = scope, attrs) do
    with {:ok, app_instance = %AppInstance{}} <-
           %AppInstance{}
           |> AppInstance.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast({:created, app_instance})
      {:ok, app_instance}
    end
  end

  @doc """
  Updates a app_instance.

  ## Examples

      iex> update_app_instance(scope, app_instance, %{field: new_value})
      {:ok, %AppInstance{}}

      iex> update_app_instance(scope, app_instance, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_instance(%Scope{} = scope, %AppInstance{} = app_instance, attrs) do
    true = app_instance.user_id == scope.user.id

    with {:ok, app_instance = %AppInstance{}} <-
           app_instance
           |> AppInstance.changeset(attrs, scope)
           |> Repo.update() do
      broadcast({:updated, app_instance})
      {:ok, app_instance}
    end
  end

  @doc """
  Deletes a app_instance.

  ## Examples

      iex> delete_app_instance(scope, app_instance)
      {:ok, %AppInstance{}}

      iex> delete_app_instance(scope, app_instance)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_instance(%AppInstance{} = app_instance) do
    with {:ok, app_instance = %AppInstance{}} <-
           Repo.delete(app_instance) do
      broadcast({:deleted, app_instance})
      {:ok, app_instance}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_instance changes.

  ## Examples

      iex> change_app_instance(scope, app_instance)
      %Ecto.Changeset{data: %AppInstance{}}

  """
  def change_app_instance(%AppInstance{} = app_instance, attrs \\ %{}) do
    AppInstance.changeset(app_instance, attrs)
  end

  alias Admin.Apps.Publisher
  alias Admin.Accounts.Scope

  @doc """
  Subscribes to scoped notifications about any publisher changes.

  The broadcasted messages match the pattern:

    * {:created, %Publisher{}}
    * {:updated, %Publisher{}}
    * {:deleted, %Publisher{}}

  """
  def subscribe_publishers(%Scope{} = scope) do
    key = scope.user.id

    Phoenix.PubSub.subscribe(Admin.PubSub, "user:#{key}:publishers")
  end

  @doc """
  Returns the list of publishers.

  ## Examples

      iex> list_publishers(scope)
      [%Publisher{}, ...]

  """
  def list_publishers() do
    Repo.all(Publisher)
  end

  @doc """
  Gets a single publisher.

  Raises `Ecto.NoResultsError` if the Publisher does not exist.

  ## Examples

      iex> get_publisher!(123)
      %Publisher{}

      iex> get_publisher!(456)
      ** (Ecto.NoResultsError)

  """
  def get_publisher!(id) do
    Repo.get!(Publisher, id)
  end

  @doc """
  Creates a publisher.

  ## Examples

      iex> create_publisher(scope, %{field: value})
      {:ok, %Publisher{}}

      iex> create_publisher(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_publisher(%Scope{} = scope, attrs) do
    with {:ok, publisher = %Publisher{}} <-
           %Publisher{}
           |> Publisher.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast({:created, publisher})
      {:ok, publisher}
    end
  end

  @doc """
  Updates a publisher.

  ## Examples

      iex> update_publisher(scope, publisher, %{field: new_value})
      {:ok, %Publisher{}}

      iex> update_publisher(scope, publisher, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_publisher(%Scope{} = scope, %Publisher{} = publisher, attrs) do
    true = publisher.user_id == scope.user.id

    with {:ok, publisher = %Publisher{}} <-
           publisher
           |> Publisher.changeset(attrs, scope)
           |> Repo.update() do
      broadcast({:updated, publisher})
      {:ok, publisher}
    end
  end

  @doc """
  Deletes a publisher.

  ## Examples

      iex> delete_publisher(scope, publisher)
      {:ok, %Publisher{}}

      iex> delete_publisher(scope, publisher)
      {:error, %Ecto.Changeset{}}

  """
  def delete_publisher(%Scope{} = scope, %Publisher{} = publisher) do
    with {:ok, publisher = %Publisher{}} <-
           Repo.delete(publisher) do
      broadcast({:deleted, publisher})
      {:ok, publisher}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking publisher changes.

  ## Examples

      iex> change_publisher(scope, publisher)
      %Ecto.Changeset{data: %Publisher{}}

  """
  def change_publisher(%Scope{} = scope, %Publisher{} = publisher, attrs \\ %{}) do
    Publisher.changeset(publisher, attrs, scope)
  end
end
