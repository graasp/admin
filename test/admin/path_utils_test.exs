defmodule Admin.PathUtilsTest do
  use ExUnit.Case

  test "from_uuids/1 transforms ids to path string" do
    assert Admin.Items.PathUtils.from_uuids(["1234-5678"]) == "1234_5678"
    assert Admin.Items.PathUtils.from_uuids(["1234-5678", "9abc-def0"]) == "1234_5678.9abc_def0"
  end

  test "to_uuids/1 transforms path string to ids" do
    assert Admin.Items.PathUtils.to_uuids("1234_5678") == ["1234-5678"]
    assert Admin.Items.PathUtils.to_uuids("1234_5678.9abc_def0") == ["1234-5678", "9abc-def0"]
  end

  test "to_ltree/1 converts ids to ltree struct" do
    assert Admin.Items.PathUtils.to_ltree(["1234-5678"]) == %EctoLtree.LabelTree{
             labels: ["1234_5678"]
           }

    assert Admin.Items.PathUtils.to_ltree(["1234-5678", "9abc-def0"]) == %EctoLtree.LabelTree{
             labels: ["1234_5678", "9abc_def0"]
           }
  end

  test "to_string/1 converts ltree struct to path string" do
    assert Admin.Items.PathUtils.to_string(%EctoLtree.LabelTree{labels: ["1234_5678"]}) ==
             "1234_5678"

    assert Admin.Items.PathUtils.to_string(%EctoLtree.LabelTree{
             labels: ["1234_5678", "9abc_def0"]
           }) == "1234_5678.9abc_def0"
  end
end
