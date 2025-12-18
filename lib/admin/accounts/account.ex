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

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(account, attrs) do
    account
    |> cast(attrs, [:name, :email, :type])
    |> validate_required([:name, :email, :type])
    |> validate_email()
  end

  defp validate_email(changeset) do
    changeset
    |> validate_format(:email, ~r/^[^@,;\s]+@[^@,;\s]+$/,
      message: "must have the @ sign and no spaces"
    )
    |> validate_length(:email, max: 160)
  end
end
