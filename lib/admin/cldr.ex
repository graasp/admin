defmodule Admin.Cldr do
  @moduledoc """
  A module that defines the Cldr backend for the Admin application.
  """
  use Cldr,
    locales: ["en", "fr", "de", "it", "es", "ja"],
    providers: [Cldr.Number, Cldr.Calendar, Cldr.DateTime]
end
