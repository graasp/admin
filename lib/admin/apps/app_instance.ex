defmodule Admin.Apps.AppInstance do
  @moduledoc """
  This represents an interactiv app in Graasp.
  """
  use Admin.Schema
  import Ecto.Changeset
  alias Admin.Apps
  alias Admin.Validators

  schema "apps" do
    field :name, :string
    field :key, :binary_id
    field :description, :string
    field :url, :string
    field :thumbnail, :string

    # add publisher relationship
    belongs_to :publisher, Apps.Publisher

    timestamps(type: :utc_datetime)
  end

  @doc false
  def update_changeset(app_instance, attrs) do
    app_instance
    |> cast(attrs, [:name, :description, :url, :thumbnail, :key])
    |> unsafe_validate_unique(:url, Admin.Repo,
      message: "This URL is already used for another app. URLs must be unique."
    )
    |> add_uuid_if_missing(:key)
    |> validate_required([:name, :description, :url, :thumbnail, :key])
    |> Validators.validate_url(:url)
    |> unique_constraint(:url, name: "app_url_key")
    |> Validators.validate_uuid(:key)
  end

  @doc false
  def changeset(app_instance, publisher, attrs) do
    update_changeset(app_instance, attrs)
    |> put_change(:publisher_id, publisher.id)
  end

  defp add_uuid_if_missing(changeset, field) do
    case get_field(changeset, field) do
      nil -> put_change(changeset, field, Ecto.UUID.generate())
      _ -> changeset
    end
  end
end
