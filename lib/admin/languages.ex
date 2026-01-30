defmodule Admin.Languages do
  @moduledoc """
  This module handles the currently supported languages.

  It allows to get a language list suitable for displaying a select input with some options disabled.
  """
  @languages [
    %{value: "de", key: "Deutsch"},
    %{value: "en", key: "English"},
    %{value: "es", key: "Español"},
    %{value: "fr", key: "Français"},
    %{value: "it", key: "Italiano"}
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
    [
      %{value: "de", key: "Deutsch"},
      %{value: "es", key: "Español"},
      %{value: "it", key: "Italiano"}
    ]
  """
  def excluding(language_codes) when is_list(language_codes) do
    @languages |> Enum.reject(&(&1.value in language_codes))
  end

  @doc """
  Returns a list of keyword lists with languages with the disabled languages. Can be used in select options.

  ## Examples
    iex> Admin.Languages.disabling(["en", "fr"])
    [
      [value: "de", key: "Deutsch", disabled: false],
      [value: "en", key: "English", disabled: true],
      [value: "es", key: "Español", disabled: false],
      [value: "fr", key: "Français", disabled: true],
      [value: "it", key: "Italiano", disabled: false]
    ]
  """
  def disabling(language_codes) when is_list(language_codes) do
    @languages
    |> Enum.map(fn %{value: value, key: key} ->
      Keyword.new(value: value, key: key, disabled: value in language_codes)
    end)
  end

  def display_name(locale) do
    Enum.find(@languages, &(&1.value == locale))[:key]
  end
end
