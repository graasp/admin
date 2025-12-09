defmodule AdminWeb.ServiceMessageLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest
  import Admin.NotificationsFixtures

  @create_attrs %{name: "some name", audience: "all", default_language: "en"}
  @invalid_attrs %{name: nil, audience: nil, default_language: nil}

  setup :register_and_log_in_user

  defp create_notification(%{scope: scope}) do
    notification = notification_fixture(scope)

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
      assert html =~ "Notification created"
      assert html =~ "some name"
    end

    test "deletes notification in listing", %{conn: conn, notification: notification} do
      {:ok, index_live, _html} = live(conn, ~p"/admin/notifications")

      assert index_live
             |> element("#notifications-#{notification.id} a", "Delete")
             |> render_click()

      refute has_element?(index_live, "#notifications-#{notification.id}")
    end
  end

  describe "Show" do
    setup [:create_notification]

    test "displays notification", %{conn: conn, notification: notification} do
      {:ok, _show_live, html} = live(conn, ~p"/admin/notifications/#{notification}")

      assert html =~ "Show Mail"
      assert html =~ notification.name
    end
  end
end
