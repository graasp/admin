defmodule Admin.BlogTest do
  use ExUnit.Case, async: true

  alias Admin.Blog
  alias Admin.Blog.Parser
  alias Admin.Blog.Post

  describe "blog parser" do
    test "parses yaml frontmatter" do
      content = """
      ---
      title: hello
      other:
        - hey
        - you
      ---

      This is the blog content
      """

      assert {%{"other" => ["hey", "you"], "title" => "hello"}, "\nThis is the blog content\n"} =
               Parser.parse("somepath", content)
    end

    test "raises if missing the delimiter" do
      content = """
      title: hello
      other:
        - hey
        - you

      This is the blog content
      """

      assert_raise MatchError, fn ->
        Parser.parse("somepath", content)
      end
    end

    test "raises if not yaml frontmatter the delimiter" do
      content = """
      %{
        title: "hello"
        other: ["hey", "you"]
      }
      ---

      This is the blog content
      """

      assert_raise MatchError, fn ->
        Parser.parse("somepath", content)
      end
    end

    test "no content is ok" do
      content = """
      title: hello
      other:
        - hey
        - you
      ---
      """

      assert {%{"other" => ["hey", "you"], "title" => "hello"}, ""} =
               Parser.parse("somepath", content)
    end
  end

  describe "blog posts" do
    test "can get all posts" do
      assert Blog.all_posts()
    end

    test "can get a post by id" do
      assert Blog.get_post_by_id!("2026-01-19-production-release")
    end

    test "post that does not exist raises" do
      assert_raise AdminWeb.NotFoundError, fn ->
        Blog.get_post_by_id!("nonexistent-post-id")
      end
    end

    test "posts by year" do
      assert posts = Blog.posts_by_year()
      assert posts |> Enum.find(fn {year, posts_for_year} -> year == 2026 end)
    end
  end

  describe "blog post" do
    test "can build a blog post struct" do
      assert %Post{
               id: "2026-01-01-my-post-id",
               title: "hello",
               date: ~D[2026-01-01],
               tags: [],
               authors: ["hey", "you"],
               body: "Content"
             } =
               Post.build(
                 "2026/01-01-my-post-id",
                 %{
                   "title" => "hello",
                   "authors" => ["hey", "you"]
                 },
                 "Content"
               )
    end

    test "parses the description from the content" do
      content = """
      This is the description of the post.

      <!-- truncate -->

      This is the rest of the post.
      """

      assert %Post{
               id: "2026-01-01-my-post-id",
               title: "hello",
               date: ~D[2026-01-01],
               tags: [],
               description: "This is the description of the post.\n\n",
               authors: ["hey", "you"],
               body: ^content
             } =
               Post.build(
                 "2026/01-01-my-post-id",
                 %{
                   "title" => "hello",
                   "authors" => ["hey", "you"]
                 },
                 content
               )
    end
  end
end
