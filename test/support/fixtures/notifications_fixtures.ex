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
        name: "some name",
        audience: "all",
        default_language: "en"
      })

    {:ok, notification} = Admin.Notifications.create_notification(scope, attrs)
    notification
  end
end
