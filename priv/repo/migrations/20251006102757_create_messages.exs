defmodule Admin.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :content, :string
      add :type, :string
      add :conversation_id, references(:conversations, type: :binary_id, on_delete: :delete_all)
      add :user_id, references(:admins, type: :binary_id, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:messages, [:user_id])
  end
end
