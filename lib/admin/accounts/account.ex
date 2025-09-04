defmodule Admin.Accounts.Account do
  use Admin.Schema

  schema "account" do
    field :email, :string
    field :type, :string

    timestamps(type: :utc_datetime)
  end
end
