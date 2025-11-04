defmodule Admin.Notifications do
  @moduledoc """
  The Notifications context.
  """

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.Notifications.Log
  alias Admin.Notifications.Notification
  alias Admin.Accounts.Scope

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

  def create_notification(%Scope{} = scope, attrs) do
    change_notification(scope, %Notification{}, attrs)
    |> Repo.insert()
  end

  @doc """
  Subscribes to scoped notifications about any service_message changes.

  The broadcasted messages match the pattern:

    * {:created, %ServiceMessage{}}
    * {:updated, %ServiceMessage{}}
    * {:deleted, %ServiceMessage{}}

  """
  def subscribe_service_messages(%Scope{} = _scope) do
    Phoenix.PubSub.subscribe(Admin.PubSub, "service_messages")
  end

  defp broadcast_service_message(%Scope{} = _scope, message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "service_messages", message)
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
  Gets a single service_message.

  Raises `Ecto.NoResultsError` if the Service message does not exist.

  ## Examples

      iex> get_service_message!(scope, 123)
      %ServiceMessage{}

      iex> get_service_message!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_service_message!(%Scope{} = _scope, id) do
    Repo.get_by!(Notification, id: id) |> Repo.preload(:message_logs)
  end

  @doc """
  Creates a service_message.

  ## Examples

      iex> create_service_message(scope, %{field: value})
      {:ok, %ServiceMessage{}}

      iex> create_service_message(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_service_message(%Scope{} = scope, attrs) do
    with {:ok, service_message = %Notification{}} <-
           %Notification{}
           |> Notification.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast_service_message(scope, {:created, service_message})
      {:ok, service_message}
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
  def update_service_message(%Scope{} = scope, %Notification{} = service_message, attrs) do
    with {:ok, service_message = %Notification{}} <-
           service_message
           |> Notification.changeset(attrs, scope)
           |> Repo.update() do
      broadcast_service_message(scope, {:updated, service_message})
      {:ok, service_message}
    end
  end

  @doc """
  Deletes a service_message.

  ## Examples

      iex> delete_service_message(scope, service_message)
      {:ok, %ServiceMessage{}}

      iex> delete_service_message(scope, service_message)
      {:error, %Ecto.Changeset{}}

  """
  def delete_service_message(%Scope{} = scope, %Notification{} = service_message) do
    with {:ok, service_message = %Notification{}} <-
           Repo.delete(service_message) do
      broadcast_service_message(scope, {:deleted, service_message})
      {:ok, service_message}
    end
  end

  def save_log(email, %Notification{} = notification) do
    %Log{}
    |> Log.changeset(%{email: email}, notification)
    |> Repo.insert()
  end
end
