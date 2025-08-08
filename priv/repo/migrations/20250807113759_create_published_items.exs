defmodule Admin.Repo.Migrations.CreatePublishedItems do
  use Ecto.Migration

  def change do
    create table(:published_items) do
      add :creator_id, :integer
      add :item_path, :string
      add :name, :string
      add :description, :string
      add :user_id, references(:users, type: :id, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:published_items, [:user_id])
  end
end
