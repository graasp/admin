defmodule Admin.Chatbot.AppSetting do
  @moduledoc """
  Mirrors core's `app_setting` table (`appSettingsTable` in
  `core/src/drizzle/schema.ts`). Stores the teacher-configured chatbot
  settings (name, initial prompt, cue, starter suggestions, avatar), keyed by
  `name` and scoped by `item_id`.
  """
  use Admin.Schema
  import Ecto.Changeset

  schema "app_setting" do
    field :name, :string
    field :data, :map, default: %{}

    belongs_to :item, Admin.Items.Item, type: :binary_id
    belongs_to :creator, Admin.Accounts.Account, type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(app_setting, attrs) do
    app_setting
    |> cast(attrs, [:id, :name, :data, :item_id, :creator_id])
    |> validate_required([:name, :data, :item_id])
    # constraint names come from core's migration (core/src/drizzle/schema.ts,
    # `appSettingsTable`)
    |> foreign_key_constraint(:item_id, name: "FK_f5922b885e2680beab8add96008")
    |> foreign_key_constraint(:creator_id, name: "FK_22d3d051ee6f94932c1373a3d09")
  end
end
