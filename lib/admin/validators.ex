defmodule Admin.Validators do
  @moduledoc """
  This module provides Validator functions to perform complex validation on UUID and urls.
  """
  import Ecto.Changeset

  def validate_url(changeset, field) do
    validate_change(changeset, field, fn _, value ->
      if valid_url?(value) do
        []
      else
        [{field, "is not a valid URL"}]
      end
    end)
  end

  def validate_urls_array(changeset, field) do
    validate_change(changeset, field, fn ^field, urls ->
      urls
      |> Enum.with_index()
      |> Enum.reduce([], &collect_url_errors(field, &1, &2))
    end)
  end

  defp collect_url_errors(field, {url, idx}, acc) do
    if valid_url?(url) do
      acc
    else
      [{field, "element at index #{idx} is not a valid URL"} | acc]
    end
  end

  defp valid_url?(url) do
    uri = URI.parse(url)
    scheme = uri.scheme
    host = uri.host

    (scheme == "http" or scheme == "https") and is_binary(host) and host != ""
  end

  def validate_uuid(changeset, field) do
    value = Ecto.Changeset.get_field(changeset, field)

    case Ecto.UUID.cast(value) do
      {:ok, _} -> changeset
      :error -> Ecto.Changeset.add_error(changeset, field, "is not a valid UUID")
    end
  end
end
