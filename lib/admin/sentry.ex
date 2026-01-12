defmodule Admin.Sentry do
  # drop db traces
  def before_send(%{span: %{op: "db"}} = event), do: nil
  def before_send(event), do: event
end
