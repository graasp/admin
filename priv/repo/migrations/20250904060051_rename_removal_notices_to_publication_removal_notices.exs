defmodule YourApp.Repo.Migrations.RenameRemovalNoticesToPublicationRemovalNotices do
  use Ecto.Migration

  def up do
    # Rename the table
    rename table(:removal_notices), to: table(:publication_removal_notices)

    # Rename indexes
    execute "ALTER INDEX removal_notices_pkey RENAME TO publication_removal_notices_pkey;"

    execute "ALTER INDEX removal_notices_item_id_index RENAME TO publication_removal_notices_item_id_index;"

    # Rename foreign key constraints
    execute """
    ALTER TABLE publication_removal_notices RENAME CONSTRAINT removal_notices_creator_id_fkey TO publication_removal_notices_creator_id_fkey;
    """

    execute """
    ALTER TABLE publication_removal_notices RENAME CONSTRAINT removal_notices_item_id_fkey TO publication_removal_notices_item_id_fkey;
    """
  end

  def down do
    # Revert foreign key constraint names
    execute """
    ALTER TABLE publication_removal_notices RENAME CONSTRAINT publication_removal_notices_creator_id_fkey TO removal_notices_creator_id_fkey;
    """

    execute """
    ALTER TABLE publication_removal_notices RENAME CONSTRAINT publication_removal_notices_item_id_fkey TO removal_notices_item_id_fkey;
    """

    # Revert index names
    execute "ALTER INDEX publication_removal_notices_pkey RENAME TO removal_notices_pkey;"

    execute "ALTER INDEX publication_removal_notices_item_id_index RENAME TO removal_notices_item_id_index;"

    # Revert table name
    rename table(:publication_removal_notices), to: table(:removal_notices)
  end
end
