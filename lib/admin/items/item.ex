defmodule Admin.Items.Item do
  @moduledoc """
  This represents an item in Graasp
  """
  use Admin.Schema
  import Ecto.Changeset
  alias EctoLtree.LabelTree, as: Ltree

  schema "item" do
    field :name, :string
    field :description, :string
    field :path, Ltree
    field :extra, :map
    field :type, :string
    field :settings, :map
    field :lang, :string, default: "en"
    field :order, :decimal
    field :deleted_at, :utc_datetime
    belongs_to :creator, Admin.Accounts.Account, type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [
      :id,
      :name,
      :description,
      :path,
      :extra,
      :type,
      :settings,
      :creator_id,
      :lang,
      :order
    ])
    |> validate_required([:name, :description, :path, :type, :creator_id, :lang])
  end
end
