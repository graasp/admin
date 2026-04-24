defmodule AdminWeb.TrashLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest

  setup :register_and_log_in_user

  describe "Index" do
    test "view page", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, ~p"/admin/trash")

      assert html =~ "Recycled items Statistics"
    end

    test "trigger cleanup", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/admin/trash")
      index_live |> render_click("run_cleanup")
    end
  end
end
