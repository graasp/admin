defmodule Admin.Blog do
  @moduledoc """
  Module for managing blog posts.
  """

  alias Admin.Blog.Post

  defmodule Parser do
    @moduledoc """
    A specific parser for the the blog properties to support yaml frontmatter
    """

    def parse(_path, contents) do
      [attrs, body] = :binary.split(contents, ["\n---\n"])
      {:ok, parsed_attrs} = YamlElixir.read_from_string(attrs)

      {parsed_attrs, body}
    end
  end

  use NimblePublisher,
    build: Post,
    from: Application.app_dir(:admin, "priv/blog/**/*.md"),
    as: :posts,
    parser: Admin.Blog.Parser

  # The @posts variable is first defined by NimblePublisher.
  # Let's further modify it by sorting all posts by descending date.
  @posts Enum.sort_by(@posts, & &1.date, {:desc, Date})

  # Let's also get all tags
  @tags @posts |> Enum.flat_map(& &1.tags) |> Enum.uniq() |> Enum.sort()

  # And finally export them
  def all_posts, do: @posts
  def all_tags, do: @tags

  def posts_by_year do
    Enum.group_by(@posts, & &1.date.year) |> Enum.sort_by(&elem(&1, 0), :desc)
  end

  def get_post_by_id!(id) do
    Enum.find(@posts, &(&1.id == id)) ||
      raise AdminWeb.NotFoundError, "post with id=#{id} not found"
  end
end

defmodule AdminWeb.NotFoundError do
  defexception [:message, plug_status: 404]
end
