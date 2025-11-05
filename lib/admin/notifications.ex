defmodule Admin.Notifications do
  @moduledoc """
  The Notifications context.
  """

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.Accounts.Scope
  alias Admin.Notifications.Log
  alias Admin.Notifications.Notification

  # Notifications
  def new_notification, do: %Notification{}

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking notification changes.

  ## Examples

      iex> change_notification(scope, notification)
      %Ecto.Changeset{data: %Notification{}}

  """
  def change_notification(%Scope{} = scope, %Notification{} = notification, attrs \\ %{}) do
    Notification.changeset(notification, attrs, scope)
  end

  def update_recipients(%Ecto.Changeset{} = notification, %{recipients: _} = attrs) do
    Notification.update_recipients(notification, attrs)
  end

  def create_notification(%Scope{} = scope, attrs) do
    with {:ok, notification = %Notification{}} <-
           change_notification(scope, %Notification{}, attrs)
           |> Repo.insert() do
      broadcast_notification(scope, {:created, notification})
      {:ok, notification |> Repo.preload([:logs])}
    end
  end

  @doc """
  Subscribes to scoped notifications about any notification changes.

  The broadcasted messages match the pattern:

    * {:created, %Notification{}}
    * {:updated, %Notification{}}
    * {:deleted, %Notification{}}

  """
  def subscribe_notifications(%Scope{} = _scope) do
    Phoenix.PubSub.subscribe(Admin.PubSub, "notifications")
  end

  defp broadcast_notification(%Scope{} = _scope, message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "notifications", message)
  end

  @doc """
  Returns the list of notifications.

  ## Examples

      iex> list_notifications(scope)
      [%Notification{}, ...]

  """
  def list_notifications(%Scope{} = _scope) do
    Repo.all(Notification) |> Repo.preload([:logs])
  end

  @doc """
  Gets a single notification.

  Raises `Ecto.NoResultsError` if the Notification does not exist.

  ## Examples

      iex> get_notification!(scope, 123)
      %Notification{}

      iex> get_notification!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_notification!(%Scope{} = _scope, id) do
    Repo.get_by!(Notification, id: id) |> Repo.preload(:logs)
  end

  @doc """
  Gets a single notification.

  ## Examples

      iex> get_notification(scope, 123)
      {:ok, %Notification{}}

      iex> get_notification(scope, 456)
      {:error, :not_found}

  """
  def get_notification(%Scope{} = _scope, id) do
    case Repo.get_by(Notification, id: id) |> Repo.preload(:logs) do
      %Notification{} = notification -> {:ok, notification}
      nil -> {:error, :notification_not_found}
    end
  end

  @doc """
  Updates a service_message.

  ## Examples

      iex> update_service_message(scope, service_message, %{field: new_value})
      {:ok, %ServiceMessage{}}

      iex> update_service_message(scope, service_message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_notification(%Scope{} = scope, %Notification{} = notification, attrs) do
    with {:ok, notification = %Notification{}} <-
           notification
           |> Notification.changeset(attrs, scope)
           |> Repo.update() do
      broadcast_notification(scope, {:updated, notification})
      {:ok, notification}
    end
  end

  @doc """
  Deletes a notification.

  ## Examples

      iex> delete_notification(scope, notification)
      {:ok, %Notification{}}

      iex> delete_notification(scope, notification)
      {:error, %Ecto.Changeset{}}

  """
  def delete_notification(%Scope{} = scope, %Notification{} = notification) do
    with {:ok, notification = %Notification{}} <-
           Repo.delete(notification) do
      broadcast_notification(scope, {:deleted, notification})
      {:ok, notification}
    end
  end

  def save_log(%Scope{} = scope, log, %Notification{id: notification_id} = notification) do
    %Log{}
    |> Log.changeset(log, notification_id)
    |> Repo.insert()

    broadcast_notification(scope, {:updated, notification})
  end
end
