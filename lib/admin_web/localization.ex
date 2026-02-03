defmodule AdminWeb.Localization do
  @moduledoc """
  Module for managing localization.
  """

  # this is the locales that we support for pages.
  # They are not sorted alphabeticaly, english is
  # expected to be the first one so that the routes for english are the first to be generated.
  def supported_locales,
    do: ["en", "fr", "es", "de", "it"]

  def locale_path_prefix("en"), do: "/"
  def locale_path_prefix(locale), do: "/#{locale}"
end
