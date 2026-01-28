defmodule Admin.Blog.Post do
  @moduledoc """
  Module representing a blog post data.
  """

  @enforce_keys [:id, :authors, :title, :body, :description, :tags, :date]
  defstruct [:id, :authors, :title, :body, :description, :tags, :date]

  def build(filename, attrs, body) do
    [year, month_day_id] = filename |> Path.rootname() |> Path.split() |> Enum.take(-2)
    [month, day, id] = String.split(month_day_id, "-", parts: 3)
    date = Date.from_iso8601!("#{year}-#{month}-#{day}")

    # the body contains the short description
    description = String.split(body, "<!-- truncate -->", parts: 2) |> Enum.at(0)
    id = "#{year}-#{month}-#{day}-#{id}"

    struct!(
      __MODULE__,
      id: id,
      date: date,
      body: body,
      title: attrs["title"] || "",
      authors: attrs["authors"] || [],
      description: description,
      tags: attrs["tags"] || []
    )
  end
end
