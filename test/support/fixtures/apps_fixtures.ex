defmodule Admin.AppsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Admin.Apps` context.
  """

  @doc """
  Generate a app_instance.
  """
  def app_instance_fixture(attrs \\ %{}) do
    publisher =
      case Map.has_key?(attrs, :publisher_id) do
        true -> Admin.Apps.get_publisher!(attrs.publisher_id)
        false -> publisher_fixture()
      end

    attrs =
      Enum.into(attrs, %{
        description: "some description",
        name: "some name",
        thumbnail: "some thumbnail",
        url: "http://example.com"
      })

    {:ok, app_instance} = Admin.Apps.create_app_instance(publisher, attrs)
    %{app: app_instance, publisher: publisher}
  end

  @doc """
  Generate a publisher.
  """
  def publisher_fixture(attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        name: "some name",
        origins: ["http://example1.com", "http://example2.com"]
      })

    {:ok, publisher} = Admin.Apps.create_publisher(attrs)
    publisher
  end
end
