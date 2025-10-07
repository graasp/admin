defmodule AdminWeb.AssistantLive.Index do
  use AdminWeb, :live_view

  alias Admin.SmartAssistants

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Listing Assistants
        <:actions>
          <.button variant="primary" navigate={~p"/assistants/new"}>
            <.icon name="hero-plus" /> New Assistant
          </.button>
        </:actions>
      </.header>

      <.table
        id="assistants"
        rows={@streams.assistants}
        row_click={fn {_id, assistant} -> JS.navigate(~p"/assistants/#{assistant}") end}
      >
        <:col :let={{_id, assistant}} label="Picture">
          <img src={assistant.picture} class="w-20 h-20 rounded object-cover" />
        </:col>
        <:col :let={{_id, assistant}} label="Name">{assistant.name}</:col>
        <:col :let={{_id, assistant}} label="Prompt">{assistant.prompt}</:col>
        <:action :let={{_id, assistant}}>
          <div class="sr-only">
            <.link navigate={~p"/assistants/#{assistant}"}>Show</.link>
          </div>
          <.link navigate={~p"/assistants/#{assistant}/edit"}>Edit</.link>
        </:action>
        <:action :let={{id, assistant}}>
          <.link
            phx-click={JS.push("delete", value: %{id: assistant.id}) |> hide("##{id}")}
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
      SmartAssistants.subscribe_assistants(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Listing Assistants")
     |> stream(:assistants, SmartAssistants.list_assistants(socket.assigns.current_scope))}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    assistant = SmartAssistants.get_assistant!(socket.assigns.current_scope, id)
    {:ok, _} = SmartAssistants.delete_assistant(socket.assigns.current_scope, assistant)

    {:noreply, stream_delete(socket, :assistants, assistant)}
  end

  @impl true
  def handle_info({type, %Admin.SmartAssistants.Assistant{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply,
     stream(socket, :assistants, SmartAssistants.list_assistants(socket.assigns.current_scope),
       reset: true
     )}
  end
end
