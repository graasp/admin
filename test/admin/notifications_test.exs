defmodule Admin.NotificationsTest do
  use Admin.DataCase

  alias Admin.Notifications
  alias Admin.Notifications.{Log, Notification}

  import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
  import Admin.NotificationsFixtures

  describe "notifications" do
    @empty_attrs %{name: nil, audience: nil, default_language: nil}
    @invalid_language_attrs %{
      name: "A mailing message",
      audience: "custom",
      default_language: "invalid"
    }

    test "list_notifications/1 returns all notifications" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      notifications = notification_fixture(scope, %{name: "Notification 1"})
      other_notifications = notification_fixture(other_scope, %{name: "Notification 2"})
      # are ordered from newest to oldest
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
        name: "some message",
        audience: "custom",
        default_language: "en"
      }

      scope = user_scope_fixture()

      assert {:ok, %Notification{} = notification} =
               Notifications.create_notification(scope, valid_attrs)

      assert notification.name == "some message"
      assert notification.audience == "custom"
      assert notification.default_language == "en"
    end

    test "create_notification/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Notifications.create_notification(scope, @empty_attrs)

      assert {:error, %Ecto.Changeset{}} =
               Notifications.create_notification(scope, @invalid_language_attrs)
    end

    test "update_notification/3 with valid data updates the notification" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)
      update_attrs = %{name: "some updated name", audience: "recent"}

      assert {:ok, %Notification{} = notification} =
               Notifications.update_notification(scope, notification, update_attrs)

      assert notification.name == "some updated name"
      assert notification.audience == "recent"
    end

    test "update_notification/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)

      assert {:error, %Ecto.Changeset{}} =
               Notifications.update_notification(scope, notification, @empty_attrs)

      assert {:error, %Ecto.Changeset{}} =
               Notifications.update_notification(scope, notification, @invalid_language_attrs)

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

  describe "notification logs" do
    setup [:create_notification]

    test "saves log", %{scope: scope, notification: notification} do
      assert {:ok, %Log{}} =
               Notifications.save_log(
                 scope,
                 %{email: "user@example.com", status: "sent"},
                 notification
               )

      assert {:ok, %Log{}} =
               Notifications.save_log(
                 scope,
                 %{email: "user@example.com", status: "failed"},
                 notification
               )
    end

    test "rejects if status is invalid", %{scope: scope, notification: notification} do
      assert {:error, %Ecto.Changeset{}} =
               Notifications.save_log(
                 scope,
                 %{email: "user@example.com", status: "invalid"},
                 notification
               )
    end
  end

  describe "notification pixels" do
    setup [:create_notification]

    test "create pixel", %{scope: scope, notification: notification} do
      Req.Test.stub(Admin.UmamiApi, fn conn ->
        case conn.request_path do
          "/api/auth/verify" ->
            Plug.Conn.send_resp(conn, 401, "Not authorized")

          "/api/auth/login" ->
            Req.Test.json(
              conn,
              %{"token" => "token_example", "user" => %{"teams" => [%{"name" => "graasp"}]}}
            )

          "/api/pixels" ->
            Req.Test.json(
              conn,
              %{"id" => Ecto.UUID.generate(), "name" => "example_name", "slug" => "example_slug"}
            )
        end
      end)

      assert {:ok, %Admin.Notifications.Pixel{} = pixel} =
               Notifications.create_pixel(scope, notification)

      assert pixel.notification_id == notification.id
      assert pixel.name == "example_name"
      assert pixel.slug == "example_slug"
    end
  end

  describe "localized emails" do
    setup [:create_notification]

    test "creates a localized email", %{scope: scope, notification: notification} do
      assert {:ok, %Admin.Notifications.LocalizedEmail{} = localized_email} =
               Notifications.create_localized_email(scope, notification.id, %{
                 subject: "example_subject",
                 message: "This is an example message",
                 button_text: "example_button_text",
                 button_url: "https://example.com",
                 language: "en"
               })

      assert localized_email.notification_id == notification.id
    end

    test "allows long messages", %{scope: scope, notification: notification} do
      assert {:ok, %Admin.Notifications.LocalizedEmail{} = localized_email} =
               Notifications.create_localized_email(scope, notification.id, %{
                 subject: "example_subject",
                 message: String.duplicate("a", 2050),
                 button_text: "example_button_text",
                 button_url: "https://example.com",
                 language: "en"
               })

      assert localized_email.notification_id == notification.id
    end

    test "errors for url too long", %{scope: scope, notification: notification} do
      assert {:error, %Ecto.Changeset{} = changeset} =
               Notifications.create_localized_email(scope, notification.id, %{
                 subject: "example_subject",
                 message: "This is an example message",
                 button_text: "example_button_text",
                 button_url: String.duplicate("a", 2050),
                 language: "en"
               })

      assert changeset.errors[:button_url] ==
               {"should be at most %{count} character(s)",
                [{:count, 2048}, {:validation, :length}, {:kind, :max}, {:type, :string}]}
    end
  end

  defp create_notification(_) do
    scope = user_scope_fixture()
    notification = notification_fixture(scope)
    %{scope: scope, notification: notification}
  end
end
