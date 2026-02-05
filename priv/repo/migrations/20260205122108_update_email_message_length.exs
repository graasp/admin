defmodule Admin.Repo.Migrations.UpdateEmailMessageLength do
  use Ecto.Migration

  def change do
    alter table(:localized_emails) do
      modify :message, :varchar, from: :string
      modify :button_url, :string, size: 2048
    end
  end
end
