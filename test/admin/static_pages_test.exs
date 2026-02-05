defmodule Admin.StaticPagesTest do
  use ExUnit.Case, async: true

  alias Admin.StaticPages
  alias Admin.StaticPages.Page

  describe "static pages" do
    test "can get required pages" do
      assert ["disclaimer", "privacy", "terms"] = StaticPages.get_unique_page_ids()
    end

    test "get pages in en" do
      assert StaticPages.get_static_page!("en", "disclaimer")
      assert StaticPages.get_static_page!("en", "terms")
      assert StaticPages.get_static_page!("en", "privacy")

      assert_raise AdminWeb.NotFoundError, fn ->
        StaticPages.get_static_page!("en", "nonexistent")
      end
    end

    test "page exists" do
      assert StaticPages.exists?("en", "disclaimer")
      refute StaticPages.exists?("en", "nonexistent")
    end
  end

  describe "page struct" do
    test "can build a page from a file" do
      assert %Page{
               id: "disclaimer",
               locale: "en",
               title: "Disclaimer",
               body: "Content"
             } =
               Page.build(
                 "en/disclaimer.md",
                 %{
                   title: "Disclaimer"
                 },
                 "Content"
               )
    end
  end
end
