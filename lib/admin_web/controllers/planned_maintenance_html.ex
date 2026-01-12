defmodule AdminWeb.PlannedMaintenanceHTML do
  use AdminWeb, :html

  embed_templates "planned_maintenance_html/*"

  @doc """
  Renders a planned_maintenance form.

  The form is defined in the template at
  planned_maintenance_html/planned_maintenance_form.html.heex
  """
  attr :changeset, Ecto.Changeset, required: true
  attr :action, :string, required: true
  attr :return_to, :string, default: nil

  def planned_maintenance_form(assigns)

  attr :maintenance, Admin.Maintenance.PlannedMaintenance, required: true
  attr :row_click, :any, default: nil, doc: "the function for handling phx-click on each row"

  def planned_maintenance_row(assigns) do
    ~H"""
    <div
      class={["flex flex-col pb-1", @row_click && "hover:cursor-pointer"]}
      phx-click={@row_click && @row_click.(@maintenance)}
    >
      <span>{@maintenance.slug}</span>
      <div class="text-xs">
        Start: <.relative_date date={@maintenance.start_at} />
        <span class="text-secondary">({"#{@maintenance.start_at}"})</span>
      </div>
      <div class="text-xs">
        End: <.relative_date date={@maintenance.end_at} />
        <span class="text-secondary">
          ({"#{@maintenance.end_at}"})
        </span>
      </div>
    </div>
    """
  end
end
