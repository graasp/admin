defmodule AdminWeb.UserLive.ListingTest do
  use AdminWeb.ConnCase, async: true
  import Phoenix.LiveViewTest

  describe "Listing users" do
    setup :register_and_log_in_user

    test "Shows users", %{conn: conn} do
      {:ok, _lv, html} = live(conn, ~p"/users")
      assert html =~ "List users"
    end
  end
end
