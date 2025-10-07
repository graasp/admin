defmodule Admin.SmartAssistants.Message do
  @moduledoc """
  This module represents the messages in a conversation with an AI assistant
  """
  use Admin.Schema
  import Ecto.Changeset

  schema "messages" do
    field :content, :string
    field :type, :string
    field :user_id, :binary_id

    belongs_to :conversation, Admin.SmartAssistants.Conversation

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(message, attrs, user_scope, conversation_id) do
    message
    |> cast(attrs, [:content, :type])
    |> validate_required([:content, :type])
    |> put_change(:user_id, user_scope.user.id)
    |> put_change(:conversation_id, conversation_id)
  end
end
