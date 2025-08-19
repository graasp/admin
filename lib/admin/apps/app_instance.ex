defmodule Admin.Apps.AppInstance do
  use Ecto.Schema
  import Ecto.Changeset
  alias Admin.Apps

  schema "apps" do
    field :name, :string
    field :description, :string
    field :url, :string
    field :thumbnail, :string

    # add publisher relationship
    belongs_to :publisher, Apps.Publisher

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(app_instance, attrs) do
    app_instance
    |> cast(attrs, [:name, :description, :url])
    |> validate_required([:name, :description, :url])
  end
end
