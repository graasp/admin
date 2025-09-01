defmodule AdminWeb.PublishedItemControllerTest do
  use AdminWeb.ConnCase

  import Admin.PublicationsFixtures
  import Admin.ItemsFixtures, only: [item_fixture: 1]

  @invalid_attrs %{name: nil, description: nil, creator_id: nil, item_path: nil}

  setup :register_and_log_in_user

  describe "index" do
    test "lists all published_items", %{conn: conn} do
      conn = get(conn, ~p"/published_items")
      assert html_response(conn, 200) =~ "Published items"
    end
  end

  describe "new published_item" do
    test "renders form", %{conn: conn} do
      conn = get(conn, ~p"/published_items/new")
      assert html_response(conn, 200) =~ "New Published item"
    end
  end

  describe "create published_item" do
    test "redirects to show when data is valid", %{conn: conn, scope: scope} do
      item = item_fixture(scope)

      create_attrs = %{
        name: "some name",
        description: "some description",
        creator_id: item.creator_id,
        item_path: item.path
      }

      conn = post(conn, ~p"/published_items", published_item: create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == ~p"/published_items/#{id}"

      conn = get(conn, ~p"/published_items/#{id}")
      assert html_response(conn, 200) =~ "Published item #{id}"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/published_items", published_item: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Published item"
    end
  end

  describe "edit published_item" do
    setup [:create_published_item]

    test "renders form for editing chosen published_item", %{
      conn: conn,
      published_item: published_item
    } do
      conn = get(conn, ~p"/published_items/#{published_item}/edit")
      assert html_response(conn, 200) =~ "Edit Published item"
    end
  end

  describe "delete published_item" do
    setup [:create_published_item]

    test "deletes chosen published_item", %{conn: conn, published_item: published_item} do
      conn = delete(conn, ~p"/published_items/#{published_item}")
      assert redirected_to(conn) == ~p"/published_items"

      assert_error_sent 404, fn ->
        get(conn, ~p"/published_items/#{published_item}")
      end
    end
  end

  describe "published item does not exist" do
    test "Invalid UUID for publication", %{conn: conn} do
      conn =
        post(conn, ~p"/published_items/search", %{published_item_search_form: %{item_id: "toto"}})

      assert html_response(conn, 200) =~ "is not a valid UUID"
    end

    test "Publication does not exist", %{conn: conn} do
      item_id = "00000000-0000-4000-a000-000000000000"

      conn =
        post(conn, ~p"/published_items/search", %{published_item_search_form: %{item_id: item_id}})

      assert html_response(conn, 200) =~
               "Publication with id &#39;#{item_id}&#39; could not be found"
    end
  end

  describe "published item exists" do
    setup [:create_published_item]

    test "publication can be searched and displayed", %{
      conn: conn,
      published_item: published_item
    } do
      item_id = published_item.id

      conn =
        post(conn, ~p"/published_items/search", %{
          published_item_search_form: %{item_id: "#{item_id}"}
        })

      assert redirected_to(conn) == ~p"/published_items/#{item_id}"
    end
  end

  defp create_published_item(%{scope: scope}) do
    published_item = published_item_fixture(scope)

    %{published_item: published_item}
  end
end
