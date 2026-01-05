defmodule Admin.Repo.Migrations.AddUserNameLanguage do
  use Ecto.Migration

  def change do
    alter table(:admins) do
      add :name, :string
      add :language, :string, default: "en", null: false
    end
  end
end
