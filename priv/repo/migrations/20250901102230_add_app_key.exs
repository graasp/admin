defmodule Admin.Repo.Migrations.AddAppKey do
  use Ecto.Migration

  def change do
    alter table(:apps) do
      add :key, :binary_id, null: false
    end
  end
end
