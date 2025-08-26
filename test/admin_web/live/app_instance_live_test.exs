defmodule AdminWeb.AppInstanceLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest
  import Admin.AppsFixtures

  @create_attrs %{
    name: "some name",
    description: "some description",
    url: "some url",
    thumbnail: "some thumbnail"
  }
  @update_attrs %{
    name: "some updated name",
    description: "some updated description",
    url: "some updated url",
    thumbnail: "some updated thumbnail"
  }
  @invalid_attrs %{name: nil, description: nil, url: nil, thumbnail: nil}

  setup :register_and_log_in_user

  defp create_app_instance(%{scope: _scope}) do
    app_and_publisher = app_instance_fixture()

    %{app_instance: app_and_publisher.app, publisher: app_and_publisher.publisher}
  end

  describe "Index" do
    setup [:create_app_instance]

    test "saves new app_instance", %{conn: conn, publisher: publisher} do
      {:ok, index_live, _html} = live(conn, ~p"/publishers")

      assert {:ok, form_live, _} =
               index_live
               |> element("a", "New App")
               |> render_click()
               |> follow_redirect(conn, ~p"/publishers/#{publisher}/apps/new")

      assert render(form_live) =~ "New App"

      assert form_live
             |> form("#app_instance-form", app_instance: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#app_instance-form", app_instance: @create_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/publishers")

      html = render(index_live)
      assert html =~ "App instance created successfully"
      assert html =~ "some name"
    end

    test "updates app_instance in listing", %{
      conn: conn,
      app_instance: app_instance,
      publisher: publisher
    } do
      {:ok, index_live, _html} = live(conn, ~p"/publishers")

      assert {:ok, form_live, _html} =
               index_live
               |> element("#apps-#{app_instance.id} a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/publishers/#{publisher}/apps/#{app_instance}/edit")

      assert render(form_live) =~ "Edit App instance"

      assert form_live
             |> form("#app_instance-form", app_instance: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#app_instance-form", app_instance: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/publishers")

      html = render(index_live)
      assert html =~ "App instance updated successfully"
      assert html =~ "some updated name"
    end

    @tag :skip
    test "deletes app_instance in listing", %{conn: conn, app_instance: app_instance} do
      {:ok, index_live, _html} = live(conn, ~p"/publishers")

      assert index_live |> element("#apps-#{app_instance.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#apps-#{app_instance.id}")
    end
  end

  describe "Show" do
    setup [:create_app_instance]

    test "displays app_instance", %{conn: conn, app_instance: app_instance} do
      {:ok, _show_live, html} = live(conn, ~p"/apps/#{app_instance}")

      assert html =~ "Show App instance"
      assert html =~ app_instance.name
    end

    test "updates app_instance and returns to show", %{
      conn: conn,
      app_instance: app_instance,
      publisher: publisher
    } do
      {:ok, show_live, _html} = live(conn, ~p"/apps/#{app_instance}")

      assert {:ok, form_live, _} =
               show_live
               |> element("a", "Edit")
               |> render_click()
               |> follow_redirect(
                 conn,
                 ~p"/publishers/#{publisher}/apps/#{app_instance}/edit?return_to=show"
               )

      assert render(form_live) =~ "Edit App instance"

      assert form_live
             |> form("#app_instance-form", app_instance: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, show_live, _html} =
               form_live
               |> form("#app_instance-form", app_instance: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/apps/#{app_instance}")

      html = render(show_live)
      assert html =~ "App instance updated successfully"
      assert html =~ "some updated name"
    end
  end
end
