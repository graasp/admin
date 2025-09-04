defmodule YourApp.Repo.Migrations.RenameUsersToAdmins do
  use Ecto.Migration

  def up do
    # Rename the table
    rename table(:users), to: table(:admins)

    # Rename the primary key constraint
    execute "ALTER TABLE admins RENAME CONSTRAINT users_pkey TO admins_pkey;"
    execute "ALTER INDEX users_email_index RENAME TO admins_email_index;"

    rename table(:users_tokens), to: table(:admins_tokens)

    execute "ALTER INDEX users_tokens_context_token_index RENAME TO admins_tokens_context_token_index;"
    execute "ALTER INDEX users_tokens_user_id_index RENAME TO admins_tokens_user_id_index;"
    execute "ALTER TABLE admins_tokens RENAME CONSTRAINT users_tokens_pkey TO admins_tokens_pkey;"

    execute "ALTER TABLE admins_tokens RENAME CONSTRAINT users_tokens_user_id_users_id_fk TO admins_tokens_user_id_admins_id_fk;"
  end

  def down do
    # Revert the table name
    rename table(:admins), to: table(:users)

    # Revert the primary key constraint name
    execute "ALTER TABLE users RENAME CONSTRAINT admins_pkey TO users_pkey;"

    # Revert the unique index name
    execute "ALTER INDEX admins_email_index RENAME TO users_email_index;"

    rename table(:admins_tokens), to: table(:users_tokens)

    execute "ALTER INDEX admins_tokens_context_token_index RENAME TO users_tokens_context_token_index;"
    execute "ALTER INDEX admins_tokens_user_id_index RENAME TO users_tokens_user_id_index;"
    execute "ALTER TABLE users_tokens RENAME CONSTRAINT admins_tokens_pkey TO users_tokens_pkey;"

    execute "ALTER TABLE users_tokens RENAME CONSTRAINT admins_tokens_user_id_admins_id_fk TO users_tokens_user_id_users_id_fk;"
  end
end
