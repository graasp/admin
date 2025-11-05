defmodule Admin.NotificationsTest do
  use Admin.DataCase

  alias Admin.Notifications

  describe "service_messages" do
    alias Admin.Notifications.ServiceMessage

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.NotificationsFixtures

    @invalid_attrs %{message: nil, subject: nil}

    test "list_service_messages/1 returns all scoped service_messages" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      service_message = service_message_fixture(scope)
      other_service_message = service_message_fixture(other_scope)
      assert Notifications.list_service_messages(scope) == [service_message]
      assert Notifications.list_service_messages(other_scope) == [other_service_message]
    end

    test "get_service_message!/2 returns the service_message with given id" do
      scope = user_scope_fixture()
      service_message = service_message_fixture(scope)
      other_scope = user_scope_fixture()
      assert Notifications.get_service_message!(scope, service_message.id) == service_message

      assert_raise Ecto.NoResultsError, fn ->
        Notifications.get_service_message!(other_scope, service_message.id)
      end
    end

    test "create_service_message/2 with valid data creates a service_message" do
      valid_attrs = %{message: "some message", subject: "some subject"}
      scope = user_scope_fixture()

      assert {:ok, %ServiceMessage{} = service_message} =
               Notifications.create_service_message(scope, valid_attrs)

      assert service_message.message == "some message"
      assert service_message.subject == "some subject"
      assert service_message.user_id == scope.user.id
    end

    test "create_service_message/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Notifications.create_service_message(scope, @invalid_attrs)
    end

    test "update_service_message/3 with valid data updates the service_message" do
      scope = user_scope_fixture()
      service_message = service_message_fixture(scope)
      update_attrs = %{message: "some updated message", subject: "some updated subject"}

      assert {:ok, %ServiceMessage{} = service_message} =
               Notifications.update_service_message(scope, service_message, update_attrs)

      assert service_message.message == "some updated message"
      assert service_message.subject == "some updated subject"
    end

    test "update_service_message/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      service_message = service_message_fixture(scope)

      assert_raise MatchError, fn ->
        Notifications.update_service_message(other_scope, service_message, %{})
      end
    end

    test "update_service_message/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      service_message = service_message_fixture(scope)

      assert {:error, %Ecto.Changeset{}} =
               Notifications.update_service_message(scope, service_message, @invalid_attrs)

      assert service_message == Notifications.get_service_message!(scope, service_message.id)
    end

    test "delete_service_message/2 deletes the service_message" do
      scope = user_scope_fixture()
      service_message = service_message_fixture(scope)

      assert {:ok, %ServiceMessage{}} =
               Notifications.delete_service_message(scope, service_message)

      assert_raise Ecto.NoResultsError, fn ->
        Notifications.get_service_message!(scope, service_message.id)
      end
    end

    test "delete_service_message/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      service_message = service_message_fixture(scope)

      assert_raise MatchError, fn ->
        Notifications.delete_service_message(other_scope, service_message)
      end
    end

    test "change_service_message/2 returns a service_message changeset" do
      scope = user_scope_fixture()
      service_message = service_message_fixture(scope)
      assert %Ecto.Changeset{} = Notifications.change_service_message(scope, service_message)
    end
  end
end
