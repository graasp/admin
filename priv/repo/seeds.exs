# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Admin.Repo.insert!(%Admin.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Admin.Accounts.User
Admin.Repo.insert!(%User{email: "admin#{System.unique_integer([:positive])}@graasp.org"})

publications =
  Enum.map(1..30, fn i ->
    %Admin.Publications.PublishedItem{
      name: "test #{i}",
      description: "Description for publication #{i}",
      item_path: "a",
      creator_id: 123
    }
  end)

Enum.map(publications, fn p -> Admin.Repo.insert!(p) end)
