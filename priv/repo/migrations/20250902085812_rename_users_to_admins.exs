defmodule YourApp.Repo.Migrations.RenameUsersToAdmins do
  use Ecto.Migration

  def up do
    # Rename the table
    rename table(:users), to: table(:admins)

    # Rename the primary key constraint
    execute "ALTER TABLE admins RENAME CONSTRAINT users_pkey TO admins_pkey;"

    # Rename the unique index on email
    execute "ALTER INDEX users_email_index RENAME TO admins_email_index;"
  end

  def down do
    # Revert the table name
    rename table(:admins), to: table(:users)

    # Revert the primary key constraint name
    execute "ALTER TABLE users RENAME CONSTRAINT admins_pkey TO users_pkey;"

    # Revert the unique index name
    execute "ALTER INDEX admins_email_index RENAME TO users_email_index;"
  end
end
