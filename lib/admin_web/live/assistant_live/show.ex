defmodule AdminWeb.AssistantLive.Show do
  use AdminWeb, :live_view

  alias Admin.SmartAssistants

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <.header>
        Assistant {@assistant.id}
        <:subtitle>This is a assistant record from your database.</:subtitle>
        <:actions>
          <.button navigate={~p"/assistants"}>
            <.icon name="hero-arrow-left" />
          </.button>
          <.button variant="primary" navigate={~p"/assistants/#{@assistant}/edit?return_to=show"}>
            <.icon name="hero-pencil-square" /> Edit assistant
          </.button>
        </:actions>
      </.header>

      <div class="flex flex-row items-center w-full gap-2">
        <img src={@assistant.picture} class="size-20 rounded" alt="Assistant Picture" />
        <div class="flex flex-col items-start justify-center gap-1">
          <h2 class="text-lg font-bold">{@assistant.name}</h2>
          <p>{@assistant.prompt}</p>
        </div>
      </div>

      <.header>
        Conversations
        <:actions>
          <.button
            variant="primary"
            phx-click="create_conversation"
          >
            New Conversation
          </.button>
        </:actions>
      </.header>
      <.table id="conversations" rows={@streams.conversations}>
        <:col :let={{_id, conversation}} label="Created at">{conversation.created_at}</:col>
      </.table>
    </Layouts.app>
    """
  end

  @impl true
  def mount(%{"assistant_id" => id}, _session, socket) do
    if connected?(socket) do
      SmartAssistants.subscribe_assistants(socket.assigns.current_scope)
    end

    {:ok,
     socket
     |> assign(:page_title, "Show Assistant")
     |> assign(:assistant, SmartAssistants.get_assistant!(socket.assigns.current_scope, id))
     |> stream(
       :conversations,
       SmartAssistants.get_conversations(socket.assigns.current_scope, id)
     )}
  end

  @impl true
  def handle_event("create_conversation", _params, socket) do
    {:ok, new_conversation} =
      SmartAssistants.create_conversation(socket.assigns.current_scope, %{})

    {:noreply,
     socket
     |> redirect(to: ~p"/assistants/conversations/#{new_conversation}")}
  end

  @impl true
  def handle_info(
        {:updated, %SmartAssistants.Assistant{id: id} = assistant},
        %{assigns: %{assistant: %{id: id}}} = socket
      ) do
    {:noreply, assign(socket, :assistant, assistant)}
  end

  def handle_info(
        {:deleted, %SmartAssistants.Assistant{id: id}},
        %{assigns: %{assistant: %{id: id}}} = socket
      ) do
    {:noreply,
     socket
     |> put_flash(:error, "The current assistant was deleted.")
     |> push_navigate(to: ~p"/assistants")}
  end

  def handle_info({type, %SmartAssistants.Assistant{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, socket}
  end
end
