defmodule AdminWeb.ServiceMessageLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest
  import Admin.NotificationsFixtures

  @create_attrs %{title: "some title", message: "some message"}
  @invalid_attrs %{title: nil, message: nil}

  setup :register_and_log_in_user

  defp create_notification(%{scope: scope}) do
    notification = notification_fixture(scope)

    %{notification: notification}
  end

  describe "Index" do
    setup [:create_notification]

    test "lists all notifications", %{conn: conn, notification: notification} do
      {:ok, _index_live, html} = live(conn, ~p"/notifications")

      assert html =~ "Notifications"
      assert html =~ notification.title
    end

    test "saves new notification", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/notifications")

      assert {:ok, form_live, _} =
               index_live
               |> element("a", "New Notification")
               |> render_click()
               |> follow_redirect(conn, ~p"/notifications/new")

      assert render(form_live) =~ "New Notification"

      assert form_live
             |> form("#notification-form", notification: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      # The first dynamic email input uses the name "manual_email_0"

      form_live
      |> element("input[name=manual_email_0]")
      |> render_change(%{
        "_target" => ["manual_email_0"],
        "manual_email_0" => "alice@example.com"
      })

      # After rows are set, validate the form fields
      assert {:ok, index_live, _html} =
               form_live
               |> form("#notification-form",
                 notification: @create_attrs
               )
               |> render_submit()
               |> follow_redirect(conn, ~p"/notifications")

      html = render(index_live)
      assert html =~ "Notification created"
      assert html =~ "some title"
    end

    test "deletes notification in listing", %{conn: conn, notification: notification} do
      {:ok, index_live, _html} = live(conn, ~p"/notifications")

      assert index_live
             |> element("#notifications-#{notification.id} a", "Delete")
             |> render_click()

      refute has_element?(index_live, "#notifications-#{notification.id}")
    end
  end

  describe "Show" do
    setup [:create_notification]

    test "displays notification", %{conn: conn, notification: notification} do
      {:ok, _show_live, html} = live(conn, ~p"/notifications/#{notification}")

      assert html =~ "Show Notification"
      assert html =~ notification.title
    end
  end
end
