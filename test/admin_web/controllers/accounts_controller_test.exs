defmodule AdminWeb.AccountsControllerTest do
  use AdminWeb.ConnCase, async: true

  import Admin.AccountsFixtures

  defp create_member(%{conn: conn}) do
    member = member_fixture()
    %{member: member, conn: conn}
  end

  describe "email subscriptions" do
    setup :create_member

    test "GET /accounts/:account_id/marketing/unsubscribe", %{conn: conn, member: member} do
      conn = get(conn, ~p"/accounts/#{member.id}/marketing/unsubscribe")
      assert html_response(conn, 200) =~ "Marketing"
    end

    test "GET /accounts/:account_id/marketing/subscribe", %{conn: conn, member: member} do
      conn = get(conn, ~p"/accounts/#{member.id}/marketing/subscribe")
      assert html_response(conn, 200) =~ "Marketing"
    end
  end
end
