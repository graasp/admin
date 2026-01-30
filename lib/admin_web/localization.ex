defmodule AdminWeb.Localization do
  @moduledoc """
  Module for managing localization.
  """

  def supported_locales,
    do: ["en", "fr", "es", "de", "it"]

  def locale_path_prefix("en"), do: "/"
  def locale_path_prefix(locale), do: "/#{locale}"
end
