defmodule Admin.Repo.Migrations.CreateAssistants do
  @moduledoc """
  This migration creates the smart assistants table.
  """
  use Ecto.Migration

  def change do
    create table(:assistants) do
      add :name, :string, null: false
      add :prompt, :string, null: false
      add :shared_at, :utc_datetime
      add :picture, :string
      add :user_id, references(:admins, type: :binary_id, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:assistants, [:user_id])
  end
end
