defmodule Admin.Chatbot.Markdown do
  @moduledoc """
  Renders chat message markdown (student input and OpenAI's replies, which
  commonly use bold/lists/code) to sanitized HTML for display.

  Uses the same sanitization preset as `AdminWeb.CoreComponents.raw_html/1`
  (`HtmlSanitizeEx.basic_html/1`) since this content is untrusted, persisted
  `app_data`, and gets re-rendered to other viewers later — sanitizing is
  what stands between a student typing `<script>` in the chat and it running
  in every future viewer's session.
  """

  @spec to_html(String.t() | nil) :: String.t()
  def to_html(nil), do: ""
  def to_html(""), do: ""

  def to_html(markdown) do
    markdown
    |> Earmark.as_html!()
    |> HtmlSanitizeEx.basic_html()
  end
end
