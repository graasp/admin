defmodule AdminWeb.ServiceMessageLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest
  import Admin.NotificationsFixtures

  @create_attrs %{message: "some message", subject: "some subject"}
  @update_attrs %{message: "some updated message", subject: "some updated subject"}
  @invalid_attrs %{message: nil, subject: nil}

  setup :register_and_log_in_user

  defp create_service_message(%{scope: scope}) do
    service_message = service_message_fixture(scope)

    %{service_message: service_message}
  end

  describe "Index" do
    setup [:create_service_message]

    test "lists all service_messages", %{conn: conn, service_message: service_message} do
      {:ok, _index_live, html} = live(conn, ~p"/service_messages")

      assert html =~ "Listing Service messages"
      assert html =~ service_message.subject
    end

    test "saves new service_message", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/service_messages")

      assert {:ok, form_live, _} =
               index_live
               |> element("a", "New Service message")
               |> render_click()
               |> follow_redirect(conn, ~p"/service_messages/new")

      assert render(form_live) =~ "New Service message"

      assert form_live
             |> form("#service_message-form", service_message: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#service_message-form", service_message: @create_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/service_messages")

      html = render(index_live)
      assert html =~ "Service message created successfully"
      assert html =~ "some subject"
    end

    test "updates service_message in listing", %{conn: conn, service_message: service_message} do
      {:ok, index_live, _html} = live(conn, ~p"/service_messages")

      assert {:ok, form_live, _html} =
               index_live
               |> element("#service_messages-#{service_message.id} a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/service_messages/#{service_message}/edit")

      assert render(form_live) =~ "Edit Service message"

      assert form_live
             |> form("#service_message-form", service_message: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#service_message-form", service_message: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/service_messages")

      html = render(index_live)
      assert html =~ "Service message updated successfully"
      assert html =~ "some updated subject"
    end

    test "deletes service_message in listing", %{conn: conn, service_message: service_message} do
      {:ok, index_live, _html} = live(conn, ~p"/service_messages")

      assert index_live |> element("#service_messages-#{service_message.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#service_messages-#{service_message.id}")
    end
  end

  describe "Show" do
    setup [:create_service_message]

    test "displays service_message", %{conn: conn, service_message: service_message} do
      {:ok, _show_live, html} = live(conn, ~p"/service_messages/#{service_message}")

      assert html =~ "Show Service message"
      assert html =~ service_message.subject
    end

    test "updates service_message and returns to show", %{conn: conn, service_message: service_message} do
      {:ok, show_live, _html} = live(conn, ~p"/service_messages/#{service_message}")

      assert {:ok, form_live, _} =
               show_live
               |> element("a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/service_messages/#{service_message}/edit?return_to=show")

      assert render(form_live) =~ "Edit Service message"

      assert form_live
             |> form("#service_message-form", service_message: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, show_live, _html} =
               form_live
               |> form("#service_message-form", service_message: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/service_messages/#{service_message}")

      html = render(show_live)
      assert html =~ "Service message updated successfully"
      assert html =~ "some updated subject"
    end
  end
end
