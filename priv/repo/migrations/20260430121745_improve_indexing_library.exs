defmodule Admin.Repo.Migrations.ImproveIndexingLibrary do
  use Ecto.Migration

  @disable_ddl_transaction true
  @disable_migration_lock true

  def change do
    execute(
      """
      CREATE INDEX CONCURRENTLY idx_item_creator_not_deleted_path
      ON item (creator_id, path)
      WHERE deleted_at IS NULL;
      """,
      "DROP INDEX CONCURRENTLY idx_item_creator_not_deleted_path;"
    )

    execute(
      """
      CREATE INDEX CONCURRENTLY idx_item_path_not_deleted
      ON item (path)
      WHERE deleted_at IS NULL;
      """,
      "DROP INDEX CONCURRENTLY idx_item_path_not_deleted;"
    )
  end
end
