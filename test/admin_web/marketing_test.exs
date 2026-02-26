defmodule AdminWeb.MarketingTest do
  use AdminWeb.ConnCase

  test "path to marketing page that does not exist" do
    assert AdminWeb.Marketing.get_path("other", "fr") == "/"
  end
end
