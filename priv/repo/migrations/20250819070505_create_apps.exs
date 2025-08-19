defmodule Admin.Repo.Migrations.CreateApps do
  use Ecto.Migration

  def change do
    create table(:apps, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :description, :string
      add :url, :string
      add :thumbnail, :string
      add :publisher_id, references(:publisher, type: :binary_id, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:apps, [:publisher_id])
  end
end
