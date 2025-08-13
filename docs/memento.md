# Memento

This is a compilation of usefull things you would want to do when deploying or administrating this app.

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
