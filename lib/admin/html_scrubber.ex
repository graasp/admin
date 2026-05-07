defmodule Admin.HtmlScrubber do
  use HtmlSanitizeEx

  allow_tag_with_any_attributes("p")
  allow_tag_with_any_attributes("br")
  allow_tag_with_any_attributes("em")
end
