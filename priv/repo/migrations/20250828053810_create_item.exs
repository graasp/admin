defmodule Admin.Repo.Migrations.CreateItem do
  use Ecto.Migration

  def change do
    # TODO: rename table with plural once we are allowed to do so.
    create table(:item) do
      add :name, :string, size: 500, null: false
      add :type, :string, null: false
      add :description, :text
      add :path, :ltree, null: false
      # Add the references(:users, type: :id, on_delete: :delete_all)
      add :creator_id, :binary_id
      timestamps(type: :utc_datetime)
      add :lang, :string, null: false
      add :extra, :jsonb, null: false
      add :settings, :jsonb
      add :deleted_at, :utc_datetime
      add :order, :decimal, precision: 10, scale: 2
    end

    create index(:item, [:creator_id])
    create unique_index(:item, [:path], name: "item_path_key1")
    create index(:item, [:path], name: "IDX_gist_item_path", using: :gist)
    create index(:item, [:deleted_at], name: "IDX_item_deleted_at")

    create index(:item, [:path],
             name: "IDX_gist_item_path_deleted_at",
             using: :gist,
             where: "deleted_at IS NULL"
           )

    alter table(:published_items) do
      remove :name, :string
      remove :description, :text
    end

    # Add the new item_path column with the reference
    alter table(:published_items) do
      add :item_path,
          references(:item,
            column: :path,
            type: :ltree,
            on_delete: :delete_all,
            on_update: :update_all
          )
    end

    # Add the item_id column in removal_notice
    alter table(:removal_notices) do
      add :item_id,
          references(:item,
            column: :id,
            type: :binary_id,
            on_delete: :delete_all,
            on_update: :nothing
          )

      remove :user_id,
             references(:users, type: :binary_id, on_delete: :delete_all)
    end

    create index(:removal_notices, [:item_id])

    # create the recycled_item_data table
    create table(:recycled_item_data) do
      add :item_path,
          references(:item, column: :path, type: :ltree, on_delete: :delete_all),
          null: false

      add :creator_id,
          references(:account, column: :id, type: :binary_id, on_delete: :nilify_all)

      timestamps(updated_at: false, type: :utc_datetime)
    end

    create index(:recycled_item_data, [:item_path],
             name: "IDX_recycled_item_data_item_path",
             using: :gist,
             unique: false
           )

    create index(:recycled_item_data, [:created_at], name: "IDX_recycled_item_data_created_at")

    create table(:item_membership) do
      add :permission, :string
      add :item_path, references(:item, column: :path, type: :ltree, on_delete: :delete_all)
      add :creator_id, references(:account, column: :id, type: :binary_id, on_delete: :nilify_all)

      add :account_id,
          references(:account, column: :id, type: :binary_id, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:item_membership, [:item_path],
             name: "IDX_gist_item_membership_path",
             using: :gist,
             unique: false
           )

    execute(
      """
      CREATE TYPE tag_category_enum AS ENUM (
        'discipline',
        'level',
        'resource-type'
      );
      """,
      "DROP TYPE tag_category_enum;"
    )

    create table(:tag) do
      add :name, :string, size: 255, null: false
      add :category, :tag_category_enum, null: false
    end

    create unique_index(:tag, [:name, :category], name: "UQ_tag_name_category")

    create table(:item_tag, primary_key: false) do
      add :tag_id, references(:tag, type: :uuid, on_delete: :delete_all), null: false
      add :item_id, references(:item, type: :uuid, on_delete: :delete_all), null: false
    end

    create index(:item_tag, [:item_id], name: "IDX_item_tag_item")

    execute(
      "ALTER TABLE item_tag ADD CONSTRAINT \"PK_a04bb2298e37d95233a0c92347e\" PRIMARY KEY (tag_id, item_id);",
      "ALTER TABLE item_tag DROP CONSTRAINT \"PK_a04bb2298e37d95233a0c92347e\";"
    )

    create table(:item_like) do
      add :creator_id,
          references(:account, column: :id, type: :binary_id, on_delete: :delete_all),
          null: false

      add :item_id,
          references(:item, column: :id, type: :binary_id, on_delete: :delete_all),
          null: false

      timestamps(updated_at: false, type: :utc_datetime)
    end

    # TODO: change this name in a later migration
    create unique_index(:item_like, [:creator_id, :item_id], name: "id")
    create index(:item_like, [:item_id], name: "IDX_item_like_item")

    execute(
      """
      CREATE TYPE action_view_enum AS ENUM (
        'unknown',
        'builder',
        'player',
        'library',
        'analytics'
      );
      """,
      "DROP TYPE action_view_enum;"
    )

    create table(:action) do
      add :type, :string, null: false
      add :account_id, references(:account, type: :binary_id, on_delete: :nilify_all)
      add :item_id, references(:item, type: :binary_id, on_delete: :nilify_all)
      add :extra, :jsonb, null: false, default: "{}"
      add :geolocation, :jsonb
      add :view, :action_view_enum, null: false, default: "unknown"

      timestamps(updated_at: false, type: :utc_datetime)
    end

    create index(:action, [:item_id], name: "IDX_1214f6f4d832c402751617361c")
    create index(:action, [:account_id], name: "IDX_action_account_id")
  end
end
