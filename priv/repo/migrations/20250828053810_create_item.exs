defmodule Admin.Repo.Migrations.CreateItem do
  use Ecto.Migration

  def change do
    # TODO: rename table with plural once we are allowed to do so.
    create table(:item) do
      add :name, :string
      add :description, :text
      add :path, :string
      add :extra, :jsonb
      add :type, :string
      add :settings, :jsonb
      # Add the references(:users, type: :id, on_delete: :delete_all)
      add :creator_id, :string

      timestamps(type: :utc_datetime)
    end

    create index(:item, [:creator_id])
    create unique_index(:item, [:path])

    alter table(:published_items) do
      remove :name, :string
      remove :description, :text
    end

    # Remove the old item_path column
    alter table(:published_items) do
      remove :item_path, :string
    end

    # Add the new item_path column with the reference
    alter table(:published_items) do
      add :item_path,
          references(:item,
            column: :path,
            type: :string,
            on_delete: :delete_all,
            on_update: :update_all
          )
    end
  end
end
