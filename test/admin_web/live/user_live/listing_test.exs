defmodule AdminWeb.UserLive.ListingTest do
  use AdminWeb.ConnCase, async: true

  import Admin.AccountsFixtures
  import Phoenix.LiveViewTest

  describe "Listing users" do
    setup :register_and_log_in_user

    test "Shows users", %{conn: conn} do
      {:ok, _lv, html} = live(conn, ~p"/users")
      assert html =~ "List users"
    end

    test "Delete user with confirmation dialog", %{conn: conn} do
      user = user_fixture()
      {:ok, lv, _html} = live(conn, ~p"/users")
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
      {:ok, lv, _html} = live(conn, ~p"/users")
      lv |> element("#new_user") |> render_click()

      assert render(lv) =~ "New user created"
    end
  end
end
