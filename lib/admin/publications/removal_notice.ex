defmodule Admin.Publications.PublicationRemovalNotice do
  use Admin.Schema
  import Ecto.Changeset

  schema "publication_removal_notices" do
    field :publication_name, :string
    field :reason, :string
    belongs_to :item, Admin.Items.Item
    belongs_to :creator, Admin.Accounts.User

    timestamps(type: :utc_datetime, updated_at: false)
  end

  @doc false
  def changeset(removal_notice, attrs, published_item, current_scope) do
    removal_notice
    |> cast(attrs, [:reason])
    |> validate_required([:reason])
    |> put_change(:publication_name, published_item.item.name)
    |> put_change(:item_id, published_item.item.id)
    |> put_change(:creator_id, current_scope.user.id)
  end
end
