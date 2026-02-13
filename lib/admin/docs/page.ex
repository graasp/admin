defmodule Admin.Docs.Page do
  @moduledoc """
  A module that represents a documentation page.
  """

  @enforce_keys [:id, :locale, :section, :title, :body, :description, :tags, :order]
  defstruct [:id, :locale, :section, :title, :body, :description, :tags, :order]

  def build(filename, attrs, body) do
    [locale, section, id] = filename |> Path.rootname() |> Path.split() |> Enum.take(-3)

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
      order: attrs[:order] || 1000
    )
  end
end
