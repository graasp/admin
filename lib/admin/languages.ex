defmodule Admin.Languages do
  @moduledoc """
  This module handles the currently supported languages.

  It allows to get a language list suitable for displaying a select input with some options disabled.
  """
  @languages [
    %{value: "de", label: "Deutsch"},
    %{value: "en", label: "English"},
    %{value: "es", label: "Español"},
    %{value: "fr", label: "Français"},
    %{value: "it", label: "Italiano"}
  ]

  def all do
    @languages |> Enum.map(&%{value: &1.value, key: &1.label})
  end

  def all_options do
    all() |> Enum.map(&Keyword.new(&1))
  end

  def all_values do
    all() |> Enum.map(& &1.value)
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
    all()
    |> Enum.reject(&(&1.value in language_codes))
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
    |> Enum.map(fn %{value: value, label: label} ->
      Keyword.new(value: value, key: label, disabled: value in language_codes)
    end)
  end

  def get_label(locale) do
    Enum.find(@languages, &(&1.value == locale))[:label]
  end
end
