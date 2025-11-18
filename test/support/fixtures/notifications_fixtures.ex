defmodule Admin.NotificationsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Notifications` context.
  """

  @doc """
  Generate a notification.
  """
  def notification_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        message: "some message",
        title: "some title",
        recipients: ["user1@example.com", "user2@example.com"]
      })

    {:ok, notification} = Admin.Notifications.create_notification(scope, attrs)
    notification
  end
end
