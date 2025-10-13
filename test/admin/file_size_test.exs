defmodule Admin.Utils.FileSizeTest do
  use ExUnit.Case

  test "humanize_size/1 converts to binary units" do
    assert Admin.Utils.FileSize.humanize_size(1024) == "1.0 KiB"
    assert Admin.Utils.FileSize.humanize_size(1024 * 1024) == "1.0 MiB"
    assert Admin.Utils.FileSize.humanize_size(1024 * 1024 * 1024) == "1.0 GiB"
    assert Admin.Utils.FileSize.humanize_size(1024 * 1024 * 1024 * 1024) == "1.0 TiB"
  end

  test "formating with precision" do
    assert Admin.Utils.FileSize.humanize_size(1053) == "1.03 KiB"
  end

  test "humanize_size/2 converts to binary units" do
    assert Admin.Utils.FileSize.humanize_size(1024, :decimal) == "1.02 KB"
    assert Admin.Utils.FileSize.humanize_size(1024 * 1024, :decimal) == "1.05 MB"
    assert Admin.Utils.FileSize.humanize_size(1024 * 1024 * 1024, :decimal) == "1.07 GB"
    assert Admin.Utils.FileSize.humanize_size(1000 * 1000 * 1000 * 1000, :decimal) == "1.0 TB"
  end
end
