defmodule Admin.Repo.Migrations.CreateQuotas do
  use Ecto.Migration

  def change do
    create table(:quotas) do
      add :value, :float
      add :user_id, references(:users, type: :id, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:quotas, [:user_id])
  end
end
