defmodule Admin.Accounts.Account do
  @moduledoc """
  This represents a graasp user.
  """
  use Admin.Schema
  import Ecto.Changeset

  schema "account" do
    field :name, :string
    field :email, :string
    field :type, :string
    field :extra, :map
    field :last_authenticated_at, :utc_datetime

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(account, attrs) do
    account
    |> cast(attrs, [:name, :email, :type, :extra])
    |> validate_required([:name, :email, :type])
    |> validate_email()
    |> maybe_validate_lang(:extra)
  end

  defp validate_email(changeset) do
    changeset
    |> validate_format(:email, ~r/^[^@,;\s]+@[^@,;\s]+$/,
      message: "must have the @ sign and no spaces"
    )
    |> validate_length(:email, max: 160)
  end

  # Validates `lang` only if present; permits nil or empty maps.
  defp maybe_validate_lang(changeset, field) when is_atom(field) do
    map = get_field(changeset, field)

    cond do
      # Skip validation if nil or empty map
      is_nil(map) or (is_map(map) and map == %{}) ->
        changeset

      # If provided but not a map, type error
      not is_map(map) ->
        add_error(changeset, field, "must be a map")

      true ->
        map_contains_string(changeset, field, map, :lang)
    end
  end

  defp map_contains_string(changeset, field, map, key) do
    case Map.get(map, key) do
      nil ->
        # Key absent is OK
        changeset

      v when is_binary(v) and v != "" ->
        changeset

      v when is_binary(v) ->
        add_error(changeset, field, "\"lang\" must be a non-empty string")

      _ ->
        add_error(changeset, field, "\"lang\" must be a string")
    end
  end
end
