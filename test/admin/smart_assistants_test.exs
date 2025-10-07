defmodule Admin.SmartAssistantsTest do
  use Admin.DataCase

  alias Admin.SmartAssistants

  describe "assistants" do
    alias Admin.SmartAssistants.Assistant

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.SmartAssistantsFixtures

    @invalid_attrs %{name: nil, prompt: nil, shared_at: nil, picture: nil}

    test "list_assistants/1 returns all scoped assistants" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      other_assistant = assistant_fixture(other_scope)
      assert SmartAssistants.list_assistants(scope) == [assistant]
      assert SmartAssistants.list_assistants(other_scope) == [other_assistant]
    end

    test "get_assistant!/2 returns the assistant with given id" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      other_scope = user_scope_fixture()
      assert SmartAssistants.get_assistant!(scope, assistant.id) == assistant
      assert_raise Ecto.NoResultsError, fn -> SmartAssistants.get_assistant!(other_scope, assistant.id) end
    end

    test "create_assistant/2 with valid data creates a assistant" do
      valid_attrs = %{name: "some name", prompt: "some prompt", shared_at: ~N[2025-10-05 09:18:00], picture: "some picture"}
      scope = user_scope_fixture()

      assert {:ok, %Assistant{} = assistant} = SmartAssistants.create_assistant(scope, valid_attrs)
      assert assistant.name == "some name"
      assert assistant.prompt == "some prompt"
      assert assistant.shared_at == ~N[2025-10-05 09:18:00]
      assert assistant.picture == "some picture"
      assert assistant.user_id == scope.user.id
    end

    test "create_assistant/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = SmartAssistants.create_assistant(scope, @invalid_attrs)
    end

    test "update_assistant/3 with valid data updates the assistant" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      update_attrs = %{name: "some updated name", prompt: "some updated prompt", shared_at: ~N[2025-10-06 09:18:00], picture: "some updated picture"}

      assert {:ok, %Assistant{} = assistant} = SmartAssistants.update_assistant(scope, assistant, update_attrs)
      assert assistant.name == "some updated name"
      assert assistant.prompt == "some updated prompt"
      assert assistant.shared_at == ~N[2025-10-06 09:18:00]
      assert assistant.picture == "some updated picture"
    end

    test "update_assistant/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      assistant = assistant_fixture(scope)

      assert_raise MatchError, fn ->
        SmartAssistants.update_assistant(other_scope, assistant, %{})
      end
    end

    test "update_assistant/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = SmartAssistants.update_assistant(scope, assistant, @invalid_attrs)
      assert assistant == SmartAssistants.get_assistant!(scope, assistant.id)
    end

    test "delete_assistant/2 deletes the assistant" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      assert {:ok, %Assistant{}} = SmartAssistants.delete_assistant(scope, assistant)
      assert_raise Ecto.NoResultsError, fn -> SmartAssistants.get_assistant!(scope, assistant.id) end
    end

    test "delete_assistant/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      assert_raise MatchError, fn -> SmartAssistants.delete_assistant(other_scope, assistant) end
    end

    test "change_assistant/2 returns a assistant changeset" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      assert %Ecto.Changeset{} = SmartAssistants.change_assistant(scope, assistant)
    end
  end

  describe "assistants" do
    alias Admin.SmartAssistants.Assistant

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.SmartAssistantsFixtures

    @invalid_attrs %{name: nil, prompt: nil, picture: nil}

    test "list_assistants/1 returns all scoped assistants" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      other_assistant = assistant_fixture(other_scope)
      assert SmartAssistants.list_assistants(scope) == [assistant]
      assert SmartAssistants.list_assistants(other_scope) == [other_assistant]
    end

    test "get_assistant!/2 returns the assistant with given id" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      other_scope = user_scope_fixture()
      assert SmartAssistants.get_assistant!(scope, assistant.id) == assistant
      assert_raise Ecto.NoResultsError, fn -> SmartAssistants.get_assistant!(other_scope, assistant.id) end
    end

    test "create_assistant/2 with valid data creates a assistant" do
      valid_attrs = %{name: "some name", prompt: "some prompt", picture: "some picture"}
      scope = user_scope_fixture()

      assert {:ok, %Assistant{} = assistant} = SmartAssistants.create_assistant(scope, valid_attrs)
      assert assistant.name == "some name"
      assert assistant.prompt == "some prompt"
      assert assistant.picture == "some picture"
      assert assistant.user_id == scope.user.id
    end

    test "create_assistant/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = SmartAssistants.create_assistant(scope, @invalid_attrs)
    end

    test "update_assistant/3 with valid data updates the assistant" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      update_attrs = %{name: "some updated name", prompt: "some updated prompt", picture: "some updated picture"}

      assert {:ok, %Assistant{} = assistant} = SmartAssistants.update_assistant(scope, assistant, update_attrs)
      assert assistant.name == "some updated name"
      assert assistant.prompt == "some updated prompt"
      assert assistant.picture == "some updated picture"
    end

    test "update_assistant/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      assistant = assistant_fixture(scope)

      assert_raise MatchError, fn ->
        SmartAssistants.update_assistant(other_scope, assistant, %{})
      end
    end

    test "update_assistant/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = SmartAssistants.update_assistant(scope, assistant, @invalid_attrs)
      assert assistant == SmartAssistants.get_assistant!(scope, assistant.id)
    end

    test "delete_assistant/2 deletes the assistant" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      assert {:ok, %Assistant{}} = SmartAssistants.delete_assistant(scope, assistant)
      assert_raise Ecto.NoResultsError, fn -> SmartAssistants.get_assistant!(scope, assistant.id) end
    end

    test "delete_assistant/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      assert_raise MatchError, fn -> SmartAssistants.delete_assistant(other_scope, assistant) end
    end

    test "change_assistant/2 returns a assistant changeset" do
      scope = user_scope_fixture()
      assistant = assistant_fixture(scope)
      assert %Ecto.Changeset{} = SmartAssistants.change_assistant(scope, assistant)
    end
  end

  describe "conversations" do
    alias Admin.SmartAssistants.Conversation

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.SmartAssistantsFixtures

    @invalid_attrs %{}

    test "list_conversations/1 returns all scoped conversations" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      conversation = conversation_fixture(scope)
      other_conversation = conversation_fixture(other_scope)
      assert SmartAssistants.list_conversations(scope) == [conversation]
      assert SmartAssistants.list_conversations(other_scope) == [other_conversation]
    end

    test "get_conversation!/2 returns the conversation with given id" do
      scope = user_scope_fixture()
      conversation = conversation_fixture(scope)
      other_scope = user_scope_fixture()
      assert SmartAssistants.get_conversation!(scope, conversation.id) == conversation
      assert_raise Ecto.NoResultsError, fn -> SmartAssistants.get_conversation!(other_scope, conversation.id) end
    end

    test "create_conversation/2 with valid data creates a conversation" do
      valid_attrs = %{}
      scope = user_scope_fixture()

      assert {:ok, %Conversation{} = conversation} = SmartAssistants.create_conversation(scope, valid_attrs)
      assert conversation.user_id == scope.user.id
    end

    test "create_conversation/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = SmartAssistants.create_conversation(scope, @invalid_attrs)
    end

    test "update_conversation/3 with valid data updates the conversation" do
      scope = user_scope_fixture()
      conversation = conversation_fixture(scope)
      update_attrs = %{}

      assert {:ok, %Conversation{} = conversation} = SmartAssistants.update_conversation(scope, conversation, update_attrs)
    end

    test "update_conversation/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      conversation = conversation_fixture(scope)

      assert_raise MatchError, fn ->
        SmartAssistants.update_conversation(other_scope, conversation, %{})
      end
    end

    test "update_conversation/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      conversation = conversation_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = SmartAssistants.update_conversation(scope, conversation, @invalid_attrs)
      assert conversation == SmartAssistants.get_conversation!(scope, conversation.id)
    end

    test "delete_conversation/2 deletes the conversation" do
      scope = user_scope_fixture()
      conversation = conversation_fixture(scope)
      assert {:ok, %Conversation{}} = SmartAssistants.delete_conversation(scope, conversation)
      assert_raise Ecto.NoResultsError, fn -> SmartAssistants.get_conversation!(scope, conversation.id) end
    end

    test "delete_conversation/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      conversation = conversation_fixture(scope)
      assert_raise MatchError, fn -> SmartAssistants.delete_conversation(other_scope, conversation) end
    end

    test "change_conversation/2 returns a conversation changeset" do
      scope = user_scope_fixture()
      conversation = conversation_fixture(scope)
      assert %Ecto.Changeset{} = SmartAssistants.change_conversation(scope, conversation)
    end
  end

  describe "messages" do
    alias Admin.SmartAssistants.Message

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.SmartAssistantsFixtures

    @invalid_attrs %{type: nil, content: nil}

    test "list_messages/1 returns all scoped messages" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      message = message_fixture(scope)
      other_message = message_fixture(other_scope)
      assert SmartAssistants.list_messages(scope) == [message]
      assert SmartAssistants.list_messages(other_scope) == [other_message]
    end

    test "get_message!/2 returns the message with given id" do
      scope = user_scope_fixture()
      message = message_fixture(scope)
      other_scope = user_scope_fixture()
      assert SmartAssistants.get_message!(scope, message.id) == message
      assert_raise Ecto.NoResultsError, fn -> SmartAssistants.get_message!(other_scope, message.id) end
    end

    test "create_message/2 with valid data creates a message" do
      valid_attrs = %{type: "some type", content: "some content"}
      scope = user_scope_fixture()

      assert {:ok, %Message{} = message} = SmartAssistants.create_message(scope, valid_attrs)
      assert message.type == "some type"
      assert message.content == "some content"
      assert message.user_id == scope.user.id
    end

    test "create_message/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = SmartAssistants.create_message(scope, @invalid_attrs)
    end

    test "update_message/3 with valid data updates the message" do
      scope = user_scope_fixture()
      message = message_fixture(scope)
      update_attrs = %{type: "some updated type", content: "some updated content"}

      assert {:ok, %Message{} = message} = SmartAssistants.update_message(scope, message, update_attrs)
      assert message.type == "some updated type"
      assert message.content == "some updated content"
    end

    test "update_message/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      message = message_fixture(scope)

      assert_raise MatchError, fn ->
        SmartAssistants.update_message(other_scope, message, %{})
      end
    end

    test "update_message/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      message = message_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = SmartAssistants.update_message(scope, message, @invalid_attrs)
      assert message == SmartAssistants.get_message!(scope, message.id)
    end

    test "delete_message/2 deletes the message" do
      scope = user_scope_fixture()
      message = message_fixture(scope)
      assert {:ok, %Message{}} = SmartAssistants.delete_message(scope, message)
      assert_raise Ecto.NoResultsError, fn -> SmartAssistants.get_message!(scope, message.id) end
    end

    test "delete_message/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      message = message_fixture(scope)
      assert_raise MatchError, fn -> SmartAssistants.delete_message(other_scope, message) end
    end

    test "change_message/2 returns a message changeset" do
      scope = user_scope_fixture()
      message = message_fixture(scope)
      assert %Ecto.Changeset{} = SmartAssistants.change_message(scope, message)
    end
  end
end
