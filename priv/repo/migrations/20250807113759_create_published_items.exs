defmodule Admin.Repo.Migrations.CreatePublishedItems do
  use Ecto.Migration

  def change do
    create table(:published_items, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :description, :text
      add :item_path, :string
      add :creator_id, references(:account, type: :binary_id, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:published_items, [:creator_id])
  end
end
