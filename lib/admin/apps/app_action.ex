defmodule Admin.Apps.AppAction do
  @moduledoc """
  Mirrors core's `app_action` table (`appActionsTable` in
  `core/src/drizzle/schema.ts`). Logs chatbot usage events (e.g.
  "ask-chatbot"), scoped by `item_id`. No `updated_at` column, matching core.
  """
  use Admin.Schema
  import Ecto.Changeset

  schema "app_action" do
    field :type, :string
    field :data, :map, default: %{}

    belongs_to :item, Admin.Items.Item, type: :binary_id
    belongs_to :account, Admin.Accounts.Account, type: :binary_id

    timestamps(updated_at: false, type: :utc_datetime)
  end

  @doc false
  def changeset(app_action, attrs) do
    app_action
    |> cast(attrs, [:type, :data, :item_id, :account_id])
    |> validate_required([:type, :data, :item_id, :account_id])
    # constraint names come from core's migration (core/src/drizzle/schema.ts,
    # `appActionsTable`)
    |> foreign_key_constraint(:item_id, name: "FK_c415fc186dda51fa260d338d776")
    |> foreign_key_constraint(:account_id, name: "FK_app_action_account_id")
  end
end
