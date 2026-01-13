defmodule Admin.SentryFilter do
  @moduledoc """
  Sentry filter configuration for the Admin application.

  In this module we define sentry hooks that allow to filter events based on their data.
  """

  def before_send(event, _hint) do
    spans = Map.get(event, "spans", [])
    module_opts = Application.get_env(:admin, Admin.SentryFilter, [])

    keep_db_spans = Keyword.get(module_opts, :keep_db_spans, true)

    filtered_spans = spans |> process_db_spans(keep_db_spans)

    event
    |> Map.put("spans", filtered_spans)
  end

  defp process_db_spans(spans, true), do: spans

  defp process_db_spans(spans, false) do
    Enum.reject(spans, fn
      %{"op" => "db"} -> true
      %{:op => "db"} -> true
      _ -> false
    end)
  end
end
