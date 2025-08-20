defmodule AdminWeb.PublishedItemControllerTest do
  use AdminWeb.ConnCase

  import Admin.PublicationsFixtures

  @create_attrs %{
    name: "some name",
    description: "some description",
    creator_id: 42,
    item_path: "some item_path"
  }
  @update_attrs %{
    name: "some updated name",
    description: "some updated description",
    creator_id: 43,
    item_path: "some updated item_path"
  }
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
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/published_items", published_item: @create_attrs)

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

  describe "update published_item" do
    setup [:create_published_item]

    test "redirects when data is valid", %{conn: conn, published_item: published_item} do
      conn = put(conn, ~p"/published_items/#{published_item}", published_item: @update_attrs)
      assert redirected_to(conn) == ~p"/published_items/#{published_item}"

      conn = get(conn, ~p"/published_items/#{published_item}")
      assert html_response(conn, 200) =~ "some updated item_path"
    end

    test "renders errors when data is invalid", %{conn: conn, published_item: published_item} do
      conn = put(conn, ~p"/published_items/#{published_item}", published_item: @invalid_attrs)
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
