defmodule Admin.Tags.Tag do
  @moduledoc """
  A module that defines the Tag schema for the Admin application.
  """
  use Admin.Schema

  schema "tag" do
    field :name, :string
    field :category, :string
  end
end
