defmodule Admin.SmartAssistants do
  @moduledoc """
  The SmartAssistants context.
  """

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.Accounts.Scope
  alias Admin.SmartAssistants.Assistant

  @doc """
  Subscribes to scoped notifications about any assistant changes.

  The broadcasted messages match the pattern:

    * {:created, %Assistant{}}
    * {:updated, %Assistant{}}
    * {:deleted, %Assistant{}}

  """
  def subscribe_assistants(%Scope{} = scope) do
    key = scope.user.id

    Phoenix.PubSub.subscribe(Admin.PubSub, "user:#{key}:assistants")
  end

  defp broadcast(%Scope{} = scope, message) do
    key = scope.user.id

    Phoenix.PubSub.broadcast(Admin.PubSub, "user:#{key}:assistants", message)
  end

  @doc """
  Returns the list of assistants.

  ## Examples

      iex> list_assistants(scope)
      [%Assistant{}, ...]

  """
  def list_assistants(%Scope{} = scope) do
    Repo.all_by(Assistant, user_id: scope.user.id)
  end

  @doc """
  Gets a single assistant.

  Raises `Ecto.NoResultsError` if the Assistant does not exist.

  ## Examples

      iex> get_assistant!(scope, 123)
      %Assistant{}

      iex> get_assistant!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_assistant!(%Scope{} = scope, id) do
    Repo.get_by!(Assistant, id: id, user_id: scope.user.id)
  end

  @doc """
  Creates a assistant.

  ## Examples

      iex> create_assistant(scope, %{field: value})
      {:ok, %Assistant{}}

      iex> create_assistant(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_assistant(%Scope{} = scope, attrs) do
    with {:ok, assistant = %Assistant{}} <-
           %Assistant{}
           |> Assistant.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast(scope, {:created, assistant})
      {:ok, assistant}
    end
  end

  @doc """
  Updates a assistant.

  ## Examples

      iex> update_assistant(scope, assistant, %{field: new_value})
      {:ok, %Assistant{}}

      iex> update_assistant(scope, assistant, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_assistant(%Scope{} = scope, %Assistant{} = assistant, attrs) do
    true = assistant.user_id == scope.user.id

    with {:ok, assistant = %Assistant{}} <-
           assistant
           |> Assistant.changeset(attrs, scope)
           |> Repo.update() do
      broadcast(scope, {:updated, assistant})
      {:ok, assistant}
    end
  end

  @doc """
  Deletes a assistant.

  ## Examples

      iex> delete_assistant(scope, assistant)
      {:ok, %Assistant{}}

      iex> delete_assistant(scope, assistant)
      {:error, %Ecto.Changeset{}}

  """
  def delete_assistant(%Scope{} = scope, %Assistant{} = assistant) do
    true = assistant.user_id == scope.user.id

    with {:ok, assistant = %Assistant{}} <-
           Repo.delete(assistant) do
      broadcast(scope, {:deleted, assistant})
      {:ok, assistant}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking assistant changes.

  ## Examples

      iex> change_assistant(scope, assistant)
      %Ecto.Changeset{data: %Assistant{}}

  """
  def change_assistant(%Scope{} = scope, %Assistant{} = assistant, attrs \\ %{}) do
    true = assistant.user_id == scope.user.id

    Assistant.changeset(assistant, attrs, scope)
  end
end
