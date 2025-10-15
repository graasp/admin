defmodule Admin.Repo.Migrations.CreateMaintenance do
  use Ecto.Migration

  def change do
    create table(:maintenance, primary_key: false) do
      add :slug, :string, primary_key: true, null: false, max_length: 100
      add :start_at, :utc_datetime, null: false
      add :end_at, :utc_datetime, null: false
    end

    create unique_index(:maintenance, [:slug], name: "UQ_maintenance_slug")
  end
end
