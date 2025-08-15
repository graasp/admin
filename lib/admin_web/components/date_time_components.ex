defmodule AdminWeb.DateTimeComponents do
  use Phoenix.Component

  def relative_date(assigns) do
    ~H"""
    <span>
      {to_relative_string(@date)}
    </span>
    """
  end

  @spec to_relative_string(NaiveDateTime.t()) :: String.t()
  defp to_relative_string(date) do
    now = NaiveDateTime.local_now()
    diff = NaiveDateTime.diff(now, date)

    cond do
      diff <= -24 * 3600 -> "in #{div(-diff, 24 * 3600)}d"
      diff <= -3600 -> "in #{div(-diff, 3600)}h"
      diff <= -60 -> "in #{div(-diff, 60)}m"
      diff <= -5 -> "in #{-diff}s"
      diff <= 5 -> "now"
      diff <= 60 -> "#{diff}s ago"
      diff <= 3600 -> "#{div(diff, 60)} minutes ago"
      diff <= 24 * 3600 -> "#{div(diff, 3600)}h ago"
      true -> "#{div(diff, 24 * 3600)}d ago"
    end
  end
end
