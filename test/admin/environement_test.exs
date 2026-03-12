defmodule Admin.EnvironmentTest do
  use Admin.DataCase, async: true

  describe "app_url/1" do
    test "returns the app url for a given environment" do
      assert Admin.Environment.app_url() == "https://graasp.org/"
      assert Admin.Environment.app_url(path: "/") == "https://graasp.org/"
      assert Admin.Environment.app_url(path: "/some_path") == "https://graasp.org/some_path"
    end
  end
end
