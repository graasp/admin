defmodule Admin.Docs.Page do
  @moduledoc """
  A module that represents a documentation page.
  """

  @enforce_keys [:id, :locale, :section, :title, :body, :description, :tags, :order, :next]
  defstruct [:id, :locale, :section, :title, :body, :description, :tags, :order, :next]

  def build(filename, attrs, body) do
    [_, docs_path] = filename |> Path.rootname() |> String.split("/docs/")
    [locale, section | rest] = docs_path |> Path.split()
    # id is always lowercase
    id = String.downcase(rest |> Path.join())

    [locale, section, id] =
      case locale do
        "" -> [section, "", id]
        _ -> [locale, section, id]
      end

    struct!(
      __MODULE__,
      id: id,
      locale: locale,
      section: section,
      body: body,
      title: attrs[:title] || "",
      body: body,
      description: attrs[:description] || "",
      tags: attrs[:tags] || [],
      order: attrs[:order] || 1000,
      next: attrs[:next] || nil
    )
  end
end
