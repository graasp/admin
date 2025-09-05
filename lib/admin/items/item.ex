defmodule Admin.Items.Item do
  use Admin.Schema
  import Ecto.Changeset

  schema "item" do
    field :name, :string
    field :description, :string
    field :path, :string
    field :extra, :map
    field :type, :string
    field :settings, :map
    # TODO: udpate to use the relation to member later
    belongs_to :creator, Admin.Accounts.Account, type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:name, :description, :path, :extra, :type, :settings, :creator_id])
    |> validate_required([:name, :description, :path, :type, :creator_id])
  end
end
