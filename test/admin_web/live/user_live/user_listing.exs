defmodule AdminWeb.UserLive.ListingTest do
  use AdminWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import Admin.AccountsFixtures

  describe "List Users" do
    test "render user list", %{conn: conn} do
      {:ok, _lv, html} = conn |> log_in_user(user_fixture()) |> live(~p"/users")

      assert html =~ "List users"
    end

    test "redirects if user is not logged in", %{conn: conn} do
      assert {:error, redirect} = live(conn, ~p"/users")

      assert {:redirect, %{to: path, flash: flash}} = redirect
      assert path == ~p"/users/log-in"
      assert %{"error" => "You must log in to access this page."} = flash
    end
  end
end
