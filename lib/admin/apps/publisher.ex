defmodule Admin.Apps.Publisher do
  use Admin.Schema
  import Ecto.Changeset
  alias Admin.Validators
  alias Admin.Apps

  schema "publishers" do
    field :name, :string
    field :origins, {:array, :string}, default: [""]

    has_many :apps, Apps.AppInstance

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(publisher, attrs) do
    publisher
    |> cast(attrs, [:name, :origins], empty_values: [[], nil] ++ Ecto.Changeset.empty_values())
    |> validate_required([:name, :origins])
    |> validate_length(:origins, min: 1)
    |> Validators.validate_urls_array(:origins)
  end
end
