defmodule AdminWeb.QuotaLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest
  import Admin.StorageQuotaFixtures

  @create_attrs %{value: 120.5}
  @update_attrs %{value: 456.7}
  @invalid_attrs %{value: nil}

  setup :register_and_log_in_user

  defp create_quota(%{scope: scope}) do
    quota = quota_fixture(scope)

    %{quota: quota}
  end

  describe "Index" do
    setup [:create_quota]

    test "lists all quotas", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, ~p"/quotas")

      assert html =~ "Listing Quotas"
    end

    test "saves new quota", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/quotas")

      assert {:ok, form_live, _} =
               index_live
               |> element("a", "New Quota")
               |> render_click()
               |> follow_redirect(conn, ~p"/quotas/new")

      assert render(form_live) =~ "New Quota"

      assert form_live
             |> form("#quota-form", quota: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#quota-form", quota: @create_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/quotas")

      html = render(index_live)
      assert html =~ "Quota created successfully"
    end

    test "updates quota in listing", %{conn: conn, quota: quota} do
      {:ok, index_live, _html} = live(conn, ~p"/quotas")

      assert {:ok, form_live, _html} =
               index_live
               |> element("#quotas-#{quota.id} a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/quotas/#{quota}/edit")

      assert render(form_live) =~ "Edit Quota"

      assert form_live
             |> form("#quota-form", quota: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#quota-form", quota: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/quotas")

      html = render(index_live)
      assert html =~ "Quota updated successfully"
    end

    test "deletes quota in listing", %{conn: conn, quota: quota} do
      {:ok, index_live, _html} = live(conn, ~p"/quotas")

      assert index_live |> element("#quotas-#{quota.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#quotas-#{quota.id}")
    end
  end

  describe "Show" do
    setup [:create_quota]

    test "displays quota", %{conn: conn, quota: quota} do
      {:ok, _show_live, html} = live(conn, ~p"/quotas/#{quota}")

      assert html =~ "Show Quota"
    end

    test "updates quota and returns to show", %{conn: conn, quota: quota} do
      {:ok, show_live, _html} = live(conn, ~p"/quotas/#{quota}")

      assert {:ok, form_live, _} =
               show_live
               |> element("a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/quotas/#{quota}/edit?return_to=show")

      assert render(form_live) =~ "Edit Quota"

      assert form_live
             |> form("#quota-form", quota: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, show_live, _html} =
               form_live
               |> form("#quota-form", quota: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/quotas/#{quota}")

      html = render(show_live)
      assert html =~ "Quota updated successfully"
    end
  end
end
