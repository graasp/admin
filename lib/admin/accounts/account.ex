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

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(account, attrs) do
    account
    |> cast(attrs, [:name, :email, :type])
    |> validate_required([:name, :email, :type])
  end
end
