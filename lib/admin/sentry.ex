defmodule Admin.Sentry do
  @moduledoc """
  Sentry configuration for Admin application.

  In this module we define sentry hooks that allow to filter events based on their data.
  """

  # drop db traces
  def before_send(%{span: %{op: "db"}} = _event), do: nil
  def before_send(event), do: event
end
