defmodule Admin.Repo.Migrations.ImproveFileIndex do
  use Ecto.Migration

  @disable_ddl_transaction true
  @disable_migration_lock true
  def change do
    execute(
      "CREATE INDEX CONCURRENTLY idx_item_type_created_at ON item(type, created_at DESC);",
      "DROP INDEX CONCURRENTLY idx_item_type_created_at;"
    )
  end
end
