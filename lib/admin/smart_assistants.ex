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

  alias Admin.Accounts.Scope
  alias Admin.SmartAssistants.Conversation

  @doc """
  Subscribes to scoped notifications about any conversation changes.

  The broadcasted messages match the pattern:

    * {:created, %Conversation{}}
    * {:updated, %Conversation{}}
    * {:deleted, %Conversation{}}

  """
  def subscribe_conversations(%Scope{} = scope) do
    key = scope.user.id

    Phoenix.PubSub.subscribe(Admin.PubSub, "user:#{key}:conversations")
  end

  @doc """
  Returns the list of conversations.

  ## Examples

      iex> list_conversations(scope)
      [%Conversation{}, ...]

  """
  def list_conversations(%Scope{} = scope) do
    Repo.all_by(Conversation, user_id: scope.user.id)
  end

  @doc """
  Gets a single conversation.

  Raises `Ecto.NoResultsError` if the Conversation does not exist.

  ## Examples

      iex> get_conversation!(scope, 123)
      %Conversation{}

      iex> get_conversation!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_conversation!(%Scope{} = scope, id) do
    Repo.get_by!(Conversation, id: id, user_id: scope.user.id) |> Repo.preload([:messages])
  end

  @doc """
  Gets all conversations for an assistant.
  """
  def get_conversations(%Scope{} = scope, assistant_id) do
    Repo.all_by(Conversation, assistant_id: assistant_id, user_id: scope.user.id)
  end

  @doc """
  Creates a conversation.

  ## Examples

      iex> create_conversation(scope, %{field: value})
      {:ok, %Conversation{}}

      iex> create_conversation(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_conversation(%Scope{} = scope, attrs) do
    with {:ok, conversation = %Conversation{}} <-
           %Conversation{}
           |> Conversation.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast(scope, {:created, conversation})
      {:ok, conversation}
    end
  end

  @doc """
  Updates a conversation.

  ## Examples

      iex> update_conversation(scope, conversation, %{field: new_value})
      {:ok, %Conversation{}}

      iex> update_conversation(scope, conversation, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_conversation(%Scope{} = scope, %Conversation{} = conversation, attrs) do
    true = conversation.user_id == scope.user.id

    with {:ok, conversation = %Conversation{}} <-
           conversation
           |> Conversation.changeset(attrs, scope)
           |> Repo.update() do
      broadcast(scope, {:updated, conversation})
      {:ok, conversation}
    end
  end

  @doc """
  Deletes a conversation.

  ## Examples

      iex> delete_conversation(scope, conversation)
      {:ok, %Conversation{}}

      iex> delete_conversation(scope, conversation)
      {:error, %Ecto.Changeset{}}

  """
  def delete_conversation(%Scope{} = scope, %Conversation{} = conversation) do
    true = conversation.user_id == scope.user.id

    with {:ok, conversation = %Conversation{}} <-
           Repo.delete(conversation) do
      broadcast(scope, {:deleted, conversation})
      {:ok, conversation}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking conversation changes.

  ## Examples

      iex> change_conversation(scope, conversation)
      %Ecto.Changeset{data: %Conversation{}}

  """
  def change_conversation(%Scope{} = scope, %Conversation{} = conversation, attrs \\ %{}) do
    true = conversation.user_id == scope.user.id

    Conversation.changeset(conversation, attrs, scope)
  end

  alias Admin.Accounts.Scope
  alias Admin.SmartAssistants.Message

  @doc """
  Subscribes to scoped notifications about any message changes.

  The broadcasted messages match the pattern:

    * {:created, %Message{}}
    * {:updated, %Message{}}
    * {:deleted, %Message{}}

  """
  def subscribe_messages(%Scope{} = scope, conversation_id) do
    true = get_conversation!(scope, conversation_id).user_id == scope.user.id
    key = conversation_id

    Phoenix.PubSub.subscribe(Admin.PubSub, "conversations:#{key}:messages")
  end

  defp broadcast_messages(conversation_id, message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "conversations:#{conversation_id}:messages", message)
  end

  @doc """
  Returns the list of messages in the conversation.

  ## Examples

      iex> list_messages(scope)
      [%Message{}, ...]

  """
  def list_messages(%Scope{} = _scope, conversation_id) do
    Repo.all_by(Message, conversation_id: conversation_id)
  end

  @doc """
  Gets a single message.

  Raises `Ecto.NoResultsError` if the Message does not exist.

  ## Examples

      iex> get_message!(scope, 123)
      %Message{}

      iex> get_message!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_message!(%Scope{} = scope, id) do
    Repo.get_by!(Message, id: id, user_id: scope.user.id)
  end

  @doc """
  Creates a message.

  ## Examples

      iex> create_message(scope, %{field: value})
      {:ok, %Message{}}

      iex> create_message(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_message(%Scope{} = scope, attrs, conversation_id) do
    with {:ok, message = %Message{}} <-
           %Message{}
           |> Message.changeset(attrs, scope, conversation_id)
           |> Repo.insert() do
      broadcast_messages(conversation_id, {:created, message})
      {:ok, message}
    end
  end

  @doc """
  Updates a message.

  ## Examples

      iex> update_message(scope, message, %{field: new_value})
      {:ok, %Message{}}

      iex> update_message(scope, message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_message(%Scope{} = scope, %Message{} = message, attrs) do
    true = message.user_id == scope.user.id

    with {:ok, message = %Message{}} <-
           message
           |> Message.changeset(attrs, scope, message.conversation.id)
           |> Repo.update() do
      broadcast_messages(message.conversation.id, {:updated, message})
      {:ok, message}
    end
  end

  @doc """
  Deletes a message.

  ## Examples

      iex> delete_message(scope, message)
      {:ok, %Message{}}

      iex> delete_message(scope, message)
      {:error, %Ecto.Changeset{}}

  """
  def delete_message(%Scope{} = scope, %Message{} = message) do
    true = message.user_id == scope.user.id

    with {:ok, message = %Message{}} <-
           Repo.delete(message) do
      broadcast_messages(message.conversation.id, {:deleted, message})
      {:ok, message}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking message changes.

  ## Examples

      iex> change_message(scope, message)
      %Ecto.Changeset{data: %Message{}}

  """
  def change_message(%Scope{} = scope, conversation_id, %Message{} = message, attrs \\ %{}) do
    true = message.user_id == scope.user.id

    Message.changeset(message, attrs, scope, conversation_id)
  end
end
