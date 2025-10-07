defmodule Admin.SmartAssistants.Assistant do
  @moduledoc """
  This module provides the struct for representing and storing a Smart assistant

  Smart assistants are AI enabled conversation partners that can privide feedback
  and improve learning experiences.
  """
  use Admin.Schema
  import Ecto.Changeset

  schema "assistants" do
    field :name, :string
    field :prompt, :string
    field :shared_at, :utc_datetime
    field :picture, :string
    field :user_id, :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(assistant, attrs, user_scope) do
    assistant
    |> cast(attrs, [:name, :prompt, :shared_at, :picture])
    |> validate_required([:name, :prompt, :picture])
    |> put_change(:user_id, user_scope.user.id)
  end
end
