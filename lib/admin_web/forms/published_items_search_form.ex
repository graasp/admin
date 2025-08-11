defmodule AdminWeb.Forms.PublicationItemForm do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field :item_id, :string
  end

  def changeset(form, params) do
    form
    |> cast(params, [:item_id])
    |> validate_required([:item_id])
    # Only digits
    |> validate_format(:item_id, ~r/^\d+$/)
    |> Map.put(:action, :validate)
  end
end
