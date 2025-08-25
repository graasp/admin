defmodule Admin.Apps.Publisher do
  use Admin.Schema
  import Ecto.Changeset
  alias Admin.Apps

  schema "publishers" do
    field :name, :string
    field :origins, {:array, :string}, default: []

    has_many :apps, Apps.AppInstance

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(publisher, attrs) do
    publisher
    |> cast(attrs, [:name, :origins])
    |> validate_required([:name, :origins])
  end
end
