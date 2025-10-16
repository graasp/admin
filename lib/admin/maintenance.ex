defmodule Admin.Maintenance do
  @moduledoc """
  The Maintenance context.
  """

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.Maintenance.PlannedMaintenance

  @doc """
  Returns the list of upcoming maintenance events.

  ## Examples

      iex> list_maintenance()
      [%PlannedMaintenance{}, ...]

  """
  def list_upcoming_maintenance do
    Repo.all(
      from maintenance in PlannedMaintenance,
        where: maintenance.end_at > ^DateTime.utc_now(),
        order_by: [asc: :start_at],
        limit: 10
    )
  end

  @doc """
  Gets a single planned_maintenance.

  Raises `Ecto.NoResultsError` if the Planned maintenance does not exist.

  ## Examples

      iex> get_planned_maintenance!(123)
      %PlannedMaintenance{}

      iex> get_planned_maintenance!(456)
      ** (Ecto.NoResultsError)

  """
  def get_planned_maintenance!(slug), do: Repo.get!(PlannedMaintenance, slug)

  @doc """
  Creates a planned_maintenance.

  ## Examples

      iex> create_planned_maintenance(%{field: value})
      {:ok, %PlannedMaintenance{}}

      iex> create_planned_maintenance(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_planned_maintenance(attrs) do
    %PlannedMaintenance{}
    |> PlannedMaintenance.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a planned_maintenance.

  ## Examples

      iex> update_planned_maintenance(planned_maintenance, %{field: new_value})
      {:ok, %PlannedMaintenance{}}

      iex> update_planned_maintenance(planned_maintenance, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_planned_maintenance(%PlannedMaintenance{} = planned_maintenance, attrs) do
    planned_maintenance
    |> PlannedMaintenance.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a planned_maintenance.

  ## Examples

      iex> delete_planned_maintenance(planned_maintenance)
      {:ok, %PlannedMaintenance{}}

      iex> delete_planned_maintenance(planned_maintenance)
      {:error, %Ecto.Changeset{}}

  """
  def delete_planned_maintenance(%PlannedMaintenance{} = planned_maintenance) do
    Repo.delete(planned_maintenance)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking planned_maintenance changes.

  ## Examples

      iex> change_planned_maintenance(planned_maintenance)
      %Ecto.Changeset{data: %PlannedMaintenance{}}

  """
  def change_planned_maintenance(%PlannedMaintenance{} = planned_maintenance, attrs \\ %{}) do
    PlannedMaintenance.changeset(planned_maintenance, attrs)
  end
end
