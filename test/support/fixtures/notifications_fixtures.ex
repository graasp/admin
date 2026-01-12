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
        audience: "active",
        default_language: "en",
        use_strict_languages: false
      })

    {:ok, notification} = Admin.Notifications.create_notification(scope, attrs)
    notification
  end

  def localized_messages_fixture(scope, notification, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        language: "fr",
        message: "some message"
      })

    {:ok, localized_message} =
      Admin.Notifications.create_localized_email(scope, notification.id, attrs)

    localized_message
  end
end
