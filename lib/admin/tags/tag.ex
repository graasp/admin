defmodule Admin.Tags.Tag do
  use Admin.Schema

  schema "tag" do
    field :name, :string
    field :category, :string
  end
end
