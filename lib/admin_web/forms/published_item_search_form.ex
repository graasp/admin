defmodule AdminWeb.Forms.PublishedItemSearchForm do
  alias Admin.Publications
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
    |> validate_uuid(:item_id)
    |> maybe_validate_id_exists()
    |> Map.put(:action, :validate)
  end

  defp validate_uuid(changeset, field) do
    validate_change(changeset, field, fn _, value ->
      case Ecto.UUID.cast(value) do
        {:ok, _} -> []
        :error -> [{field, "is not a valid UUID"}]
      end
    end)
  end

  @spec maybe_validate_id_exists(Ecto.Changeset.t()) :: Ecto.Changeset.t()
  defp maybe_validate_id_exists(%Ecto.Changeset{valid?: false} = changeset), do: changeset

  defp maybe_validate_id_exists(changeset) do
    item_id = Ecto.Changeset.get_field(changeset, :item_id)

    if Publications.exists?(item_id) do
      changeset
    else
      Ecto.Changeset.add_error(
        changeset,
        :item_id,
        "Publication with id '#{item_id}' could not be found"
      )
    end
  end
end
