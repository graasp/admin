defmodule Admin.TextTransforms do
  @moduledoc """
  Provides text transformation functions.
  """

  def slugify(text) do
    text
    # make everything lowercase
    |> String.downcase()
    # remove non-word characters (keep spaces and dashes)
    |> String.replace(~r/[^\w\s-]/, "")
    # replace spaces with dashes
    |> String.replace(~r/\s+/, "-")
  end
end
