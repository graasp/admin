defmodule Admin.Repo.Migrations.UpdatePublicationCreator do
  use Ecto.Migration

  def up do
    alter table(:published_items) do
      remove :creator_id, references(:admins, type: :binary_id, on_delete: :delete_all),
        null: false

      add :creator_id, references(:account, type: :binary_id, on_delete: :delete_all), null: false
    end
  end

  def down do
    alter table(:published_items) do
      remove :creator_id, references(:account, type: :binary_id, on_delete: :delete_all),
        null: false

      add :creator_id, references(:admins, type: :binary_id, on_delete: :delete_all), null: false
    end
  end
end
