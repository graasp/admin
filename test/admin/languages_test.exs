defmodule Admin.LanguagesTest do
  use ExUnit.Case, async: true

  alias Admin.Languages

  describe "all/0" do
    test "returns all languages" do
      assert [
               %{value: "de", key: "Deutsch"},
               %{value: "en", key: "English"},
               %{value: "es", key: "Español"},
               %{value: "fr", key: "Français"},
               %{value: "it", key: "Italiano"},
               %{value: "ja", key: "日本語"}
             ] = Languages.all()
    end
  end

  describe "all_options/0" do
    test "retiurns a list" do
      all_options = Languages.all_options()
      assert is_list(all_options)
    end
  end

  describe "all_values/0" do
    test "cotnains all languages" do
      assert ["de", "en", "es", "fr", "it", "ja"] == Languages.all_values()
    end
  end

  describe "excluding/1" do
    test "returns all languages except the ones specified" do
      assert [
               %{value: "de", key: "Deutsch"},
               %{value: "es", key: "Español"},
               %{value: "it", key: "Italiano"},
               %{value: "ja", key: "日本語"}
             ] = Languages.excluding(["en", "fr"])
    end

    test "excluding nothing returns everything" do
      assert Languages.all() == Languages.excluding([])
    end
  end

  describe "disabling/1" do
    test "disabling a single language" do
      languages = Languages.disabling(["en"])

      assert true =
               Enum.find(languages, &(Keyword.get(&1, :value) == "en")) |> Keyword.get(:disabled)
    end

    test "disabling multiple languages" do
      languages = Languages.disabling(["en", "fr"])

      assert true =
               Enum.find(languages, &(Keyword.get(&1, :value) == "en")) |> Keyword.get(:disabled)

      assert true =
               Enum.find(languages, &(Keyword.get(&1, :value) == "fr")) |> Keyword.get(:disabled)
    end
  end
end
