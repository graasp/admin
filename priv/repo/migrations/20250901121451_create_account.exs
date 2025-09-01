defmodule Admin.Repo.Migrations.CreateAccount do
  use Ecto.Migration

  def change do
    create table(:account) do
      add :name, :string, null: false, size: 100
      add :email, :citext, null: false
      add :type, :string, values: [:individual, :guest], null: false, default: "individual"

      timestamps(type: :utc_datetime)
    end
  end
end
