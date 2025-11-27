import Config
config :admin, Oban, testing: :manual

# Only in tests, remove the complexity from the password hashing algorithm
config :bcrypt_elixir, :log_rounds, 1

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :admin, Admin.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  port: 5433,
  database: "admin_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: System.schedulers_online() * 2

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :admin, AdminWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "2NXgoWjpP3ZaHSOCc9EiXkGALvxZG7xJ1GmX8VzWc7uMVvGgbDdyaHBNtf4PSUf1",
  server: false

# In test we don't send emails
config :admin, Admin.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Enable helpful, but potentially expensive runtime checks
config :phoenix_live_view,
  enable_expensive_runtime_checks: true

config :ex_aws,
  access_key_id: "test",
  secret_access_key: "test"

config :ex_aws, :s3,
  scheme: "https://",
  host: "s3.eu-central-1.amazonaws.com",
  region: "eu-central-1"

# Needed in order for the compiled module to use the Mocked module
config :admin, :test_doubles, ex_aws: ExAwsMock

config :admin, :base_host, "example.com"
