defmodule Admin.SmartAssistants.Conversation do
  @moduledoc """
  This module holds the struct to represent a conversation between a user and a chatbot powered by AI.
  """
  use Admin.Schema
  import Ecto.Changeset

  schema "conversations" do
    field :user_id, :binary_id

    belongs_to :assistant, Admin.SmartAssistants.Assistant
    has_many :messages, Admin.SmartAssistants.Message

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(conversation, attrs, user_scope) do
    conversation
    |> cast(attrs, [])
    |> validate_required([])
    |> put_change(:user_id, user_scope.user.id)
  end
end
