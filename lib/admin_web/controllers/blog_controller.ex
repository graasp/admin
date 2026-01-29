defmodule AdminWeb.BlogController do
  use AdminWeb, :controller

  def index(conn, _params) do
    render(conn, :index, posts: Admin.Blog.all_posts(), page_title: "Blog")
  end

  def show(conn, %{"id" => id}) do
    post = Admin.Blog.get_post_by_id!(id)
    render(conn, :show, post: post, page_title: post.title)
  end
end
