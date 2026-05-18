defmodule Admin.HtmlScrubber do
  @moduledoc """
  A module that defines the HTML scrubber for the Admin application.
  """
  use HtmlSanitizeEx

  allow_tag_with_any_attributes("p")
  allow_tag_with_any_attributes("br")
  allow_tag_with_any_attributes("em")
end
