defmodule Admin.StorageQuota.Quota do
  use Ecto.Schema
  import Ecto.Changeset

  schema "quotas" do
    field :value, :float
    belongs_to :user, Admin.Accounts.Member

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(quota, attrs, user_scope) do
    quota
    |> cast(attrs, [:value])
    |> validate_required([:value])
    |> put_change(:user_id, user_scope.user.id)
  end
end
