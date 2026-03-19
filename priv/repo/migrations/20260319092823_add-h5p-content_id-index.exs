defmodule Admin.Repo.Migrations.AddH5pContentIdIndex do
  use Ecto.Migration

  @disable_ddl_transaction true
  @disable_migration_lock true

  def change do
    # this helps with the h5p integrity checks when we want to query an h5p item by its contentId
    create index(:item, [:type, "(extra -> 'h5p' ->> 'contentId')"],
             concurrently: true,
             name: :idx_item_type_h5p_contentid,
             using: :btree
           )
  end
end
