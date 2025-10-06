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
end
