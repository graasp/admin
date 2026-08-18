defmodule Admin.Chatbot.AppData do
  @moduledoc """
  Mirrors core's `app_data` table (`appDataTable` in
  `core/src/drizzle/schema.ts`). Stores the chatbot's conversation messages
  (student comments and bot replies), scoped by `item_id`.
  """
  use Admin.Schema
  import Ecto.Changeset

  @valid_types ~w(comment bot-comment)
  @valid_visibilities ~w(member item)

  schema "app_data" do
    field :type, :string
    field :data, :map, default: %{}
    field :visibility, :string, default: "member"

    belongs_to :item, Admin.Items.Item, type: :binary_id
    belongs_to :account, Admin.Accounts.Account, type: :binary_id
    belongs_to :creator, Admin.Accounts.Account, type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(app_data, attrs) do
    app_data
    |> cast(attrs, [:type, :data, :visibility, :item_id, :account_id, :creator_id])
    |> validate_required([:type, :data, :visibility, :item_id, :account_id])
    |> validate_inclusion(:type, @valid_types)
    |> validate_inclusion(:visibility, @valid_visibilities)
    # constraint names come from core's migration (core/src/drizzle/schema.ts,
    # `appDataTable`) — Ecto matches on the DB's actual constraint name to
    # turn a Postgrex FK violation into a changeset error instead of raising.
    |> foreign_key_constraint(:item_id, name: "FK_8c3e2463c67d9865658941c9e2d")
    |> foreign_key_constraint(:account_id, name: "FK_app_data_account_id")
    |> foreign_key_constraint(:creator_id, name: "FK_27cb180cb3f372e4cf55302644a")
  end
end
