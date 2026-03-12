Postgrex.Types.define(
  Admin.PostgresTypes,
  [EctoLtree.Postgrex.Lquery, EctoLtree.Postgrex.Ltree] ++ Ecto.Adapters.Postgres.extensions()
)
