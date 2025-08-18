defmodule Admin.Repo.Migrations.CreateRemovalNotices do
  use Ecto.Migration

  def change do
    create table(:removal_notices) do
      add :reason, :string
      add :user_id, references(:users, type: :binary_id, on_delete: :delete_all)

      timestamps(type: :utc_datetime, updated_at: false)
    end

    create index(:removal_notices, [:user_id])
  end
end
