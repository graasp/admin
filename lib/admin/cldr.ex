defmodule Admin.Cldr do
  use Cldr,
    locales: ["en", "fr", "de", "it", "es", "ja"],
    providers: [Cldr.Number, Cldr.Calendar, Cldr.DateTime]
end
