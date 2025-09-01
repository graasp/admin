defmodule AdminWeb.PublishedItemLive.UnpublishTest do
  use AdminWeb.ConnCase
  import Phoenix.LiveViewTest
  import Admin.PublicationsFixtures

  describe "Unpublish an item" do
    setup :register_and_log_in_user
    setup :create_publication

    test ":validate reason should not be empty", %{conn: conn, published_item: published_item} do
      {:ok, lv, _html} = live(conn, ~p"/published_items/#{published_item}/unpublish")

      assert lv |> render_change(:validate, %{removal_notice: %{reason: ""}}) =~
               "can&#39;t be blank"
    end

    test ":submit reason should not be empty", %{conn: conn, published_item: published_item} do
      {:ok, lv, _html} = live(conn, ~p"/published_items/#{published_item}/unpublish")

      assert lv |> form("#removal_form", removal_notice: %{reason: ""}) |> render_submit() =~
               "can&#39;t be blank"
    end

    test ":submit publication should exist", %{
      conn: conn,
      scope: scope,
      published_item: published_item
    } do
      {:ok, lv, _html} = live(conn, ~p"/published_items/#{published_item}/unpublish")

      # remove publication
      assert Admin.Publications.delete_published_item(scope, published_item)

      # Assert the redirect to main published_items has occured
      assert_redirect(lv, "/published_items")
    end

    test "Should allow to unpublish item with reason", %{
      conn: conn,
      published_item: published_item
    } do
      {:ok, lv, _html} = live(conn, ~p"/published_items/#{published_item}/unpublish")
      reason = "Not appropriate"

      assert {:error, {:live_redirect, _}} =
               lv
               |> form("#removal_form", removal_notice: %{reason: reason})
               |> render_submit()

      # notice should exist
      assert Admin.Repo.get_by(Admin.Publications.RemovalNotice, reason: reason)
      # published item should not exist anymore
      refute Admin.Repo.get(Admin.Publications.PublishedItem, published_item.id)
      # emails as not tested in end to end because it relies on runnign inside the same process.
      # emails are tested at the unit level
    end
  end

  defp create_publication(context) do
    published_item = published_item_fixture(context.scope)
    {:ok, Map.put(context, :published_item, published_item)}
  end
end
