defmodule Admin.Repo.Migrations.CreateNotifications do
  use Ecto.Migration

  def change do
    create table(:notifications, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string
      add :message, :string
      add :recipients, {:array, :string}

      timestamps(type: :utc_datetime)
    end

    create table(:notification_logs, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :email, :string
      add :status, :string, null: false

      add :notification_id,
          references(:notifications, type: :binary_id, on_delete: :delete_all),
          null: false

      # Only inserted_at, stored as UTC
      timestamps(type: :utc_datetime, updated_at: false)
    end

    # Enforce allowed values at the DB level
    create constraint(:notification_logs, :status_must_be_valid,
             check: "status IN ('sent', 'failed')"
           )

    create index(:notification_logs, [:notification_id])
    create index(:notification_logs, [:email])
  end
end
