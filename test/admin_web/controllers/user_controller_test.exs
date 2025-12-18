defmodule AdminWeb.UserControllerTest do
  use AdminWeb.ConnCase

  setup :register_and_log_in_user

  describe "show user" do
    test "show user without notices", %{conn: conn, scope: scope} do
      conn = get(conn, ~p"/admin/users/#{scope.user.id}")

      page_content = html_response(conn, 200)
      assert page_content =~ scope.user.id
      assert page_content =~ scope.user.email
    end
  end
end
