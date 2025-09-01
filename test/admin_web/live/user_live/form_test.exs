defmodule AdminWeb.UserLive.FormTest do
  use AdminWeb.ConnCase
  import Phoenix.LiveViewTest

  describe "User form" do
    setup :register_and_log_in_user

    test "renders form for new user", %{conn: conn} do
      {:ok, lv, html} = live(conn, ~p"/users/new")

      assert html =~ "Create a new User"
      assert has_element?(lv, "form")

      assert form(lv, "#user_form", user: %{email: "test@example.com"})
             |> render_submit()
             |> follow_redirect(conn, ~p"/users")
    end
  end
end
