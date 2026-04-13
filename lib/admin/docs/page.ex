defmodule Admin.Docs.Page do
  @moduledoc """
  A module that represents a documentation page.
  """

  @enforce_keys [:id, :locale, :section, :title, :body, :description, :tags, :order, :next]
  defstruct [:id, :locale, :section, :title, :body, :description, :tags, :order, :next]

  def build(filename, attrs, body) do
    [_, docs_path] = filename |> Path.rootname() |> String.split("/docs/")
    [locale, section | rest] = docs_path |> Path.split()

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
      locale: locale,
      section: section,
      body: body,
      title: attrs[:title] || "",
      description: attrs[:description] || "",
      tags: attrs[:tags] || [],
      order: attrs[:order] || 1000,
      next: attrs[:next] || nil
    )
  end
end
