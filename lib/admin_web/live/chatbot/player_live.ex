defmodule AdminWeb.Chatbot.PlayerLive do
  @moduledoc """
  The chatbot app's single entry point — renders the teacher settings panel
  plus the chat for `permission == "admin"`, or just the chat otherwise,
  matching the React app's `BuilderView` switch (only `PermissionLevel.Admin`
  gets the admin view; everyone else, including `write`, gets the player).
  One LiveView (rather than a separate route per view) because the Graasp
  platform embeds a single iframe URL per app instance — there's no page
  navigation to hang a second `phx-hook` handshake off of.

  Rendered inside an iframe embedded by the Graasp platform. On mount it
  only knows `itemId` from the query string; the `GraaspAppContext` JS hook
  (assets/js/hooks/graasp_context.js) completes a postMessage handshake with
  the parent window — mirroring the protocol used by
  `graasp-apps-query-client` — to fetch the local context and a short-lived
  auth token, pushed back here via the `"graasp_context"` event, where the
  token is verified against `itemId` (`Admin.Chatbot.Token`).

  Once verified, the existing thread (`app_data`) and chatbot settings
  (`app_setting`, name `"chatbot-prompt"`) are loaded via `Admin.Chatbot`.
  Sending a message persists the student's comment, streams a reply from
  OpenAI (`Admin.Chatbot.OpenAI`, token-by-token via `handle_info/2` for the
  "typing" effect), then persists the assistant's reply once the stream
  completes. The teacher's settings form (`Admin.Chatbot.PromptSettings`)
  writes to the same `app_setting` row and takes effect immediately — no
  reload needed since it's the same process/assigns driving the chat below.

  Note: `item_id`/`account_id` must be real rows in the shared `graasp` DB
  for the message/action inserts to succeed (both are foreign keys). The dev
  mock (`/dev/chatbot-mock?itemId=...&accountId=...`) lets you pass real ids
  from a locally seeded core DB.
  """
  use AdminWeb, :live_view

  alias Admin.Apps.AppData
  alias Admin.Apps.Token
  alias Admin.Chatbot
  alias Admin.Chatbot.Avatar
  alias Admin.Chatbot.Markdown
  alias Admin.Chatbot.OpenAI
  alias Admin.Chatbot.PromptSettings

  defp default_cue, do: dgettext("chatbot", "Hi! Ask me anything about this activity.")
  defp default_chatbot_name, do: dgettext("chatbot", "Chatbot")

  defp default_settings do
    %{
      initial_prompt: nil,
      cue: default_cue(),
      name: default_chatbot_name(),
      starter_suggestions: [],
      avatar_data_url: nil
    }
  end

  @impl true
  def mount(params, _session, socket) do
    item_id = Map.get(params, "itemId")

    socket =
      socket
      |> assign(:item_id, item_id)
      |> assign(:app_key, Application.fetch_env!(:admin, :graasp_app_key))
      |> assign(:status, if(item_id, do: :awaiting_context, else: :missing_item_id))
      |> assign(:account_id, nil)
      |> assign(:permission, nil)
      |> assign(:is_teacher?, false)
      |> assign(:error, nil)
      |> assign(:settings, default_settings())
      |> assign(
        :settings_form,
        to_form(PromptSettings.changeset(%PromptSettings{}, %{}), as: :prompt_settings)
      )
      |> assign(:starter_suggestions, [])
      |> assign(:view, :conversations)
      |> assign(:conversations, [])
      |> assign(:active_conversation_id, nil)
      |> assign(:thread, [])
      |> assign(:pending, nil)
      |> assign(:sending?, false)
      |> assign(:chat_form, to_form(%{"content" => ""}, as: :message))
      |> assign(:avatar_form, to_form(%{}, as: :avatar))
      |> allow_upload(:avatar,
        accept: ~w(.png .jpg .jpeg .webp),
        max_entries: 1,
        max_file_size: 500_000,
        auto_upload: true,
        progress: &handle_avatar_progress/3
      )

    {:ok, socket}
  end

  @impl true
  def handle_event("graasp_context", %{"token" => token, "context" => context}, socket) do
    case Token.verify(token, socket.assigns.item_id) do
      {:ok, %{account_id: account_id}} ->
        item_id = socket.assigns.item_id
        permission = Map.get(context, "permission")
        app_context = Map.get(context, "context")

        # sets the Gettext locale for this LiveView process (it's process-scoped
        # in Gettext, so this persists for every subsequent render/flash here)
        # from the language the Graasp platform passed in, falling back to the
        # default if it's missing or not one we have translations for. Note the
        # very first static render (before the websocket connects and this
        # event fires) always happens in the default locale — there's no way
        # to know the language before this handshake completes.
        locale =
          if Map.get(context, "lang") in AdminWeb.Localization.supported_locales() do
            context["lang"]
          else
            AdminWeb.Gettext.default_locale()
          end

        Gettext.put_locale(locale)

        socket =
          socket
          |> assign(:status, :ready)
          |> assign(:account_id, account_id)
          |> assign(:permission, permission)
          # mirrors the React app: App.tsx routes the "builder" context to
          # BuilderView, which itself only shows the teacher (Admin) view for
          # PermissionLevel.Admin — everything else (player context, or
          # builder context with write/read permission) is the student view.
          |> assign(:is_teacher?, app_context == "builder" and permission == "admin")
          |> refresh_settings()
          |> assign(:conversations, Chatbot.list_conversations(item_id, account_id))

        {:noreply, socket}

      {:error, reason} ->
        {:noreply, socket |> assign(:status, :error) |> assign(:error, reason)}
    end
  end

  def handle_event("graasp_context_error", %{"reason" => reason}, socket) do
    {:noreply, socket |> assign(:status, :error) |> assign(:error, reason)}
  end

  def handle_event("select_conversation", %{"id" => id}, socket) do
    conversation_id = normalize_conversation_id(id)
    %{item_id: item_id, account_id: account_id} = socket.assigns

    socket =
      socket
      |> assign(:view, :thread)
      |> assign(:active_conversation_id, conversation_id)
      |> assign(:thread, load_thread(item_id, account_id, conversation_id))
      |> assign(:pending, nil)

    {:noreply, socket}
  end

  def handle_event("new_conversation", _params, socket) do
    socket =
      socket
      |> assign(:view, :thread)
      |> assign(:active_conversation_id, Ecto.UUID.generate())
      |> assign(:thread, [])
      |> assign(:pending, nil)

    {:noreply, socket}
  end

  def handle_event("back_to_conversations", _params, socket) do
    %{item_id: item_id, account_id: account_id} = socket.assigns

    socket =
      socket
      |> assign(:view, :conversations)
      |> assign(:active_conversation_id, nil)
      |> assign(:conversations, Chatbot.list_conversations(item_id, account_id))

    {:noreply, socket}
  end

  def handle_event("validate_settings", %{"prompt_settings" => params}, socket) do
    form =
      %PromptSettings{}
      |> PromptSettings.changeset(params)
      |> Map.put(:action, :validate)
      |> to_form(as: :prompt_settings)

    {:noreply, assign(socket, :settings_form, form)}
  end

  def handle_event("delete_conversation", %{"id" => id}, socket) do
    conversation_id = normalize_conversation_id(id)
    %{item_id: item_id, account_id: account_id} = socket.assigns

    Chatbot.delete_conversation(item_id, account_id, conversation_id)

    {:noreply, assign(socket, :conversations, Chatbot.list_conversations(item_id, account_id))}
  end

  def handle_event("save_settings", %{"prompt_settings" => params}, socket) do
    changeset = PromptSettings.changeset(%PromptSettings{}, params)

    case Ecto.Changeset.apply_action(changeset, :update) do
      {:ok, _prompt_settings} ->
        %{item_id: item_id, account_id: account_id, starter_suggestions: starter_suggestions} =
          socket.assigns

        {:ok, _app_setting} =
          Chatbot.upsert_setting(
            item_id,
            "chatbot-prompt",
            PromptSettings.to_data(changeset, Enum.map(starter_suggestions, & &1.value)),
            account_id
          )

        socket =
          socket
          |> refresh_settings()
          |> put_flash(:info, dgettext("chatbot", "Chatbot settings saved."))

        {:noreply, socket}

      {:error, changeset} ->
        {:noreply, assign(socket, :settings_form, to_form(changeset, as: :prompt_settings))}
    end
  end

  # Structure-only edits to the starter-suggestion rows (add/remove/edit) —
  # mirrors the React app's local `starterSuggestions` state
  # (ChatbotEditingView.tsx), kept outside the `:settings_form` changeset
  # since it isn't a plain field. Ids are assigned once per row (max existing
  # id + 1, like the React app) so removing/reordering rows doesn't reuse an
  # id another row still owns.
  def handle_event("add_starter_suggestion", _params, socket) do
    next_id =
      case socket.assigns.starter_suggestions do
        [] -> 0
        list -> 1 + Enum.max_by(list, & &1.id).id
      end

    {:noreply, update(socket, :starter_suggestions, &(&1 ++ [%{id: next_id, value: ""}]))}
  end

  def handle_event("remove_starter_suggestion", %{"id" => id}, socket) do
    id = String.to_integer(id)
    {:noreply, update(socket, :starter_suggestions, &Enum.reject(&1, fn s -> s.id == id end))}
  end

  # Each row's input has its own unique `name` ("starter_suggestion_<id>")
  # rather than a shared name + `phx-value-id`, because nesting phx-change
  # inside the settings `<.form>` makes LiveView serialize it as a form
  # field change — `_target`/the field's own name are what's reliably sent,
  # not sibling phx-value-* attributes.
  def handle_event("edit_starter_suggestion", %{"_target" => [target_name]} = params, socket) do
    "starter_suggestion_" <> id_str = target_name
    id = String.to_integer(id_str)
    value = Map.get(params, target_name, "")

    socket =
      update(socket, :starter_suggestions, fn list ->
        Enum.map(list, fn
          %{id: ^id} = s -> %{s | value: value}
          s -> s
        end)
      end)

    {:noreply, socket}
  end

  # required by LiveView uploads even though we only care about the final
  # submit — this is what drives upload progress/entry tracking
  def handle_event("validate_avatar", _params, socket), do: {:noreply, socket}

  def handle_event("remove_avatar", _params, socket) do
    %{item_id: item_id, account_id: account_id} = socket.assigns

    case Chatbot.get_setting(item_id, "chatbot-avatar") do
      %{id: setting_id} -> :ok = Avatar.delete(item_id, setting_id)
      nil -> :ok
    end

    {:ok, _app_setting} = Chatbot.upsert_setting(item_id, "chatbot-avatar", %{}, account_id)
    {:noreply, refresh_avatar(socket)}
  end

  def handle_event("send_suggestion", %{"content" => content}, socket) do
    if socket.assigns.sending? do
      {:noreply, socket}
    else
      %{item_id: item_id, account_id: account_id} = socket.assigns
      socket = send_message(socket, content)
      Chatbot.create_action(item_id, account_id, "use-starter-suggestion", %{"value" => content})
      {:noreply, socket}
    end
  end

  def handle_event("send_message", %{"message" => %{"content" => content}}, socket) do
    content = String.trim(content)

    if content == "" or socket.assigns.sending? do
      {:noreply, socket}
    else
      {:noreply, send_message(socket, content)}
    end
  end

  defp send_message(socket, content) do
    %{
      item_id: item_id,
      account_id: account_id,
      thread: thread,
      settings: settings,
      active_conversation_id: conversation_id
    } = socket.assigns

    {socket, thread, prompt_history} =
      ensure_cue_persisted(socket, thread, settings, item_id, account_id, conversation_id)

    case Chatbot.create_message(item_id, account_id, "comment", conversation_id, %{
           "content" => content
         }) do
      {:ok, user_message} ->
        prompt = OpenAI.build_prompt(settings.initial_prompt, prompt_history, content)
        ref = OpenAI.stream_completion(prompt)

        socket
        |> assign(:thread, thread ++ [to_thread_message(user_message)])
        |> assign(:pending, %{ref: ref, content: "", user_message_id: user_message.id})
        |> assign(:sending?, true)
        |> assign(:chat_form, to_form(%{"content" => ""}, as: :message))

      {:error, _changeset} ->
        put_flash(
          socket,
          :error,
          dgettext("chatbot", "Could not send your message, please try again.")
        )
    end
  end

  defp normalize_conversation_id(""), do: nil
  defp normalize_conversation_id(id), do: id

  # The cue is shown transiently for an empty thread, but only actually
  # persisted (as a real bot-comment app_data row) once the student sends
  # their first message in the conversation — so the model gets it as real
  # history, and browsing a conversation that was never engaged with doesn't
  # leave an orphan bot message behind.
  defp ensure_cue_persisted(socket, [], settings, item_id, account_id, conversation_id) do
    cue = settings.cue

    if is_binary(cue) and cue != "" do
      case Chatbot.create_message(item_id, account_id, "bot-comment", conversation_id, %{
             "content" => cue
           }) do
        {:ok, cue_message} ->
          thread_message = to_thread_message(cue_message)
          {socket, [thread_message], [%{role: :assistant, content: cue}]}

        {:error, _changeset} ->
          {socket, [], []}
      end
    else
      {socket, [], []}
    end
  end

  defp ensure_cue_persisted(socket, thread, _settings, _item_id, _account_id, _conversation_id) do
    {socket, thread, Enum.map(thread, &Map.take(&1, [:role, :content]))}
  end

  @impl true
  def handle_info({:chatbot_delta, ref, delta}, socket) do
    socket =
      case socket.assigns.pending do
        %{ref: ^ref} = pending ->
          assign(socket, :pending, %{pending | content: pending.content <> delta})

        _stale_or_missing ->
          socket
      end

    {:noreply, socket}
  end

  def handle_info({:chatbot_done, ref, result}, socket) do
    socket =
      case socket.assigns.pending do
        %{ref: ^ref} = pending -> finish_pending(socket, pending, result)
        _stale_or_missing -> socket
      end

    {:noreply, socket}
  end

  defp finish_pending(socket, pending, {:ok, full_text}) do
    text = if full_text == "", do: pending.content, else: full_text

    %{
      item_id: item_id,
      account_id: account_id,
      active_conversation_id: conversation_id
    } = socket.assigns

    case Chatbot.create_message(item_id, account_id, "bot-comment", conversation_id, %{
           "content" => text,
           "parent" => pending.user_message_id
         }) do
      {:ok, bot_message} ->
        Chatbot.create_action(item_id, account_id, "ask-chatbot", %{
          "userMessageId" => pending.user_message_id,
          "conversationId" => conversation_id
        })

        socket
        |> update(:thread, &(&1 ++ [to_thread_message(bot_message)]))
        |> assign(:pending, nil)
        |> assign(:sending?, false)

      {:error, _changeset} ->
        socket
        |> put_flash(
          :error,
          dgettext("chatbot", "The chatbot replied, but saving the reply failed.")
        )
        |> assign(:pending, nil)
        |> assign(:sending?, false)
    end
  end

  defp finish_pending(socket, _pending, {:error, _reason}) do
    socket
    |> put_flash(:error, dgettext("chatbot", "The chatbot could not respond, please try again."))
    |> assign(:pending, nil)
    |> assign(:sending?, false)
  end

  # Reloads both the plain map the chat UI/prompt-building reads (`:settings`)
  # and the teacher's edit form (`:settings_form`) from the same app_setting
  # rows ("chatbot-prompt" and "chatbot-avatar"), so a save takes effect in
  # the chat below without a page reload.
  defp refresh_settings(socket) do
    item_id = socket.assigns.item_id

    data =
      case Chatbot.get_setting(item_id, "chatbot-prompt") do
        nil -> %{}
        %{data: data} -> data
      end

    prompt_settings = PromptSettings.from_data(data)
    starter_suggestions = Map.get(data, "starterSuggestions", [])

    settings = %{
      initial_prompt: prompt_settings.initialPrompt,
      cue: prompt_settings.chatbotCue,
      name: prompt_settings.chatbotName || default_chatbot_name(),
      starter_suggestions: starter_suggestions,
      avatar_data_url: fetch_avatar_data_url(item_id)
    }

    socket
    |> assign(:settings, settings)
    |> assign(
      :starter_suggestions,
      starter_suggestions
      |> Enum.with_index()
      |> Enum.map(fn {value, id} -> %{id: id, value: value} end)
    )
    |> assign(
      :settings_form,
      to_form(PromptSettings.changeset(prompt_settings, %{}), as: :prompt_settings)
    )
  end

  # Narrower than refresh_settings/1: only updates the avatar's display URL.
  # handle_avatar_progress/3 and remove_avatar must not touch :settings_form —
  # rebuilding it from the DB would wipe out any unsaved edits sitting in the
  # Name/System prompt/Cue/Starter suggestions fields, which from the
  # teacher's perspective looks exactly like the avatar upload reset (or
  # "submitted") the settings form even though it never did.
  defp refresh_avatar(socket) do
    item_id = socket.assigns.item_id
    update(socket, :settings, &Map.put(&1, :avatar_data_url, fetch_avatar_data_url(item_id)))
  end

  defp fetch_avatar_data_url(item_id) do
    case Chatbot.get_setting(item_id, "chatbot-avatar") do
      nil -> nil
      %{data: %{"file" => %{"path" => path}}} -> Avatar.url(path)
      _no_avatar_set -> nil
    end
  end

  # Called by LiveView as chunks of the selected file stream in (auto_upload:
  # true starts this as soon as a file is chosen, no submit needed). Persists
  # the avatar to S3 and the app_setting once the entry finishes uploading.
  defp handle_avatar_progress(:avatar, entry, socket) do
    if entry.done? do
      %{item_id: item_id, account_id: account_id} = socket.assigns

      setting_id =
        case Chatbot.get_setting(item_id, "chatbot-avatar") do
          %{id: id} -> id
          nil -> Ecto.UUID.generate()
        end

      key =
        consume_uploaded_entry(socket, entry, fn %{path: path} ->
          {:ok, Avatar.upload(item_id, setting_id, path)}
        end)

      {:ok, _app_setting} =
        Chatbot.upsert_setting(
          item_id,
          "chatbot-avatar",
          %{
            "file" => %{
              "name" => entry.client_name,
              "path" => key,
              "mimetype" => entry.client_type
            }
          },
          account_id,
          setting_id
        )

      {:noreply,
       socket |> refresh_avatar() |> put_flash(:info, dgettext("chatbot", "Avatar updated."))}
    else
      {:noreply, socket}
    end
  end

  defp load_thread(item_id, account_id, conversation_id) do
    item_id
    |> Chatbot.list_messages(account_id, conversation_id)
    |> Enum.map(&to_thread_message/1)
  end

  defp to_thread_message(%AppData{} = app_data) do
    content = Map.get(app_data.data, "content", "")

    %{
      id: app_data.id,
      role: if(app_data.type == "bot-comment", do: :assistant, else: :user),
      content: content,
      html: Markdown.to_html(content)
    }
  end

  defp error_to_string(:too_large),
    do: dgettext("chatbot", "That image is too large (max 500KB).")

  defp error_to_string(:too_many_files), do: dgettext("chatbot", "Choose only one image.")

  defp error_to_string(:not_accepted),
    do: dgettext("chatbot", "That file type isn't supported (use PNG/JPG/WEBP).")

  defp error_to_string(_other), do: dgettext("chatbot", "Could not upload that image.")

  defp connection_error_to_string(reason) when reason in ["context_timeout", "token_timeout"] do
    dgettext(
      "chatbot",
      "Could not reach Graasp. Check your connection and try again."
    )
  end

  defp connection_error_to_string(reason) do
    dgettext("chatbot", "Could not authenticate this app instance (%{reason}).",
      reason: inspect(reason)
    )
  end

  attr :src, :string, default: nil

  defp bot_avatar(assigns) do
    ~H"""
    <div :if={@src} class="chat-image avatar">
      <div class="size-10 rounded-full">
        <img src={@src} />
      </div>
    </div>
    """
  end

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.chatbot flash={@flash}>
      <div
        id="graasp-app-context"
        phx-hook="GraaspAppContext"
        data-item-id={@item_id}
        data-app-key={@app_key}
        class="flex flex-col items-center w-full pb-8"
        data-theme="light"
      >
        <div :if={@status == :missing_item_id} class="p-4 text-error">
          {dgettext("chatbot", "Missing itemId query parameter.")}
        </div>
        <div :if={@status == :awaiting_context} class="p-4">
          {dgettext("chatbot", "Connecting to Graasp…")}
        </div>
        <div :if={@status == :error} class="p-4 text-error flex flex-col items-start gap-2">
          <span>{connection_error_to_string(@error)}</span>
          <button
            type="button"
            onclick="window.location.reload()"
            class="btn btn-sm btn-outline"
          >
            {dgettext("chatbot", "Retry")}
          </button>
        </div>

        <div :if={@status == :ready} class="flex flex-col gap-2 items-center max-w-5xl w-full">
          <div :if={@is_teacher?} class="p-3 w-full">
            <div
              :if={@settings.initial_prompt in [nil, ""]}
              role="alert"
              class="alert alert-warning"
            >
              {dgettext(
                "chatbot",
                "Configure a system prompt below before students start chatting."
              )}
            </div>

            <h3 class="font-semibold">{dgettext("chatbot", "Chatbot settings")}</h3>
            <div class="">
              <.form
                for={@avatar_form}
                id="avatar-form"
                phx-change="validate_avatar"
                multipart
                class="flex flex-row gap-2 items-center"
              >
                <label
                  for={@uploads.avatar.ref}
                  title={dgettext("chatbot", "Click to upload a chatbot avatar")}
                  class="group relative size-12 shrink-0 cursor-pointer "
                >
                  <img
                    :if={@settings.avatar_data_url}
                    src={@settings.avatar_data_url}
                    class="size-12 rounded-lg shadow object-cover"
                  />
                  <div
                    :if={!@settings.avatar_data_url}
                    class="flex size-12 items-center justify-center bg-base-200 text-base-content/50 group-hover:text-base-content/80 rounded-lg"
                  >
                    <.icon name="hero-photo" class="size-6" />
                  </div>
                  <div class="absolute -bottom-2 -right-2 flex size-5 items-center justify-center rounded-full bg-primary text-neutral-content">
                    <.icon name="hero-pencil" class="size-3" />
                  </div>
                </label>

                <p :if={!@settings.avatar_data_url} class="text-sm opacity-70">
                  {dgettext("chatbot", "Click the picture to upload a chatbot avatar.")}
                </p>

                <.live_file_input upload={@uploads.avatar} class="hidden" />

                <button
                  :if={@settings.avatar_data_url}
                  type="button"
                  phx-click="remove_avatar"
                  class="btn btn-sm btn-ghost text-error"
                >
                  {dgettext("chatbot", "Remove")}
                </button>
              </.form>

              <.form
                for={@settings_form}
                id="settings-form"
                phx-change="validate_settings"
                phx-submit="save_settings"
              >
                <.input
                  field={@settings_form[:chatbotName]}
                  type="text"
                  label={dgettext("chatbot", "Name")}
                />
                <.input
                  field={@settings_form[:initialPrompt]}
                  type="textarea"
                  label={dgettext("chatbot", "Prompt")}
                />
                <.input
                  field={@settings_form[:chatbotCue]}
                  type="textarea"
                  label={dgettext("chatbot", "Conversation starter")}
                />

                <div class="space-y-2">
                  <p class="font-medium text-sm">
                    {dgettext("chatbot", "Starter suggestions")}
                  </p>
                  <p class="text-sm opacity-70">
                    {dgettext("chatbot", "Shown to students on a new conversation.")}
                  </p>
                  <div
                    :for={suggestion <- @starter_suggestions}
                    class="flex flex-row gap-2 items-center"
                  >
                    <input
                      type="text"
                      name={"starter_suggestion_#{suggestion.id}"}
                      value={suggestion.value}
                      phx-change="edit_starter_suggestion"
                      placeholder={dgettext("chatbot", "Starter suggestion")}
                      class="input input-bordered input-sm w-full"
                    />
                    <button
                      type="button"
                      phx-click="remove_starter_suggestion"
                      phx-value-id={suggestion.id}
                      aria-label={dgettext("chatbot", "Remove starter suggestion")}
                      class="btn btn-sm btn-ghost text-error"
                    >
                      <.icon name="hero-trash" class="size-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    phx-click="add_starter_suggestion"
                    class="btn btn-sm btn-outline"
                  >
                    <.icon name="hero-plus" class="size-4" />
                    {dgettext("chatbot", "Add starter suggestion")}
                  </button>
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="btn btn-primary ">
                    {dgettext("chatbot", "Save settings")}
                  </button>
                </div>
              </.form>
            </div>

            <div class="space-y-2">
              <p :for={err <- upload_errors(@uploads.avatar)} class="text-sm text-error">
                {error_to_string(err)}
              </p>
            </div>

            <div class="prose prose-sm">
              <h3>{dgettext("chatbot", "About the Chatbot App")}</h3>
              <p>
                {dgettext(
                  "chatbot",
                  "The chatbot app uses OpenAI's ChatGPT model as a base to provide the chatbot integration. Users responses are transmitted to OpenAI trough their API to be processed and for responses to be generated. No other user data is transmitted. If users provide personal data in their messages there is nothing we can do to protect that data."
                )}
                {dgettext("chatbot", "See the")} <a url="https://openai.com/policies/eu-privacy-policy">{dgettext("chatbot", "Privacy policy for EU users")}</a>.
              </p>
            </div>
          </div>

          <div
            :if={!@is_teacher?}
            class="flex flex-col items-center gap-2 py-4 max-w-[100ch] border border-neutral/40 rounded-lg w-full bg-white"
          >
            <div class="flex flex-col gap-2 items-center w-full">
              <img
                :if={@settings.avatar_data_url}
                src={@settings.avatar_data_url}
                class="size-14 rounded-full object-cover"
              />

              <span class="text-2xl">
                {@settings.name}
              </span>
            </div>

            <div :if={@view == :conversations} class="flex flex-col gap-4 items-center w-full">
              <ul :if={@conversations != []} class="flex flex-col w-full">
                <li
                  :for={conversation <- @conversations}
                  class="flex flex-row items-center gap-2 border-b border-neutral/40 px-4 py-2 hover:bg-base-200"
                >
                  <button
                    phx-click="select_conversation"
                    phx-value-id={conversation.id || ""}
                    class="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <span class="font-medium block truncate">{conversation.preview}</span>
                    <span class="text-xs opacity-60">
                      {Calendar.strftime(conversation.last_message_at, "%b %d, %Y %H:%M")}
                    </span>
                  </button>
                  <.button
                    color="error"
                    phx-click="delete_conversation"
                    phx-value-id={conversation.id || ""}
                    data-confirm={
                      dgettext("chatbot", "Delete this conversation? This cannot be undone.")
                    }
                  >
                    <.icon name="hero-trash" class="size-5" />
                  </.button>
                </li>
              </ul>

              <.button variant="primary" class="w-fit" phx-click="new_conversation">
                <.icon name="hero-plus" class="size-5" /> {dgettext("chatbot", "New conversation")}
              </.button>
            </div>
            <div
              :if={@view == :thread}
              class="flex flex-col gap-2 px-4 pt-4 items-center w-full border-neutral/40 border-t"
            >
              <div id="chat-thread" class="space-y-1 w-full">
                <div
                  :if={@thread == [] and is_nil(@pending) and @settings.cue not in [nil, ""]}
                  class="chat chat-start"
                >
                  <.bot_avatar src={@settings.avatar_data_url} />
                  <div class="chat-bubble">
                    <.raw_html
                      html={Markdown.to_html(@settings.cue)}
                      class="max-w-none"
                      size="base"
                    />
                  </div>
                </div>

                <div
                  :if={@thread == [] and is_nil(@pending) and @settings.starter_suggestions != []}
                  class="flex flex-wrap gap-2 justify-end px-2"
                >
                  <button
                    :for={suggestion <- @settings.starter_suggestions}
                    phx-click="send_suggestion"
                    phx-value-content={suggestion}
                    disabled={@sending?}
                    class="btn btn-primary rounded-full"
                  >
                    {suggestion}
                  </button>
                </div>

                <div
                  :for={message <- @thread}
                  class={["chat", if(message.role == :user, do: "chat-end", else: "chat-start")]}
                >
                  <.bot_avatar :if={message.role != :user} src={@settings.avatar_data_url} />
                  <div class="chat-bubble">
                    <.raw_html html={message.html} class="max-w-none" size="base" />
                  </div>
                </div>

                <div :if={@pending} class="chat chat-start">
                  <.bot_avatar src={@settings.avatar_data_url} />
                  <div class="chat-bubble">
                    <span :if={@pending.content == ""} class="loading loading-dots loading-sm"></span>
                    <.raw_html
                      :if={@pending.content != ""}
                      html={Markdown.to_html(@pending.content)}
                      class="max-w-none"
                      size="base"
                    />
                  </div>
                </div>
              </div>

              <.form
                for={@chat_form}
                id="chat-form"
                phx-submit="send_message"
                class="flex flex-row gap-2 items-start w-full"
              >
                <.input
                  field={@chat_form[:content]}
                  type="text"
                  placeholder={dgettext("chatbot", "Type here…")}
                  autocomplete="off"
                  disabled={@sending?}
                  class="w-full input input-lg input-primary"
                >
                  <.button
                    type="submit"
                    variant="primary"
                    size="lg"
                    class="btn-circle"
                    disabled={@sending?}
                    alt={dgettext("chatbot", "Send")}
                  >
                    <.icon name="hero-paper-airplane" class="size-6 ms-[3px]" />
                  </.button>
                </.input>
              </.form>
            </div>
          </div>
          <.button
            :if={@view == :thread}
            phx-click="back_to_conversations"
            variant="outline"
            color="primary"
            class="w-fit"
            disabled={@sending?}
          >
            <.icon name="hero-arrow-left" class="size-4" />{dgettext(
              "chatbot",
              "Back to conversations"
            )}
          </.button>
        </div>
      </div>
    </Layouts.chatbot>
    """
  end
end
