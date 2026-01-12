defmodule AdminWeb.NotificationLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest
  import Admin.NotificationsFixtures

  @create_attrs %{
    name: "some name",
    audience: "active",
    default_language: "en",
    use_strict_languages: false
  }
  @invalid_attrs %{name: nil, audience: nil, default_language: nil}

  setup :register_and_log_in_user

  defp create_notification(%{scope: scope}) do
    notification = notification_fixture(scope)

    %{notification: notification}
  end

  defp create_localized_messages(%{scope: scope, notification: notification}) do
    localized_messages_fixture(scope, notification, %{
      subject: "some subject",
      language: notification.default_language
    })

    notification = Admin.Notifications.get_notification!(scope, notification.id)

    %{notification: notification}
  end

  describe "Index" do
    setup [:create_notification]

    test "lists all notifications", %{conn: conn, notification: notification} do
      {:ok, _index_live, html} = live(conn, ~p"/admin/notifications")

      assert html =~ "Mailing"
      assert html =~ notification.name
    end

    test "saves new notification", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/admin/notifications")

      assert {:ok, form_live, _} =
               index_live
               |> element("a", "New Mail")
               |> render_click()
               |> follow_redirect(conn, ~p"/admin/notifications/new")

      assert render(form_live) =~ "New Mail"

      assert form_live
             |> form("#notification-form", notification: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      # After rows are set, validate the form fields
      assert {:ok, index_live, _html} =
               form_live
               |> form("#notification-form",
                 notification: @create_attrs
               )
               |> render_submit()
               |> follow_redirect(conn)

      html = render(index_live)
      assert html =~ "Composing message"
      assert html =~ "some name"
    end

    test "deletes notification in listing", %{conn: conn, notification: notification} do
      {:ok, index_live, _html} = live(conn, ~p"/admin/notifications")

      # using the delete_sent event directly since we have a browser based confirmation that is hard to do in tests.
      assert index_live
             |> render_change("delete_sent", %{"id" => notification.id})

      refute has_element?(index_live, "#sent_notifications-#{notification.id}")
    end
  end

  describe "Show" do
    setup [:create_notification]

    test "displays notification", %{conn: conn, notification: notification} do
      {:ok, _show_live, html} = live(conn, ~p"/admin/notifications/#{notification}")

      assert html =~ "Show Mail"
      assert html =~ notification.name
    end

    test "adds localized messages", %{conn: conn, notification: notification} do
      {:ok, show_live, _html} = live(conn, ~p"/admin/notifications/#{notification}")

      assert {:ok, _add_default_locale, html} =
               show_live
               |> element("a", "Add default locale")
               |> render_click()
               |> follow_redirect(
                 conn,
                 ~p"/admin/notifications/#{notification}/messages/new?language=#{notification.default_language}"
               )

      assert html =~ "New localized message"
      assert html =~ notification.default_language
    end
  end

  describe "Localized Messages" do
    setup [:create_notification, :create_localized_messages]

    test "Shows localized messages", %{conn: conn, notification: notification} do
      {:ok, _show_live, html} = live(conn, ~p"/admin/notifications/#{notification}")
      assert html =~ "Show Mail"
      assert html =~ notification.localized_emails |> Enum.at(0) |> Map.get(:subject)
    end
  end
end
