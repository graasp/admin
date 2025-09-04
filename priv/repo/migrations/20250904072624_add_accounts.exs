defmodule Admin.Repo.Migrations.AddAccounts do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      add :email, :string
      add :type, :string

      timestamps(type: :utc_datetime)
    end

    create unique_index(:accounts, [:email], name: "member_email_key1")
  end
end
