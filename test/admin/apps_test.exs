defmodule Admin.AppsTest do
  use Admin.DataCase

  alias Admin.Apps

  describe "apps" do
    alias Admin.Apps.AppInstance

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.AppsFixtures

    @invalid_attrs %{name: nil, description: nil, url: nil, thumbnail: nil}

    test "list_apps/1 returns all scoped apps" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
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
      scope = user_scope_fixture()
      app_instance = app_instance_fixture(scope)
      assert Apps.get_app_instance!(app_instance.id) == app_instance
    end

    test "create_app_instance/2 with valid data creates a app_instance" do
      valid_attrs = %{
        name: "some name",
        description: "some description",
        url: "some url",
        thumbnail: "some thumbnail"
      }

      scope = user_scope_fixture()

      assert {:ok, %AppInstance{} = app_instance} = Apps.create_app_instance(valid_attrs)
      assert app_instance.name == "some name"
      assert app_instance.description == "some description"
      assert app_instance.url == "some url"
      assert app_instance.thumbnail == "some thumbnail"
      assert app_instance.user_id == scope.user.id
    end

    test "create_app_instance/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_instance(scope, @invalid_attrs)
    end

    test "update_app_instance/3 with valid data updates the app_instance" do
      scope = user_scope_fixture()
      app_instance = app_instance_fixture(scope)

      update_attrs = %{
        name: "some updated name",
        description: "some updated description",
        url: "some updated url",
        thumbnail: "some updated thumbnail"
      }

      assert {:ok, %AppInstance{} = app_instance} =
               Apps.update_app_instance(scope, app_instance, update_attrs)

      assert app_instance.name == "some updated name"
      assert app_instance.description == "some updated description"
      assert app_instance.url == "some updated url"
      assert app_instance.thumbnail == "some updated thumbnail"
    end

    test "update_app_instance/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      app_instance = app_instance_fixture(scope)

      assert_raise MatchError, fn ->
        Apps.update_app_instance(other_scope, app_instance, %{})
      end
    end

    test "update_app_instance/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      app_instance = app_instance_fixture(scope)

      assert {:error, %Ecto.Changeset{}} =
               Apps.update_app_instance(scope, app_instance, @invalid_attrs)

      assert app_instance == Apps.get_app_instance!(scope, app_instance.id)
    end

    test "delete_app_instance/2 deletes the app_instance" do
      scope = user_scope_fixture()
      app_instance = app_instance_fixture(scope)
      assert {:ok, %AppInstance{}} = Apps.delete_app_instance(scope, app_instance)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_instance!(scope, app_instance.id) end
    end

    test "delete_app_instance/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      app_instance = app_instance_fixture(scope)
      assert_raise MatchError, fn -> Apps.delete_app_instance(other_scope, app_instance) end
    end

    test "change_app_instance/2 returns a app_instance changeset" do
      scope = user_scope_fixture()
      app_instance = app_instance_fixture(scope)
      assert %Ecto.Changeset{} = Apps.change_app_instance(scope, app_instance)
    end
  end

  describe "publishers" do
    alias Admin.Apps.Publisher

    import Admin.AccountsFixtures, only: [user_scope_fixture: 0]
    import Admin.AppsFixtures

    @invalid_attrs %{name: nil, origins: nil}

    test "list_publishers/1 returns all scoped publishers" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      publisher = publisher_fixture(scope)
      other_publisher = publisher_fixture(other_scope)
      assert Apps.list_publishers(scope) == [publisher]
      assert Apps.list_publishers(other_scope) == [other_publisher]
    end

    test "get_publisher!/2 returns the publisher with given id" do
      scope = user_scope_fixture()
      publisher = publisher_fixture(scope)
      other_scope = user_scope_fixture()
      assert Apps.get_publisher!(scope, publisher.id) == publisher
      assert_raise Ecto.NoResultsError, fn -> Apps.get_publisher!(other_scope, publisher.id) end
    end

    test "create_publisher/2 with valid data creates a publisher" do
      valid_attrs = %{name: "some name", origins: ["option1", "option2"]}
      scope = user_scope_fixture()

      assert {:ok, %Publisher{} = publisher} = Apps.create_publisher(valid_attrs)
      assert publisher.name == "some name"
      assert publisher.origins == ["option1", "option2"]
      assert publisher.user_id == scope.user.id
    end

    test "create_publisher/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.create_publisher(@invalid_attrs)
    end

    test "update_publisher/3 with valid data updates the publisher" do
      scope = user_scope_fixture()
      publisher = publisher_fixture(scope)
      update_attrs = %{name: "some updated name", origins: ["option1"]}

      assert {:ok, %Publisher{} = publisher} =
               Apps.update_publisher(scope, publisher, update_attrs)

      assert publisher.name == "some updated name"
      assert publisher.origins == ["option1"]
    end

    test "update_publisher/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      publisher = publisher_fixture(scope)

      assert_raise MatchError, fn ->
        Apps.update_publisher(other_scope, publisher, %{})
      end
    end

    test "update_publisher/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      publisher = publisher_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = Apps.update_publisher(scope, publisher, @invalid_attrs)
      assert publisher == Apps.get_publisher!(scope, publisher.id)
    end

    test "delete_publisher/2 deletes the publisher" do
      scope = user_scope_fixture()
      publisher = publisher_fixture(scope)
      assert {:ok, %Publisher{}} = Apps.delete_publisher(publisher)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_publisher!(publisher.id) end
    end

    test "delete_publisher/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      publisher = publisher_fixture(scope)
      assert_raise MatchError, fn -> Apps.delete_publisher(other_scope, publisher) end
    end

    test "change_publisher/2 returns a publisher changeset" do
      scope = user_scope_fixture()
      publisher = publisher_fixture(scope)
      assert %Ecto.Changeset{} = Apps.change_publisher(scope, publisher)
    end
  end
end
