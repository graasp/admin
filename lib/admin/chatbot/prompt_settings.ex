defmodule Admin.Chatbot.PromptSettings do
  @moduledoc """
  Embedded schema backing the teacher's chatbot settings form (name, system
  prompt, cue, starter suggestions). This isn't itself a DB table — the
  validated data is serialized into a single `app_setting` row (name
  `"chatbot-prompt"`) via `Admin.Chatbot.upsert_setting/4`.

  Field names are camelCase to match the React app's `ChatbotPromptSettings`
  (graasp-app-chatbot/src/config/appSetting.ts) so data written by either
  implementation stays readable by both during the migration.

  `starterSuggestions` is stored as a list of strings, matching the React
  app, but edited here as one big newline-separated textarea rather than the
  React app's dynamic add/remove-row UI — `starterSuggestionsText` is a
  virtual (form-only) field holding that raw text; it's split into the real
  list only in `to_data/1`.
  """
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field :chatbotName, :string, default: "Chatbot"
    field :initialPrompt, :string
    field :chatbotCue, :string
    field :starterSuggestionsText, :string, default: ""
  end

  @doc false
  def changeset(settings, attrs) do
    settings
    |> cast(attrs, [:chatbotName, :initialPrompt, :chatbotCue, :starterSuggestionsText])
    |> validate_required([:chatbotName, :initialPrompt])
  end

  @doc "Builds the struct from a stored app_setting `data` map (or `%{}` if unset)."
  @spec from_data(map()) :: %__MODULE__{}
  def from_data(data) when is_map(data) do
    suggestions = Map.get(data, "starterSuggestions", [])

    %__MODULE__{}
    |> cast(data, [:chatbotName, :initialPrompt, :chatbotCue])
    |> put_change(:starterSuggestionsText, Enum.join(suggestions, "\n"))
    |> apply_changes()
  end

  @doc "Converts a valid changeset back into the plain string-keyed map stored on app_setting."
  @spec to_data(Ecto.Changeset.t()) :: map()
  def to_data(%Ecto.Changeset{} = changeset) do
    applied = apply_changes(changeset)

    starter_suggestions =
      (applied.starterSuggestionsText || "")
      |> String.split("\n")
      |> Enum.map(&String.trim/1)
      |> Enum.reject(&(&1 == ""))

    %{
      "chatbotName" => applied.chatbotName,
      "initialPrompt" => applied.initialPrompt,
      "chatbotCue" => applied.chatbotCue,
      "starterSuggestions" => starter_suggestions
    }
  end
end
