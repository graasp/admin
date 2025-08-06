# Admin

This is the codebase for the admin interface of Graasp written in
[Elixir](https://elixir-lang.org/) using
[the Phoenix web framework](https://phoenixframework.org)

This project was generated with phoenix version 1.8.0

## Required tools

### Elixir

You will need Elixir and OTP installed.
On MacOS simply run: `brew install elixir`
For installation instructions refer to the [elixir installation guide](https://hexdocs.pm/phoenix/1.8.0/installation.html)

You can test you installation by running `elixir -v`. It should output something like:

```txt
Erlang/OTP 28 [erts-16.0.2] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [jit] [dtrace]

Elixir 1.18.4 (compiled with Erlang/OTP 27)
```

### PostgreSQL

You will need a running PostgreSQL server.

Using Docker:

```sh
docker run -d -p 5432:5432 \
              -e POSTGRES_USER=postgres \
              -e POSTGRES_DB=postgres \
              -e POSTGRES_PASSWORD="postgres" \
              --name postgres postgres:17.5-alpine
```

With a graphical client like [Postgres.app](https://postgresapp.com/) on MacOS.

## Getting Started

To start your Phoenix server:

- Run `mix setup` to install and setup dependencies
- Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
