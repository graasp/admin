defmodule Admin.Maintenance.PlannedMaintenance do
  @moduledoc """
  This module represents a maintenance event.

  Maintenance events are identified by their `slug` property.
  They have a `start_at` and an `end_at` date represented in ISO8601 format.
  The `start_at` date should be before the `end_at` date.
  The slugs are unique and can be a maxium of 100 chars long.
  """

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
    # validate that end_At is after start_at
    |> validate_ordered_dates(:start_at, :end_at)
    |> unique_constraint(:slug, name: "UQ_maintenance_slug")
  end

  defp validate_ordered_dates(changeset, reference_field, validated_field) do
    reference_value = get_field(changeset, reference_field)

    changeset =
      validate_change(changeset, validated_field, fn _, validated_value ->
        if validated_value < reference_value do
          [{validated_field, "must be after #{reference_field}"}]
        else
          []
        end
      end)

    changeset
  end
end
