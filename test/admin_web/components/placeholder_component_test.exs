defmodule AdminWeb.PlaceholderComponentTest do
  use AdminWeb.ConnCase, async: true

  import Phoenix.Template

  describe "Placeholder components" do
    test "section contains title" do
      output =
        render_to_string(AdminWeb.Placeholders, "mock_section", "html", %{title: "Section"})

      assert output =~ "<h2>Section</h2>"
    end
  end
end
