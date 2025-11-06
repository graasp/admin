defmodule Admin.NotificationsTest do
  use Admin.DataCase

  alias Admin.Notifications

  describe "notifications" do
    alias Admin.Notifications.Notification

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.NotificationsFixtures

    @empty_attrs %{message: nil, title: nil, recipients: nil}
    @invalid_email_attrs %{message: "A message", title: "title", recipients: ["test", "other"]}

    test "list_notifications/1 returns all notifications" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      notifications = notification_fixture(scope)
      other_notifications = notification_fixture(other_scope)
      assert Notifications.list_notifications(scope) == [notifications, other_notifications]
    end

    test "get_notification!/2 returns the notification with given id" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)
      other_scope = user_scope_fixture()
      assert Notifications.get_notification!(scope, notification.id) == notification
      # it is also possible to fetch it with another scope
      assert Notifications.get_notification!(other_scope, notification.id) == notification
    end

    test "create_notification/2 with valid data creates a notification" do
      valid_attrs = %{
        message: "some message",
        title: "some subject",
        recipients: ["user1@example.com", "user2@example.com"]
      }

      scope = user_scope_fixture()

      assert {:ok, %Notification{} = notification} =
               Notifications.create_notification(scope, valid_attrs)

      assert notification.message == "some message"
      assert notification.title == "some subject"
      assert notification.recipients == ["user1@example.com", "user2@example.com"]
    end

    test "create_notification/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Notifications.create_notification(scope, @empty_attrs)

      assert {:error, %Ecto.Changeset{}} =
               Notifications.create_notification(scope, @invalid_email_attrs)
    end

    test "update_notification/3 with valid data updates the notification" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)
      update_attrs = %{message: "some updated message", title: "some updated subject"}

      assert {:ok, %Notification{} = notification} =
               Notifications.update_notification(scope, notification, update_attrs)

      assert notification.message == "some updated message"
      assert notification.title == "some updated subject"
    end

    test "update_notification/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)

      assert {:error, %Ecto.Changeset{}} =
               Notifications.update_notification(scope, notification, @empty_attrs)

      assert {:error, %Ecto.Changeset{}} =
               Notifications.update_notification(scope, notification, @invalid_email_attrs)

      assert notification == Notifications.get_notification!(scope, notification.id)
    end

    test "delete_notification/2 deletes the notification" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)

      assert {:ok, %Notification{}} =
               Notifications.delete_notification(scope, notification)

      assert_raise Ecto.NoResultsError, fn ->
        Notifications.get_notification!(scope, notification.id)
      end
    end

    test "change_notification/2 returns a notification changeset" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)
      assert %Ecto.Changeset{} = Notifications.change_notification(scope, notification)
    end
  end
end
