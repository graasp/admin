defmodule AdminWeb.Localization do
  @moduledoc """
  Module for managing localization.
  """

  def supported_locales,
    do: (["en"] ++ Gettext.known_locales(AdminWeb.Gettext)) |> Enum.uniq()

  def locale_path_prefix("en"), do: "/"
  def locale_path_prefix(locale), do: "/#{locale}"
end
