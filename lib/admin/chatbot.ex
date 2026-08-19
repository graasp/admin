defmodule Admin.Chatbot do
  @moduledoc """
  Context for the chatbot app's data: conversation messages (`app_data`),
  teacher-configured settings (`app_setting`), and usage logging
  (`app_action`). All reads/writes are scoped by `item_id` (resolved from the
  verified app token, see `Admin.Chatbot.Token`) so a bug here can't leak or
  mutate another item's data.
  """

  import Ecto.Query, warn: false

  alias Admin.Chatbot.AppAction
  alias Admin.Chatbot.AppData
  alias Admin.Chatbot.AppSetting
  alias Admin.Repo

  @message_types ~w(comment bot-comment)

  @doc """
  Lists a student's own conversation messages (comments + bot replies) for an
  item, oldest first. Scoped by `account_id` — visibility `"member"` app_data
  is only meant to be visible to its own creator (plus admins, not handled
  here yet), and conversations are inherently per-student, so every read here
  is scoped to a single account. Pass `conversation_id` to scope to a single
  thread; `nil` (the default) matches legacy messages that predate the
  conversation id.
  """
  def list_messages(item_id, account_id, conversation_id \\ nil) do
    AppData
    |> where(
      [d],
      d.item_id == ^item_id and d.account_id == ^account_id and d.type in @message_types
    )
    |> where_conversation(conversation_id)
    |> order_by([d], asc: d.created_at)
    |> Repo.all()
  end

  @doc """
  Lists a student's conversations for an item, most recently active first.
  Each entry is `%{id:, preview:, last_message_at:}` — `id` is `nil` for the
  legacy pre-conversationId thread, `preview` is the first message's content
  (matches the React app's `Conversations.tsx`, which uses it as the
  conversation's display name).
  """
  def list_conversations(item_id, account_id) do
    AppData
    |> where(
      [d],
      d.item_id == ^item_id and d.account_id == ^account_id and d.type in @message_types
    )
    |> order_by([d], asc: d.created_at)
    |> Repo.all()
    |> Enum.group_by(&conversation_id_of/1)
    |> Enum.map(fn {id, messages} ->
      %{
        id: id,
        preview: messages |> List.first() |> Map.get(:data) |> Map.get("content", ""),
        last_message_at: messages |> List.last() |> Map.get(:created_at)
      }
    end)
    |> Enum.sort_by(& &1.last_message_at, {:desc, DateTime})
  end

  @doc "Deletes every message in a student's conversation for an item."
  def delete_conversation(item_id, account_id, conversation_id) do
    AppData
    |> where(
      [d],
      d.item_id == ^item_id and d.account_id == ^account_id and d.type in @message_types
    )
    |> where_conversation(conversation_id)
    |> Repo.delete_all()
  end

  defp conversation_id_of(%AppData{data: data}), do: Map.get(data, "conversationId")

  defp where_conversation(query, nil) do
    where(query, [d], fragment("?->>'conversationId'", d.data) |> is_nil())
  end

  defp where_conversation(query, conversation_id) do
    where(query, [d], fragment("?->>'conversationId'", d.data) == ^conversation_id)
  end

  @doc """
  Creates a message. `type` is `"comment"` (student) or `"bot-comment"`
  (assistant). `account_id` is who the message is attributed to; for bot
  messages that's still the student's account (the bot has no account of its
  own), matching the React app's `AppDataTypes.BotComment` convention.
  `conversation_id` is stored as `data["conversationId"]`, or omitted
  entirely for the legacy (`nil`) thread.
  """
  def create_message(item_id, account_id, type, conversation_id, data)
      when type in @message_types do
    data =
      case conversation_id do
        nil -> data
        id -> Map.put(data, "conversationId", id)
      end

    %AppData{}
    |> AppData.changeset(%{
      item_id: item_id,
      account_id: account_id,
      creator_id: account_id,
      type: type,
      data: data,
      visibility: "member"
    })
    |> Repo.insert()
  end

  @doc "Fetches a single named setting (e.g. `\"chatbot-prompt\"`) for an item, if it exists."
  def get_setting(item_id, name) do
    Repo.get_by(AppSetting, item_id: item_id, name: name)
  end

  @doc "Lists every setting configured for an item."
  def list_settings(item_id) do
    AppSetting
    |> where([s], s.item_id == ^item_id)
    |> Repo.all()
  end

  @doc """
  Creates or updates the named setting for an item (there is at most one row
  per `{item_id, name}` pair in practice, mirroring how the React app treats
  app settings as a keyed map).

  When creating the row, `id` (if given) is used as its primary key instead
  of letting Ecto autogenerate one — useful when the id must be known before
  the row exists, e.g. to derive an S3 key for a file the setting will
  reference.
  """
  def upsert_setting(item_id, name, data, creator_id, id \\ nil) do
    case get_setting(item_id, name) do
      nil ->
        %AppSetting{}
        |> AppSetting.changeset(%{
          id: id,
          item_id: item_id,
          name: name,
          data: data,
          creator_id: creator_id
        })
        |> Repo.insert()

      setting ->
        setting
        |> AppSetting.changeset(%{data: data})
        |> Repo.update()
    end
  end

  @doc "Logs a chatbot usage action (analytics), scoped to an item."
  def create_action(item_id, account_id, type, data \\ %{}) do
    %AppAction{}
    |> AppAction.changeset(%{
      item_id: item_id,
      account_id: account_id,
      type: type,
      data: data
    })
    |> Repo.insert()
  end
end
