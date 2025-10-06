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
end
