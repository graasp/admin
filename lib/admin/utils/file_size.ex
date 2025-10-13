defmodule Admin.Utils.FileSize do
  @decimal_units [
    {"B", 1},
    {"KB", 1_000},
    {"MB", 1_000_000},
    {"GB", 1_000_000_000},
    {"TB", 1_000_000_000_000}
  ]
  @binary_units [
    {"B", 1},
    {"KiB", 1_024},
    {"MiB", 1_048_576},
    {"GiB", 1_073_741_824},
    {"TiB", 1_099_511_627_776}
  ]

  def humanize_size(bytes, type \\ :binary)
  def humanize_size(bytes, :binary), do: format_size(bytes, @binary_units)
  def humanize_size(bytes, :decimal), do: format_size(bytes, @decimal_units)

  defp format_size(bytes, units) do
    {unit, base} =
      units
      |> Enum.reduce(fn {label, factor}, {curr_label, curr_factor} ->
        cond do
          bytes < factor -> {curr_label, curr_factor}
          true -> {label, factor}
        end
      end)

    value = bytes / base
    "#{format_number(value, 2)} #{unit}"
  end

  # Formats numbers with fixed precision, trimming trailing zeros neatly.
  defp format_number(number, precision) when precision <= 0 do
    Integer.to_string(trunc(number))
  end

  defp format_number(number, precision) do
    formatted =
      number
      |> :erlang.float_to_binary([{:decimals, precision}])

    # Trim trailing zeros while keeping at least one decimal if precision > 0
    case String.split(formatted, ".", parts: 2) do
      [int] ->
        int

      [int, frac] ->
        trimmed = String.trim_trailing(frac, "0")

        case trimmed do
          "" -> int <> ".0"
          _ -> int <> "." <> trimmed
        end
    end
  end
end
