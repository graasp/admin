defmodule Admin.Repo.Migrations.AddPixelInMailing do
  use Ecto.Migration

  def change do
    create table(:notification_pixels, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :slug, :string, null: false
      add :name, :string, null: false

      add :notification_id, references(:notifications, type: :uuid, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create unique_index(:notification_pixels, [:slug])
  end
end
