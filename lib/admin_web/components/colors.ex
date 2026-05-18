defmodule AdminWeb.Components.Colors do
  @moduledoc """
  A module that defines the color generation functions for the Admin application.
  """

  @doc """
  Generates a pastel background color from a UUID string.
  Returns a CSS-ready HSL color string.

  ## Examples

      iex> AdminWeb.Components.Colors.from_uuid("550e8400-e29b-41d4-a716-446655440000")
      "hsl(214, 70%, 85%)"

  """
  def from_uuid(uuid) when is_binary(uuid) do
    hue = uuid_to_hue(uuid)
    "hsl(#{hue}, 70%, 85%)"
  end

  @doc """
  Returns a map with hue, saturation, lightness, and the CSS string.
  """
  def from_uuid_detailed(uuid) when is_binary(uuid) do
    hue = uuid_to_hue(uuid)

    %{
      hue: hue,
      saturation: 70,
      lightness: 85,
      css: "hsl(#{hue}, 70%, 85%)"
    }
  end

  @doc """
  Generates a complementary pastel pair (background + text accent) from a UUID.
  """
  def color_pair(uuid) when is_binary(uuid) do
    hue = uuid_to_hue(uuid)
    bg = "hsl(#{hue}, 70%, 88%)"
    text = "hsl(#{rem(hue + 180, 360)}, 50%, 35%)"
    %{background: bg, text: text}
  end

  # --- Private ---

  defp uuid_to_hue(uuid) do
    uuid
    |> String.replace("-", "")
    # use first 8 hex chars
    |> String.slice(0, 8)
    # parse as hex integer
    |> String.to_integer(16)
    # map to hue wheel
    |> rem(360)
  end
end
