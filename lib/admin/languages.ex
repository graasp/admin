defmodule Admin.Languages do
  @moduledoc """
  This module handles the currently supported languages.

  It allows to get a language list suitable for displaying a select input with some options disabled.
  """
  @languages [
    %{value: "en", key: "English"},
    %{value: "fr", key: "French"},
    %{value: "es", key: "Spanish"},
    %{value: "de", key: "German"},
    %{value: "it", key: "Italian"}
  ]

  def all do
    @languages
  end

  def all_options do
    @languages |> Enum.map(&Keyword.new(&1))
  end

  def all_values do
    @languages |> Enum.map(& &1.value)
  end

  @doc """
  Returns a list of languages excluding the ones with the given codes.

  ## Examples
    iex> Admin.Languages.excluding(["en", "fr"])
    [%{value: "es", key: "Spanish"}, %{value: "de", key: "German"}, %{value: "it", key: "Italian"}]
  """
  def excluding(language_codes) when is_list(language_codes) do
    @languages |> Enum.reject(&(&1.value in language_codes))
  end

  @doc """
  Returns a list of keyword lists with languages with the disabled languages. Can be used in select options.

  ## Examples
    iex> Admin.Languages.disabling(["en", "fr"])
    [
      [value: "en", key: "English", disabled: true],
      [value: "fr", key: "French", disabled: true],
      [value: "es", key: "Spanish", disabled: false],
      [value: "de", key: "German", disabled: false],
      [value: "it", key: "Italian", disabled: false]
    ]
  """
  def disabling(language_codes) when is_list(language_codes) do
    @languages
    |> Enum.map(fn %{value: value, key: key} ->
      Keyword.new(value: value, key: key, disabled: value in language_codes)
    end)
  end
end
