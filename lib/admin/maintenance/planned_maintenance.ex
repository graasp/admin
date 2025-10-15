defmodule Admin.Maintenance.PlannedMaintenance do
  # use the Ecto schema so it does not conflict with the default id parameter set by the Admin schema
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:slug, :string, []}
  @derive {Phoenix.Param, key: :slug}
  schema "maintenance" do
    field :start_at, :utc_datetime
    field :end_at, :utc_datetime
  end

  @doc false
  def changeset(planned_maintenance, attrs) do
    planned_maintenance
    |> cast(attrs, [:slug, :start_at, :end_at])
    |> validate_required([:slug, :start_at, :end_at])
    |> validate_length(:slug, max: 100)
    |> unique_constraint(:slug, name: "UQ_maintenance_slug")
  end
end
