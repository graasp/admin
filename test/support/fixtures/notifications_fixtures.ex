defmodule Admin.NotificationsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Notifications` context.
  """

  @doc """
  Generate a service_message.
  """
  def service_message_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        message: "some message",
        subject: "some subject"
      })

    {:ok, service_message} = Admin.Notifications.create_service_message(scope, attrs)
    service_message
  end
end
