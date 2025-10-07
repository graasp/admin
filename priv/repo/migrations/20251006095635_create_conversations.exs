defmodule Admin.Repo.Migrations.CreateConversations do
  use Ecto.Migration

  def change do
    create table(:conversations) do
      add :assistant_id, references(:assistants, type: :binary_id, on_delete: :nilify_all)
      add :user_id, references(:admins, type: :binary_id, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:conversations, [:user_id])
    create index(:conversations, [:assistant_id, :user_id])
  end
end
