defmodule AdminWeb.BlogController do
  use AdminWeb, :controller

  def index(conn, _params) do
    render(conn, :index, posts: Admin.Blog.all_posts())
  end

  def show(conn, %{"id" => id}) do
    render(conn, :show, post: Admin.Blog.get_post_by_id!(id))
  end
end
