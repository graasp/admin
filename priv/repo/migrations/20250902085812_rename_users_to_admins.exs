defmodule Admin.Repo.Migrations.RenameUsersToAdmins do
  use Ecto.Migration

  def change do
    rename table("users"), to: table("admins")
  end
end
