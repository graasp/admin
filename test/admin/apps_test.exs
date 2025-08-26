defmodule Admin.AppsTest do
  use Admin.DataCase

  alias Admin.Apps

  describe "apps" do
    alias Admin.Apps.AppInstance

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.AppsFixtures

    @invalid_attrs %{name: nil, description: nil, url: nil, thumbnail: nil}

    test "list_apps/1 returns all scoped apps" do
      user_scope_fixture()
      %{app: app_instance, publisher: publisher} = app_instance_fixture()
      %{app: other_app_instance} = app_instance_fixture(%{publisher_id: publisher.id})

      apps =
        Apps.list_apps_by_publisher()
        |> Enum.find(fn pub -> pub.id == publisher.id end)
        |> Map.get(:apps)

      assert apps ==
               [
                 app_instance,
                 other_app_instance
               ]
    end

    test "get_app_instance!/2 returns the app_instance with given id" do
      user_scope_fixture()
      %{app: app_instance} = app_instance_fixture()

      assert Apps.get_app_instance!(app_instance.id) ==
               app_instance |> Admin.Apps.with_publisher()
    end

    test "create_app_instance/2 with valid data creates a app_instance" do
      valid_attrs = %{
        name: "some name",
        description: "some description",
        url: "some url",
        thumbnail: "some thumbnail"
      }

      user_scope_fixture()
      publisher = publisher_fixture()

      assert {:ok, %AppInstance{} = app_instance} =
               Apps.create_app_instance(publisher, valid_attrs)

      assert app_instance.name == "some name"
      assert app_instance.description == "some description"
      assert app_instance.url == "some url"
      assert app_instance.thumbnail == "some thumbnail"
    end

    test "create_app_instance/2 with invalid data returns error changeset" do
      user_scope_fixture()
      publisher = publisher_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_instance(publisher, @invalid_attrs)
    end

    test "update_app_instance/3 with valid data updates the app_instance" do
      user_scope_fixture()
      %{app: app_instance} = app_instance_fixture()

      update_attrs = %{
        name: "some updated name",
        description: "some updated description",
        url: "some updated url",
        thumbnail: "some updated thumbnail"
      }

      assert {:ok, %AppInstance{} = app_instance} =
               Apps.update_app_instance(app_instance, update_attrs)

      assert app_instance.name == "some updated name"
      assert app_instance.description == "some updated description"
      assert app_instance.url == "some updated url"
      assert app_instance.thumbnail == "some updated thumbnail"
    end

    test "update_app_instance/3 with invalid data returns error changeset" do
      user_scope_fixture()
      %{app: app_instance} = app_instance_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Apps.update_app_instance(app_instance, @invalid_attrs)

      assert app_instance |> Admin.Apps.with_publisher() ==
               Apps.get_app_instance!(app_instance.id)
    end

    test "delete_app_instance/2 deletes the app_instance" do
      user_scope_fixture()
      %{app: app_instance} = app_instance_fixture()
      assert {:ok, %AppInstance{}} = Apps.delete_app_instance(app_instance)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_instance!(app_instance.id) end
    end

    test "change_app_instance/2 returns a app_instance changeset" do
      user_scope_fixture()
      %{app: app_instance} = app_instance_fixture()
      assert %Ecto.Changeset{} = Apps.change_app_instance(app_instance)
    end
  end

  describe "publishers" do
    alias Admin.Apps.Publisher

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.AppsFixtures

    @invalid_attrs %{name: nil, origins: nil}

    test "list_publishers/1 returns all publishers" do
      user_scope_fixture()
      publisher = publisher_fixture()
      other_publisher = publisher_fixture()
      assert Apps.list_publishers() == [publisher, other_publisher]
    end

    test "get_publisher!/2 returns the publisher with given id" do
      user_scope_fixture()
      publisher = publisher_fixture()
      assert Apps.get_publisher!(publisher.id) == publisher
    end

    test "create_publisher/2 with valid data creates a publisher" do
      valid_attrs = %{name: "some name", origins: ["option1", "option2"]}
      user_scope_fixture()

      assert {:ok, %Publisher{} = publisher} = Apps.create_publisher(valid_attrs)
      assert publisher.name == "some name"
      assert publisher.origins == ["option1", "option2"]
    end

    test "create_publisher/2 with invalid data returns error changeset" do
      user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.create_publisher(@invalid_attrs)
    end

    test "update_publisher/3 with valid data updates the publisher" do
      user_scope_fixture()
      publisher = publisher_fixture()
      update_attrs = %{name: "some updated name", origins: ["option1"]}

      assert {:ok, %Publisher{} = publisher} =
               Apps.update_publisher(publisher, update_attrs)

      assert publisher.name == "some updated name"
      assert publisher.origins == ["option1"]
    end

    test "update_publisher/3 with invalid data returns error changeset" do
      user_scope_fixture()
      publisher = publisher_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_publisher(publisher, @invalid_attrs)
      assert publisher == Apps.get_publisher!(publisher.id)
    end

    test "delete_publisher/2 deletes the publisher" do
      user_scope_fixture()
      publisher = publisher_fixture()
      assert {:ok, %Publisher{}} = Apps.delete_publisher(publisher)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_publisher!(publisher.id) end
    end

    test "change_publisher/2 returns a publisher changeset" do
      user_scope_fixture()
      publisher = publisher_fixture()
      assert %Ecto.Changeset{} = Apps.change_publisher(publisher)
    end
  end
end
