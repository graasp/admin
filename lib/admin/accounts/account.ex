defmodule Admin.Accounts.Account do
  @moduledoc """
  This represents a graasp user. 
  """
  use Admin.Schema

  schema "account" do
    field :name, :string
    field :email, :string
    field :type, :string

    timestamps(type: :utc_datetime)
  end
end
