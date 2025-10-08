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
                "w-[80%] rounded-2xl px-4 py-2",
                message.type == "user" && "bg-blue-100 self-end rounded-br-none",
                message.type == "assistant" && "bg-gray-100"
              ]}
            >
              <span>
                {message.content}
              </span>
            </div>
          <% end %>
        </div>
        <.form id="message-form" for={@form} phx-submit="submit" phx-change="validate">
          <div class="flex flex-row gap-2">
            <.input field={@form[:content]} />
            <.button type="submit" class="btn btn-primary self-top mt-1">
              Send <.icon class="size-5" name="hero-paper-airplane" />
            </.button>
          </div>
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
           %{content: "toto"}
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

      {:error, changeset} ->
        # Put errors back into the form while preserving entered value
        form =
          changeset
          |> Map.put(:action, :validate)
          |> to_form()

        {:noreply, socket |> assign(:form, form)}
    end
  end

  def handle_event("validate", %{"message" => %{"content" => content}}, socket) do
    {:noreply,
     socket
     |> assign(
       :form,
       to_form(
         SmartAssistants.change_message(
           socket.assigns.current_scope,
           socket.assigns.conversation.id,
           %Message{user_id: socket.assigns.current_scope.user.id},
           %{content: content}
         )
         |> Map.put(:action, :validate)
       )
     )}
  end
end
