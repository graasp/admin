defmodule Admin.StaticPages.Page do
  @moduledoc """
  Module representing a static page data.
  """

  @enforce_keys [:id, :locale, :title, :body, :description]
  defstruct [:id, :locale, :title, :body, :description]

  def build(filename, attrs, body) do
    [locale, id] = filename |> Path.rootname() |> Path.split() |> Enum.take(-2)

    struct!(
      __MODULE__,
      id: id,
      locale: locale,
      body: body,
      title: attrs[:title] || "",
      description: attrs[:description] || ""
    )
  end
end
