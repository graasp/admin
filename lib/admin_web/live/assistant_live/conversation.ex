defmodule AdminWeb.AssistantLive.Conversation do
  @moduledoc """
  A live component that hanles a conversation
  """
  use AdminWeb, :live_view

  alias Admin.SmartAssistants
  alias Admin.SmartAssistants.Message

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope} class={["h-[calc(100vh-64px)]"]}>
      <div class="flex flex-col h-full">
        <.header>
          Conversation from #{@conversation.created_at}
        </.header>
        <div
          id="messages"
          phx-update="stream"
          class="max-h-full flex flex-col gap-2 grow overflow-y-auto"
        >
          <%= for {id, message} <- @streams.messages do %>
            <div
              id={id}
              class={[
                "w-[80%] rounded-lg p-2",
                message.type == "user" && "bg-blue-100 self-end",
                message.type == "assistant" && "bg-gray-100"
              ]}
            >
              <span>
                {message.content}
              </span>
            </div>
          <% end %>
        </div>
        <.form for={@form} phx-submit="submit">
          <.input id="message-input" as={:message} field={@form[:content]} />
        </.form>
      </div>
    </Layouts.app>
    """
  end

  @impl true
  def mount(%{"conversation_id" => id}, _session, socket) do
    if connected?(socket) do
      SmartAssistants.subscribe_messages(socket.assigns.current_scope, id)
    end

    conversation = SmartAssistants.get_conversation!(socket.assigns.current_scope, id)

    {:ok,
     socket
     |> assign(
       :conversation,
       conversation
     )
     |> assign(
       :form,
       to_form(
         SmartAssistants.change_message(
           socket.assigns.current_scope,
           conversation.id,
           %Message{user_id: socket.assigns.current_scope.user.id},
           %{content: ""}
         )
       )
     )
     |> stream(
       :messages,
       SmartAssistants.list_messages(socket.assigns.current_scope, conversation.id)
     )}
  end

  @impl true
  def handle_event("submit", %{"message" => %{"content" => content}}, socket) do
    case SmartAssistants.create_message(
           socket.assigns.current_scope,
           %{
             content: content,
             type: "user"
           },
           socket.assigns.conversation.id
         ) do
      {:ok, message} ->
        {:noreply,
         socket
         |> stream_insert(:messages, message)
         |> assign(
           :form,
           to_form(
             SmartAssistants.change_message(
               socket.assigns.current_scope,
               socket.assigns.conversation.id,
               %Message{user_id: socket.assigns.current_scope.user.id},
               %{content: ""}
             )
           )
         )}

      {:error, reason} ->
        {:noreply, socket |> put_flash(:error, reason)}
    end
  end
end
