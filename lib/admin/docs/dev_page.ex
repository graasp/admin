defmodule Admin.Docs.DevPage do
  @moduledoc """
  A module that represents a developer documentation page.
  """

  @enforce_keys [:id, :section, :title, :body, :description, :tags, :order]
  defstruct [:id, :section, :title, :body, :description, :tags, :order]

  def build(filename, attrs, body) do
    [_, docs_path] = filename |> Path.rootname() |> String.split("/priv/")
    [_, section | rest] = docs_path |> Path.split()

    [section, id] =
      case rest do
        [] -> ["", section]
        _ -> [section, rest |> Path.join()]
      end

    # id is always lowercase
    id = String.downcase(id)

    struct!(
      __MODULE__,
      id: id,
      section: section,
      body: body,
      title: attrs[:title] || "",
      description: attrs[:description] || "",
      tags: attrs[:tags] || [],
      order: attrs[:order] || 1000
    )
  end
end
