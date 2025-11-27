defmodule Admin.PlatformsTest do
  use ExUnit.Case, async: true

  alias Admin.Platforms

  describe "create platform links" do
    test "player with only root_id" do
      base_host = Application.get_env(:admin, :base_host)

      root_id = Ecto.UUID.generate()

      assert Platforms.get_url(:player, root_id) ==
               "https://#{base_host}/player/#{root_id}/#{root_id}"
    end

    test "player with rootId and item_id" do
      base_host = Application.get_env(:admin, :base_host)

      root_id = Ecto.UUID.generate()
      item_id = Ecto.UUID.generate()

      assert Platforms.get_url(:player, root_id, item_id) ==
               "https://#{base_host}/player/#{root_id}/#{item_id}"
    end

    test "library with item_id" do
      base_host = Application.get_env(:admin, :base_host)

      item_id = Ecto.UUID.generate()

      assert Platforms.get_url(:library, item_id) ==
               "https://library.#{base_host}/collections/#{item_id}"
    end
  end
end
