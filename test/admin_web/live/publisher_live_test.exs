defmodule AdminWeb.PublisherLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest
  import Admin.AppsFixtures

  @create_attrs %{name: "some name", origins: ["option1", "option2"]}
  @update_attrs %{name: "some updated name", origins: ["option1"]}
  @invalid_attrs %{name: nil, origins: []}

  setup :register_and_log_in_user

  defp create_publisher(%{scope: _scope}) do
    publisher = publisher_fixture()

    %{publisher: publisher}
  end

  describe "Index" do
    setup [:create_publisher]

    test "lists all publishers", %{conn: conn, publisher: publisher} do
      {:ok, _index_live, html} = live(conn, ~p"/publishers")

      assert html =~ "Listing Publishers"
      assert html =~ publisher.name
    end

    test "saves new publisher", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/publishers")

      assert {:ok, form_live, _} =
               index_live
               |> element("a", "New Publisher")
               |> render_click()
               |> follow_redirect(conn, ~p"/publishers/new")

      assert render(form_live) =~ "New Publisher"

      assert form_live
             |> form("#publisher-form", publisher: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#publisher-form", publisher: @create_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/publishers")

      html = render(index_live)
      assert html =~ "Publisher created successfully"
      assert html =~ "some name"
    end

    @tag :skip
    test "updates publisher in listing", %{conn: conn, publisher: publisher} do
      {:ok, index_live, _html} = live(conn, ~p"/publishers")

      assert {:ok, form_live, _html} =
               index_live
               |> element("#publishers-#{publisher.id} a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/publishers/#{publisher}/edit")

      assert render(form_live) =~ "Edit Publisher"

      assert form_live
             |> form("#publisher-form", publisher: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#publisher-form", publisher: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/publishers")

      html = render(index_live)
      assert html =~ "Publisher updated successfully"
      assert html =~ "some updated name"
    end
  end

  describe "Show" do
    setup [:create_publisher]

    test "displays publisher", %{conn: conn, publisher: publisher} do
      {:ok, _show_live, html} = live(conn, ~p"/publishers/#{publisher}")

      assert html =~ "Show Publisher"
      assert html =~ publisher.name
    end

    test "updates publisher and returns to show", %{conn: conn, publisher: publisher} do
      {:ok, show_live, _html} = live(conn, ~p"/publishers/#{publisher}")

      assert {:ok, form_live, _} =
               show_live
               |> element("a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/publishers/#{publisher}/edit?return_to=show")

      assert render(form_live) =~ "Edit Publisher"

      assert form_live
             |> form("#publisher-form", publisher: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, show_live, _html} =
               form_live
               |> form("#publisher-form", publisher: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/publishers/#{publisher}")

      html = render(show_live)
      assert html =~ "Publisher updated successfully"
      assert html =~ "some updated name"
    end
  end
end
