defmodule Admin.AppsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Apps` context.
  """

  @doc """
  Generate a app_instance.
  """
  def app_instance_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        description: "some description",
        name: "some name",
        thumbnail: "some thumbnail",
        url: "some url"
      })

    {:ok, app_instance} = Admin.Apps.create_app_instance(scope, attrs)
    app_instance
  end

  @doc """
  Generate a publisher.
  """
  def publisher_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        name: "some name",
        origins: ["option1", "option2"]
      })

    {:ok, publisher} = Admin.Apps.create_publisher(scope, attrs)
    publisher
  end
end
