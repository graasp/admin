defmodule AdminWeb.QuotaLive.Form do
  use AdminWeb, :live_view

  alias Admin.StorageQuota
  alias Admin.StorageQuota.Quota

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        {@page_title}
        <:subtitle>Use this form to manage quota records in your database.</:subtitle>
      </.header>

      <.form for={@form} id="quota-form" phx-change="validate" phx-submit="save">
        <.input field={@form[:value]} type="number" label="Value" step="any" />
        <footer>
          <.button phx-disable-with="Saving..." variant="primary">Save Quota</.button>
          <.button navigate={return_path(@current_scope, @return_to, @quota)}>Cancel</.button>
        </footer>
      </.form>
    </Layouts.app>
    """
  end

  @impl true
  def mount(params, _session, socket) do
    {:ok,
     socket
     |> assign(:return_to, return_to(params["return_to"]))
     |> apply_action(socket.assigns.live_action, params)}
  end

  defp return_to("show"), do: "show"
  defp return_to(_), do: "index"

  defp apply_action(socket, :edit, %{"id" => id}) do
    quota = StorageQuota.get_quota!(socket.assigns.current_scope, id)

    socket
    |> assign(:page_title, "Edit Quota")
    |> assign(:quota, quota)
    |> assign(:form, to_form(StorageQuota.change_quota(socket.assigns.current_scope, quota)))
  end

  defp apply_action(socket, :new, _params) do
    quota = %Quota{user_id: socket.assigns.current_scope.user.id}

    socket
    |> assign(:page_title, "New Quota")
    |> assign(:quota, quota)
    |> assign(:form, to_form(StorageQuota.change_quota(socket.assigns.current_scope, quota)))
  end

  @impl true
  def handle_event("validate", %{"quota" => quota_params}, socket) do
    changeset = StorageQuota.change_quota(socket.assigns.current_scope, socket.assigns.quota, quota_params)
    {:noreply, assign(socket, form: to_form(changeset, action: :validate))}
  end

  def handle_event("save", %{"quota" => quota_params}, socket) do
    save_quota(socket, socket.assigns.live_action, quota_params)
  end

  defp save_quota(socket, :edit, quota_params) do
    case StorageQuota.update_quota(socket.assigns.current_scope, socket.assigns.quota, quota_params) do
      {:ok, quota} ->
        {:noreply,
         socket
         |> put_flash(:info, "Quota updated successfully")
         |> push_navigate(
           to: return_path(socket.assigns.current_scope, socket.assigns.return_to, quota)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp save_quota(socket, :new, quota_params) do
    case StorageQuota.create_quota(socket.assigns.current_scope, quota_params) do
      {:ok, quota} ->
        {:noreply,
         socket
         |> put_flash(:info, "Quota created successfully")
         |> push_navigate(
           to: return_path(socket.assigns.current_scope, socket.assigns.return_to, quota)
         )}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, form: to_form(changeset))}
    end
  end

  defp return_path(_scope, "index", _quota), do: ~p"/quotas"
  defp return_path(_scope, "show", quota), do: ~p"/quotas/#{quota}"
end
