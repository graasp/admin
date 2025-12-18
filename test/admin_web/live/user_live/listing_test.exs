defmodule AdminWeb.UserLive.ListingTest do
  use AdminWeb.ConnCase, async: true

  import Admin.AccountsFixtures
  import Phoenix.LiveViewTest

  describe "Listing users" do
    setup :register_and_log_in_user

    test "Shows users", %{conn: conn} do
      {:ok, _lv, html} = live(conn, ~p"/admin/users")
      assert html =~ "Admin users"
    end

    test "Delete user with confirmation dialog", %{conn: conn} do
      user = user_fixture()
      {:ok, lv, _html} = live(conn, ~p"/admin/users")
      lv |> element("#users-#{user.id} > button") |> render_click(%{value: user.id})
      # cancel in the dialog
      lv |> element("#cancel_button") |> render_click()
      assert has_element?(lv, "#users-#{user.id}")

      lv |> element("#users-#{user.id} > button") |> render_click(%{value: user.id})
      # confirm in the dialog
      lv |> element("#delete_button") |> render_click()

      refute has_element?(lv, "#users-#{user.id}")
    end

    test "Add user", %{conn: conn} do
      {:ok, lv, _html} = live(conn, ~p"/admin/users")

      assert {:ok, form_live, _} =
               lv
               |> element("#new_user")
               |> render_click()
               |> follow_redirect(conn, ~p"/admin/users/new")

      assert {:ok, index_live, _} =
               form_live
               |> form("#user_form", user: %{email: "test@example.com"})
               |> render_submit()
               |> follow_redirect(conn, ~p"/admin/users")

      assert render(index_live) =~ "User registered"
    end
  end
end
