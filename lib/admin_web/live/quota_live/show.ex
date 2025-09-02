defmodule AdminWeb.QuotaLive.Show do
  use AdminWeb, :live_view

  alias Admin.StorageQuota

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Quota {@quota.id}
        <:subtitle>This is a quota record from your database.</:subtitle>
        <:actions>
          <.button navigate={~p"/quotas"}>
            <.icon name="hero-arrow-left" />
          </.button>
          <.button variant="primary" navigate={~p"/quotas/#{@quota}/edit?return_to=show"}>
            <.icon name="hero-pencil-square" /> Edit quota
          </.button>
        </:actions>
      </.header>

      <.list>
        <:item title="Value">{@quota.value}</:item>
      </.list>
    </Layouts.app>
    """
  end

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    if connected?(socket) do
      StorageQuota.subscribe_quotas(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Show Quota")
     |> assign(:quota, StorageQuota.get_quota!(socket.assigns.current_scope, id))}
  end

  @impl true
  def handle_info(
        {:updated, %Admin.StorageQuota.Quota{id: id} = quota},
        %{assigns: %{quota: %{id: id}}} = socket
      ) do
    {:noreply, assign(socket, :quota, quota)}
  end

  def handle_info(
        {:deleted, %Admin.StorageQuota.Quota{id: id}},
        %{assigns: %{quota: %{id: id}}} = socket
      ) do
    {:noreply,
     socket
     |> put_flash(:error, "The current quota was deleted.")
     |> push_navigate(to: ~p"/quotas")}
  end

  def handle_info({type, %Admin.StorageQuota.Quota{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end
end
