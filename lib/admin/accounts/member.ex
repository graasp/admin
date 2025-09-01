defmodule Admin.Accounts.Member do
  use Admin.Schema
  import Ecto.Changeset

  schema "account" do
    field :name, :string
    field :email, :string
    field :type, Ecto.Enum, values: [:individual, :guest], default: :individual

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(member, attrs, user_scope) do
    member
    |> cast(attrs, [:name, :email, :type])
    |> validate_required([:name, :email, :type])
    |> put_change(:user_id, user_scope.user.id)
  end
end
