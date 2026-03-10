defmodule Admin.DocsTest do
  use ExUnit.Case, async: true

  alias Admin.Docs
  alias Admin.Docs.Page

  test "all_pages/0" do
    pages = Docs.all_pages()
    assert is_list(pages)
    assert length(pages) > 1
  end

  test "all_ids/0" do
    ids = Docs.all_ids()
    assert is_list(ids)
    assert length(ids) > 1
  end

  test "for_locale/1" do
    pages = Docs.for_locale("en")
    assert length(pages) > 1
    assert Enum.all?(pages, &(&1.locale == "en"))

    fr_pages = Docs.for_locale("fr")
    assert length(fr_pages) > 1
    assert Enum.any?(fr_pages, &(&1.locale == "fr"))
  end

  test "for_locale_by_sections/1" do
    _pages = Docs.for_locale_by_sections("en")

    _fr_pages = Docs.for_locale_by_sections("fr")
  end

  describe "docs page" do
    test "can build a docs page struct" do
      assert %Page{
               id: "getting-started",
               locale: "en",
               section: "",
               title: "hello",
               description: "",
               tags: ["intro", "guide"],
               body: "Content"
             } =
               Page.build(
                 "priv/docs/en/getting-started.md",
                 %{
                   title: "hello",
                   tags: ["intro", "guide"]
                 },
                 "Content"
               )
    end

    test "parses the section from the path" do
      assert %Page{
               id: "some-doc",
               locale: "de",
               section: "section_name",
               title: "Some Doc",
               description: "Some description of some doc",
               tags: [],
               body: "Some content"
             } =
               Page.build(
                 "priv/docs/de/section_name/some-doc.md",
                 %{
                   title: "Some Doc",
                   description: "Some description of some doc",
                   tags: []
                 },
                 "Some content"
               )
    end
  end
end
