defmodule Admin.Repo.Migrations.LocalizedEmails do
  use Ecto.Migration

  def change do
    rename table(:notifications), :title, to: :name

    alter table(:notifications) do
      remove :message, :string
      add :audience, :string, null: false
      add :default_language, :string, null: false, default: "en"
    end

    create table(:localized_emails, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :subject, :string, null: false
      add :message, :string, null: false
      add :button_text, :string
      add :button_url, :string
      add :language, :string, null: false
      add :notification_id, references(:notifications, type: :uuid, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end
  end
end
