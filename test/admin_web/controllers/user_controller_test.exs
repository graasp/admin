defmodule AdminWeb.UserControllerTest do
  use AdminWeb.ConnCase

  import Admin.PublicationsFixtures

  setup :register_and_log_in_user

  describe "show user" do
    test "show user without notices", %{conn: conn, scope: scope} do
      conn = get(conn, ~p"/users/#{scope.user.id}")

      page_content = html_response(conn, 200)
      assert page_content =~ scope.user.id
      assert page_content =~ scope.user.email
      assert page_content =~ "Removal Notices"
      assert page_content =~ "No removal notices for user yet"
    end

    test "show user with notices", %{conn: conn, scope: scope} do
      published_item = published_item_fixture(scope) |> with_creator()
      remove_publication_fixture(scope, published_item)

      conn = get(conn, ~p"/users/#{scope.user.id}")

      page_content = html_response(conn, 200)
      assert page_content =~ scope.user.id
      assert page_content =~ scope.user.email
      assert page_content =~ "Removal Notices"
      assert page_content =~ "some reason"
    end
  end
end
