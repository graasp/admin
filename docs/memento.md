# Memento

This is a compilation of useful things you would want to do when deploying or administrating this app.

## Run the development server

To run the development server:

```sh
mix phx.server
```

This will run the app and hot-reload when you change the code.

You can also start the app in IEX with `iex -S mix phx.server` which gives you the option to interact with the app in the interactive shell.

This is useful to inspect, debug and view the running code while still benefiting from hot code swapping.

## Running the migrations

To run the migrations:

```sh
mix ecto.migrate
```

This will run pending migrations.

## Reset the database

To reset the database:

```sh
mix ecto.reset
```

This will drop the database, create it again and run the migrations.

For the tests:

```sh
MIX_ENV=test mix ecto.reset
```

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

To run tests with coveralls:

```sh
# runs the tests with coveralls and generates the coverage report in HTML format
mix coveralls.html

# opens the coverage report in the browser
open cover/excoveralls.html
```

## Interacting with a deployed application

## Follow the logs of the app

Use the AWS Logs with the `tail` option to follow logs of the application:
(Add you profile name if you are using profiles for different environments)

```sh
aws logs tail "/ecs/admin" --follow
```

<details>
    <summary>Deprecated Kamal instructions</summary>

To follow the logs of the server live:

```sh
kamal app logs -f
# or using the defined alias
kamal logs
```

To see logs since a period of time:

```sh
# see the logs for the last 5 minutes
kamal app logs -s 5m
```

</details>

## Open an IEX session live on the server

Use the ECS Exec command to open an IEX session live on the server:

```sh
aws ecs execute-command --cluster graasp-dev --task $(aws ecs list-tasks --cluster graasp-dev --query 'taskArns[0]' --output text) --container admin --command "/app/bin/admin remote" --interactive
```

<details>
    <summary>Deprecated Kamal instructions</summary>

You can open an IEX session live on the server with:

```sh
kamal app exec --interactive --reuse "/app/bin/admin remote"
# or using the alias
kamal console
```

</details>

## Running the migrations

Currently, the migrations are run on the drizzle side. The admin project does not run its own migrations. Instead we insert the row to make the app think that the migrations have been run. We need to ensure that the migrations are in sync between the admin and the core project.

<details>
    <summary>Deprecated Kamal instructions</summary>

You can run the migrations using the provided release script:

```sh
kamal app exec --interactive --reuse "/app/bin/migrate"
# or with the defined alias
kamal migrate
```

It is also possible to run the migrations automatically by defining a docker-entrypoint file that executes the migration script. This is dscribed in more details in [this article](https://blog.appsignal.com/2025/06/10/deploying-phoenix-applications-with-kamal.html#automating-database-migrations-with-kamal)

</details>
