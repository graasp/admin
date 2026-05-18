defmodule Admin.Tags.ItemTag do
  use Ecto.Schema

  @primary_key false
  @foreign_key_type :binary_id

  schema "item_tag" do
    belongs_to :tag, Admin.Tags.Tag
    belongs_to :item, Admin.Items.Item
  end
end
