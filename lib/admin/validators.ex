defmodule Admin.Validators do
  import Ecto.Changeset

  def validate_url(changeset, field) do
    validate_change(changeset, field, fn _, value ->
      case URI.parse(value) do
        %URI{scheme: scheme, host: host}
        when scheme in ["http", "https"] and is_binary(host) and host != "" ->
          []

        _ ->
          [{field, "is not a valid URL"}]
      end
    end)
  end

  def validate_urls_array(changeset, field) do
    validate_change(changeset, field, fn ^field, urls ->
      urls
      |> Enum.with_index()
      |> Enum.reduce([], fn {url, idx}, acc ->
        case URI.parse(url) do
          %URI{scheme: scheme, host: host}
          when scheme in ["http", "https"] and is_binary(host) and host != "" ->
            acc

          _ ->
            [{field, "element at index #{idx} is not a valid URL"} | acc]
        end
      end)
    end)
  end

  def validate_uuid(changeset, field) do
    value = Ecto.Changeset.get_field(changeset, field)

    case Ecto.UUID.cast(value) do
      {:ok, _} -> changeset
      :error -> Ecto.Changeset.add_error(changeset, field, "is not a valid UUID")
    end
  end
end
