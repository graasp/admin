defmodule Admin.TextTransformsTest do
  use ExUnit.Case, async: true

  test "text_transforms" do
    assert Admin.TextTransforms.slugify("Hello") == "hello"
    assert Admin.TextTransforms.slugify("hello world") == "hello-world"
    assert Admin.TextTransforms.slugify("hello/ world!") == "hello-world"
  end
end
