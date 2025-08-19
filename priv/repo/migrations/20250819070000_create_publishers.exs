defmodule Admin.Repo.Migrations.CreatePublishers do
  use Ecto.Migration

  def change do
    create table(:publishers, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :origins, {:array, :string}

      timestamps(type: :utc_datetime)
    end

    create index(:publishers, [:user_id])
  end
end
