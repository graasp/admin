defmodule Admin.Actions.Action do
  use Admin.Schema
  import Ecto.Changeset

  @valid_views ~w(unknown builder player library analytics)

  schema "action" do
    field :type, :string
    field :extra, :map, default: %{}
    field :geolocation, :map
    field :view, :string, default: "unknown"

    belongs_to :account, Admin.Accounts.Account, type: :binary_id
    belongs_to :item, Admin.Items.Item, type: :binary_id

    timestamps(updated_at: false, type: :utc_datetime)
  end

  def changeset(action, attrs) do
    action
    |> cast(attrs, [:type, :extra, :geolocation, :view, :account_id, :item_id])
    |> validate_required([:type])
    |> validate_inclusion(:view, @valid_views)
  end
end
