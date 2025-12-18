# Graasp Admin

This is the codebase for the Graasp admin platform written in [Elixir](https://elixir-lang.org/) using [the Phoenix web framework](https://phoenixframework.org).

The admin platform enables administrators to:

- manage publications
- send messages to target audiences
- manage interactive applications
- perform operational tasks (re-indexation, ...)
- explore analytics data

## Required tools

This project uses [mise](https://mise.jdx.dev/) for tasks and tool versions.
Install mise from [the instructions](https://mise.jdx.dev/getting-started.html)

Install all dependencies with (installs `elixir` and `erlang`):

```sh
mise i
```

As of writing this, the following versions are used:

- elixir: 1.19.4
- erlang: 28 (OTP 28)

<details>
    <summary>Installing Elixir with brew (not recommended)</summary>

### Elixir

You will need Elixir and OTP installed.
On MacOS simply run: `brew install elixir`
For installation instructions refer to the [elixir installation guide](https://hexdocs.pm/phoenix/1.8.0/installation.html)

You can test you installation by running `elixir -v`. It should output something like:

```txt
Erlang/OTP 28 [erts-16.0.2] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [jit] [dtrace]

Elixir 1.18.4 (compiled with Erlang/OTP 27)
```

Also install `elixir-ls` (one of) the Elixir Language server. With brew:

```sh
brew install elixir-ls
```

</details>

### PostgreSQL

The admin platform uses the same database as the core platform.

We recommend that you use the database provided by the devcontainer for the graasp/core project when running the admin.

For tests and in case you would only need access to things that the admin does (nothing related to graasp) you would be fine using a local postgres instance for example via a docker container, or with an app such as [Postgres.app](https://postgresapp.com/) on MacOS.

#### Devcontainer database

You want to use all features of graasp and have an install of the core project running in the devcotnainer.
In this case, you should have a the user `graasper` owning the `graasp` database accessible on `localhost:5432` from the host machine.
Ensure this postgres is running when running the admin.

You should ensure that the migrations from the core project are applied. After that run the admin-specific migrations with: `mix ecto.migrate`.

#### Local database docker

In case you do not want to use the devcontainer, you can use the following command to start a postgresql server in a docker container.

```sh
docker run -d -p 5432:5432 \
              -e POSTGRES_USER=graasper \
              -e POSTGRES_DB=graasp \
              -e POSTGRES_PASSWORD="graasper" \
              --name postgres postgres:17.5-alpine
```

#### Local database (gui client)

You can also use a graphical client like [Postgres.app](https://postgresapp.com/) on MacOS.

## Getting Started

0. Ensure you have Elixir installed (`elixir -v` should show you the version)
1. Install project dependencies with: `mix deps.get`
2. Compile the project with: `mix compile`
3. Run the migrations with: `mix ecto.migrate`
4. Create a env.sh
5. Create a `.env.sh` file with the following content. Use the values you get from configuring garage in the core project:
   ```sh
   # .env.sh
   export AWS_ACCESS_KEY_ID=GK3b...
   export AWS_SECRET_ACCESS_KEY=a03cf77e181...
   export AWS_DEFAULT_REGION=garage
   ```
   You will need to source this file in your shell before starting the server:
   ```sh
   source .env.sh
   ```
6. Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`
   Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Testing

For tests you should have a database available on `localhost:5433` with user `postgres` and password `postgres`.
To run the tests: `mix test`
After some failed tests re-run only failed tests with: `mix test --failed`
To debug failed tests: `iex -S mix test --failed --breakpoints --trace`

## Deployment

The application is deployed using ECS. The deployment process is handled by the graasp/infrastrucutre repository.
It is in charge of registering the service and starting the tasks with the proper environment variables.
This repo simply builds the docker images and pushes them to the private ECR registry.

Please checkout [the setup docs](./docs/setup.md) for more information on how to bootstrap a server to deploy your app in production.

## Common commands

Checkout [the memento](./docs/memento.md) for an overview of helpful commands for managing the project (deployment and development).

## Troubleshooting and general help

### Cleaning artifacts after making a release

If you made a release localy it is possible that you end-up with a lot of files in the `priv/static/` folder.

Before committing, run: `mix phx.digest.clean --all` to clean them.
