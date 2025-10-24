defmodule Mix.Tasks.Webapp do
  @moduledoc """
    React frontend compilation and bundling for production.
  """
  use Mix.Task
  require Logger
  # Path for the frontend static assets that are being served
  # from our Phoenix router when accessing /app/* for the first time
  @public_path "./priv/static/webapp"

  @shortdoc "Compile and bundle React frontend for production"
  def run(_args) do
    Logger.info("📦 - Installing NPM packages")
    # Best-effort; ignore failures here
    System.cmd("pnpm", ["install", "--quiet"], cd: "./frontend")

    Logger.info("⚙️  - Compiling React frontend")

    with {_, 0} <- System.cmd("pnpm", ["run", "build"], cd: "./frontend") do
      Logger.info("🚛 - Moving dist folder to Phoenix at #{@public_path}")

      # Non-fatal cleanup/copy; if these fail we still consider the build successful.
      File.rm_rf(@public_path)
      File.cp_r(Path.join("./frontend", "dist"), @public_path)

      Logger.info("⚛️  - React frontend ready.")
    else
      {_output, exit_code} ->
        Logger.error("Build failed with exit code #{exit_code}")

        # Halt the mix task to indicate failure of the build step.
        Mix.raise("Frontend build failed (exit #{exit_code})")
    end
  end
end
