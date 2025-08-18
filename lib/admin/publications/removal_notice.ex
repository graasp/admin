defmodule Admin.Publications.RemovalNotice do
  use Admin.Schema
  import Ecto.Changeset

  schema "removal_notices" do
    field :reason, :string
    belongs_to :user, Admin.Accounts.User

    timestamps(type: :utc_datetime, updated_at: false)
  end

  @doc false
  def changeset(removal_notice, attrs) do
    removal_notice
    |> cast(attrs, [:reason, :user_id])
    |> validate_required([:reason, :user_id])
  end
end
