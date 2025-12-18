defmodule AdminWeb.PlannedMaintenanceController do
  use AdminWeb, :controller

  alias Admin.Maintenance
  alias Admin.Maintenance.PlannedMaintenance

  def index(conn, _params) do
    maintenance = Maintenance.list_upcoming_maintenance()
    render(conn, :index, maintenance: maintenance)
  end

  def new(conn, _params) do
    changeset = Maintenance.change_planned_maintenance(%PlannedMaintenance{})
    render(conn, :new, changeset: changeset)
  end

  def create(conn, %{"planned_maintenance" => planned_maintenance_params}) do
    case Maintenance.create_planned_maintenance(planned_maintenance_params) do
      {:ok, planned_maintenance} ->
        conn
        |> put_flash(:info, "Planned maintenance created successfully.")
        |> redirect(to: ~p"/admin/maintenance/#{planned_maintenance}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :new, changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    planned_maintenance = Maintenance.get_planned_maintenance!(id)
    render(conn, :show, planned_maintenance: planned_maintenance)
  end

  def edit(conn, %{"id" => id}) do
    planned_maintenance = Maintenance.get_planned_maintenance!(id)
    changeset = Maintenance.change_planned_maintenance(planned_maintenance)
    render(conn, :edit, planned_maintenance: planned_maintenance, changeset: changeset)
  end

  def update(conn, %{"id" => id, "planned_maintenance" => planned_maintenance_params}) do
    planned_maintenance = Maintenance.get_planned_maintenance!(id)

    case Maintenance.update_planned_maintenance(planned_maintenance, planned_maintenance_params) do
      {:ok, planned_maintenance} ->
        conn
        |> put_flash(:info, "Planned maintenance updated successfully.")
        |> redirect(to: ~p"/admin/maintenance/#{planned_maintenance}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :edit, planned_maintenance: planned_maintenance, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    planned_maintenance = Maintenance.get_planned_maintenance!(id)
    {:ok, _planned_maintenance} = Maintenance.delete_planned_maintenance(planned_maintenance)

    conn
    |> put_flash(:info, "Planned maintenance deleted successfully.")
    |> redirect(to: ~p"/admin/maintenance")
  end
end
