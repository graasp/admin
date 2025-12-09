defmodule Admin.Repo.Migrations.LocalizedEmails do
  use Ecto.Migration

  def change do
    rename table(:notifications), :title, to: :name

    alter table(:notifications) do
      remove :message, :string

      add :audience, :string
      add :total_recipients, :integer, default: 0
      add :default_language, :string, null: false, default: "en"
      add :use_strict_languages, :boolean, null: false, default: false
      add :sent_at, :utc_datetime
    end

    create index(:notifications, [:sent_at])

    execute "Update notifications set audience = 'custom' where audience is null", ""

    execute "Update notifications set total_recipients = ARRAY_LENGTH(recipients, 1) where total_recipients is null",
            ""

    alter table(:notifications) do
      modify :audience, :string, null: false, from: {:string, null: true}
      remove :recipients, {:array, :string}
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
