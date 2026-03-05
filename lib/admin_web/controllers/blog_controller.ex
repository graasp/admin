defmodule AdminWeb.BlogController do
  use AdminWeb, :controller

  def index(conn, _params) do
    render(conn, :index,
      posts: Admin.Blog.all_posts(),
      page_title: pgettext("page title", "Blog")
    )
  end

  def show(conn, %{"id" => id}) do
    post = Admin.Blog.get_post_by_id!(id)
    render(conn, :show, post: post, page_title: post.title)
  end

  def atom_feed(conn, _params) do
    recent_posts = Admin.Blog.recent_posts()
    last_build_date = recent_posts |> List.first() |> Map.get(:date)

    # conn =
    #   conn
    #   |> put_resp_content_type("application/atom+xml")

    conn
    |> assign(:entries, recent_posts)
    |> assign(:last_build_date, last_build_date)
    |> assign(:last_build_date, last_build_date)
    |> assign(:page_title, pgettext("page title", "Graasp Blog Atom feed"))
    # set the cache control header to cache the feed for 1 hour
    |> put_resp_header("cache-control", "max-age=3600")
    # set the CORS header to allow public requests from any origin
    |> put_resp_header("access-control-allow-origin", "*")
    |> render(:blog_atom, layout: false)
  end
end
