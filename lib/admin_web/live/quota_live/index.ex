defmodule AdminWeb.QuotaLive.Index do
  use AdminWeb, :live_view

  alias Admin.StorageQuota

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Listing Quotas
        <:actions>
          <.button variant="primary" navigate={~p"/quotas/new"}>
            <.icon name="hero-plus" /> New Quota
          </.button>
        </:actions>
      </.header>

      <.table
        id="quotas"
        rows={@streams.quotas}
        row_click={fn {_id, quota} -> JS.navigate(~p"/quotas/#{quota}") end}
      >
        <:col :let={{_id, quota}} label="Value">{quota.value}</:col>
        <:action :let={{_id, quota}}>
          <div class="sr-only">
            <.link navigate={~p"/quotas/#{quota}"}>Show</.link>
          </div>
          <.link navigate={~p"/quotas/#{quota}/edit"}>Edit</.link>
        </:action>
        <:action :let={{id, quota}}>
          <.link
            phx-click={JS.push("delete", value: %{id: quota.id}) |> hide("##{id}")}
            data-confirm="Are you sure?"
          >
            Delete
          </.link>
        </:action>
      </.table>
    </Layouts.app>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    if connected?(socket) do
      StorageQuota.subscribe_quotas(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Listing Quotas")
     |> stream(:quotas, StorageQuota.list_quotas(socket.assigns.current_scope))}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    quota = StorageQuota.get_quota!(socket.assigns.current_scope, id)
    {:ok, _} = StorageQuota.delete_quota(socket.assigns.current_scope, quota)

    {:noreply, stream_delete(socket, :quotas, quota)}
  end

  @impl true
  def handle_info({type, %Admin.StorageQuota.Quota{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, stream(socket, :quotas, StorageQuota.list_quotas(socket.assigns.current_scope), reset: true)}
  end
end
