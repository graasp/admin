defmodule AdminWeb.GraphsTest do
  use AdminWeb.ConnCase, async: true
  import Phoenix.Template

  describe "init/1" do
    test "contains vega, vega-lite and vega-embed scripts" do
      scripts_html = render_to_string(AdminWeb.Components.Graphs, "init", "html", %{})
      assert scripts_html =~ "vega"
      assert scripts_html =~ "vega-lite"
      assert scripts_html =~ "vega-embed"
    end
  end
end
