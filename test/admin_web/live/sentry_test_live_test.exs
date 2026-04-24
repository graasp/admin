defmodule AdminWeb.SentryLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest

  setup :register_and_log_in_user

  describe "Index" do
    test "view page", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, ~p"/admin/test/sentry")

      assert html =~ "Sentry"
    end
  end
end
