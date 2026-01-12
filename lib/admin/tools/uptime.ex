defmodule Admin.Tools.Uptime do
  @moduledoc """
  Used for executing uptime related tasks
  """

  def print do
    # get the total time from the Erlang VM
    {total_milisecond, _} = :erlang.statistics(:wall_clock)
    formatted_uptime = hh_mm_ss(div(total_milisecond, 1_000))
    IO.puts("Uptime: #{formatted_uptime}")
  end

  defp hh_mm_ss(seconds) do
    {days, seconds} = div_rem(seconds, 86400)
    {hours, seconds} = div_rem(seconds, 3600)
    {minutes, seconds} = div_rem(seconds, 60)
    "#{days}d #{hours}h #{minutes}m #{seconds}s"
  end

  defp div_rem(a, b) do
    {div(a, b), rem(a, b)}
  end
end
