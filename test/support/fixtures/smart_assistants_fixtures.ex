defmodule Admin.SmartAssistantsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.SmartAssistants` context.
  """

  @doc """
  Generate a assistant.
  """
  def assistant_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        name: "some name",
        picture: "some picture",
        prompt: "some prompt",
        shared_at: ~N[2025-10-05 09:18:00]
      })

    {:ok, assistant} = Admin.SmartAssistants.create_assistant(scope, attrs)
    assistant
  end

  @doc """
  Generate a assistant.
  """
  def assistant_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        name: "some name",
        picture: "some picture",
        prompt: "some prompt"
      })

    {:ok, assistant} = Admin.SmartAssistants.create_assistant(scope, attrs)
    assistant
  end

  @doc """
  Generate a conversation.
  """
  def conversation_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{

      })

    {:ok, conversation} = Admin.SmartAssistants.create_conversation(scope, attrs)
    conversation
  end

  @doc """
  Generate a message.
  """
  def message_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        content: "some content",
        type: "some type"
      })

    {:ok, message} = Admin.SmartAssistants.create_message(scope, attrs)
    message
  end
end
