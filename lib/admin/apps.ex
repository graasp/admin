defmodule Admin.Apps do
  @moduledoc """
  The Apps context.
  """

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.Apps.AppInstance
  alias Admin.Apps.Publisher

  @doc """
  Subscribes to scoped notifications about any app_instance changes.

  The broadcasted messages match the pattern:

    * {:created, %AppInstance{}}
    * {:updated, %AppInstance{}}
    * {:deleted, %AppInstance{}}

  """
  def subscribe_apps do
    Phoenix.PubSub.subscribe(Admin.PubSub, "apps")
  end

  defp broadcast(message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "apps", message)
  end

  @doc """
  Returns the list of apps.

  ## Examples

      iex> list_apps()
      [%AppInstance{}, ...]

  """
  def list_apps_by_publisher do
    Publisher
    # order by lowercase name using a fragment and dynamic names
    |> order_by([p], fragment("lower(?)", p.name))
    |> preload(:apps)
    |> Repo.all()
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
  def get_app_instance!(%Publisher{} = publisher, id) do
    Repo.get_by!(AppInstance, id: id, publisher_id: publisher.id)
  end

  def get_app_instance!(id) do
    Repo.get!(AppInstance, id) |> Repo.preload([:publisher])
  end

  @doc """
  Creates a app_instance.

  ## Examples

      iex> create_app_instance(%{field: value})
      {:ok, %AppInstance{}}

      iex> create_app_instance(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_instance(%Publisher{} = publisher, attrs) do
    with {:ok, app_instance = %AppInstance{}} <-
           %AppInstance{}
           |> AppInstance.changeset(publisher, attrs)
           |> Repo.insert() do
      broadcast({:created, app_instance})
      {:ok, app_instance}
    end
  end

  @doc """
  Updates a app_instance.

  ## Examples

      iex> update_app_instance(app_instance, %{field: new_value})
      {:ok, %AppInstance{}}

      iex> update_app_instance(app_instance, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_instance(%AppInstance{} = app_instance, attrs) do
    with {:ok, app_instance = %AppInstance{}} <-
           app_instance
           |> AppInstance.update_changeset(attrs)
           |> Repo.update() do
      broadcast({:updated, app_instance})
      {:ok, app_instance}
    end
  end

  @doc """
  Deletes a app_instance.

  ## Examples

      iex> delete_app_instance(app_instance)
      {:ok, %AppInstance{}}

      iex> delete_app_instance(app_instance)
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

      iex> change_app_instance(app_instance)
      %Ecto.Changeset{data: %AppInstance{}}

  """
  def change_app_instance(%AppInstance{} = app_instance, attrs \\ %{}) do
    AppInstance.update_changeset(app_instance, attrs)
  end

  alias Admin.Apps.Publisher

  @doc """
  Subscribes to scoped notifications about any publisher changes.

  The broadcasted messages match the pattern:

    * {:created, %Publisher{}}
    * {:updated, %Publisher{}}
    * {:deleted, %Publisher{}}

  """
  def subscribe_publishers do
    Phoenix.PubSub.subscribe(Admin.PubSub, "publishers")
  end

  @doc """
  Returns the list of publishers.

  ## Examples

      iex> list_publishers(scope)
      [%Publisher{}, ...]

  """
  def list_publishers do
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

      iex> create_publisher(%{field: value})
      {:ok, %Publisher{}}

      iex> create_publisher(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_publisher(attrs) do
    with {:ok, publisher = %Publisher{}} <-
           %Publisher{}
           |> Publisher.changeset(attrs)
           |> Repo.insert() do
      broadcast({:created, publisher})
      {:ok, publisher}
    end
  end

  def publisher_exists?(id) do
    Repo.exists?(from publisher in Publisher, where: publisher.id == ^id)
  end

  def get_compatible_publishers(origin) do
    from(publisher in Publisher, where: fragment("? = ANY(?)", ^origin, publisher.origins))
    |> Repo.all()
  end

  @doc """
  Updates a publisher.

  ## Examples

      iex> update_publisher(publisher, %{field: new_value})
      {:ok, %Publisher{}}

      iex> update_publisher(publisher, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_publisher(%Publisher{} = publisher, attrs) do
    with {:ok, publisher = %Publisher{}} <-
           publisher
           |> Publisher.changeset(attrs)
           |> Repo.update() do
      broadcast({:updated, publisher})
      {:ok, publisher}
    end
  end

  @doc """
  Deletes a publisher.

  ## Examples

      iex> delete_publisher(publisher)
      {:ok, %Publisher{}}

      iex> delete_publisher(publisher)
      {:error, %Ecto.Changeset{}}

  """
  def delete_publisher(%Publisher{} = publisher) do
    with {:ok, publisher = %Publisher{}} <-
           Repo.delete(publisher) do
      broadcast({:deleted, publisher})
      {:ok, publisher}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking publisher changes.

  ## Examples

      iex> change_publisher(publisher)
      %Ecto.Changeset{data: %Publisher{}}

  """
  def change_publisher(%Publisher{} = publisher, attrs \\ %{}) do
    Publisher.changeset(publisher, attrs)
  end

  def with_publisher(%AppInstance{} = app_instance) do
    Repo.preload(app_instance, :publisher)
  end
end
