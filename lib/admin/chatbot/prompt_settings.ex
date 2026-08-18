defmodule Admin.Chatbot.PromptSettings do
  @moduledoc """
  Embedded schema backing the teacher's chatbot settings form (name, system
  prompt, cue, starter suggestions). This isn't itself a DB table — the
  validated data is serialized into a single `app_setting` row (name
  `"chatbot-prompt"`) via `Admin.Chatbot.upsert_setting/4`.

  Field names are camelCase to match the React app's `ChatbotPromptSettings`
  (graasp-app-chatbot/src/config/appSetting.ts) so data written by either
  implementation stays readable by both during the migration.

  `starterSuggestions` (a list of strings) isn't part of this changeset — it's
  edited as dynamic add/remove rows (matching the React app's
  `StarterSuggestions.tsx`) via the `:starter_suggestions` LiveView assign in
  `AdminWeb.Chatbot.PlayerLive`, and only merged back in here at save time by
  `to_data/2`.
  """
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field :chatbotName, :string, default: "Chatbot"
    field :initialPrompt, :string
    field :chatbotCue, :string
  end

  @doc false
  def changeset(settings, attrs) do
    settings
    |> cast(attrs, [:chatbotName, :initialPrompt, :chatbotCue])
    |> validate_required([:chatbotName, :initialPrompt])
  end

  @doc "Builds the struct from a stored app_setting `data` map (or `%{}` if unset)."
  @spec from_data(map()) :: %__MODULE__{}
  def from_data(data) when is_map(data) do
    %__MODULE__{}
    |> cast(data, [:chatbotName, :initialPrompt, :chatbotCue])
    |> apply_changes()
  end

  @doc """
  Converts a valid changeset back into the plain string-keyed map stored on
  app_setting, given the starter suggestions collected separately from the
  add/remove-row UI. Empty rows are dropped, matching the React app's save
  behavior (`ChatbotEditingView.tsx`'s `handleSave`).
  """
  @spec to_data(Ecto.Changeset.t(), [String.t()]) :: map()
  def to_data(%Ecto.Changeset{} = changeset, starter_suggestions) do
    applied = apply_changes(changeset)

    %{
      "chatbotName" => applied.chatbotName,
      "initialPrompt" => applied.initialPrompt,
      "chatbotCue" => applied.chatbotCue,
      "starterSuggestions" => Enum.reject(starter_suggestions, &(&1 == ""))
    }
  end
end
