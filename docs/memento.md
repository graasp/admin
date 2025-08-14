# Memento

This is a compilation of usefull things you would want to do when deploying or administrating this app.

## Run the development server

To run the development server:

```sh
mix phx.server
```

This will run the app and hot-reload when you change the code.

You can also start the app in IEX with `iex -S mix phx.server` which gives you the option to interact with the app in the interactive shell.

This is usefull to inspect, debug and view the running code while still benefiting from hot code swapping.

## Running the migrations

To run the migrations:

```sh
mix ecto.migrate
```

This will run pending migrations

## Rollback migrations

To rollback a migration:

```sh
mix ecto.rollback
```

## Getting help on a `mix` command

To get the help for a mix command:

```sh
mix help <command>
# for example to see the options for `mix ecto.migrate`
mix help ecto.migrate
```

## Running tests

To run the tests:

```sh
mix test
```

To run tests with coverage

```sh
mix test --cover
```

## Follow the logs of the app

To follow the logs of the server live:

```sh
kamal app logs -f
# or using the defined alias
kamal logs
```

To see logs since a periode of time:

```sh
# see the logs for the last 5 minutes
kamal app logs -s 5m
```

## Open an IEX session live on the server

You can open an IEX session live on the server with:

```sh
kamal app exec --interactive --reuse "/app/bin/admin remote"
# or using the alias
kamal console
```

## Running the migrations

You can run the migrations using the provided release script:

```sh
kamal app exec --interactive --reuse "/app/bin/migrate"
# or with the defined alias
kamal migrate
```

It is also possible to run the migrations automatically by defining a docker-entrypoint file that executes the migration script. This is dscribed in more details in [this article](https://blog.appsignal.com/2025/06/10/deploying-phoenix-applications-with-kamal.html#automating-database-migrations-with-kamal)
