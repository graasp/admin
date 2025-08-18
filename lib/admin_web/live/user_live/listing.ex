defmodule AdminWeb.UserLive.Listing do
  use AdminWeb, :live_view

  require Logger
  alias Admin.Accounts

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <div class="">
        <.header>
          List users
          <:subtitle>Show users that are currently registered in the app</:subtitle>
          <:actions>
            <.button phx-click="new_user">New User</.button>
          </:actions>
        </.header>
      </div>
      <div id="user-list" phx-update="stream" class="flex flex-col gap-2">
        <%= for {id, user} <- @streams.users do %>
          <div
            id={id}
            class="flex flex-row justify-between"
          >
            <div class="">
              <.link navigate={~p"/users/#{user}"}><span>{user.email}</span></.link>
              <div :if={user.id == @current_scope.user.id} class="badge badge-soft badge-info text-xs">
                You
              </div>
              <div class="flex flex-row gap-2 text-xs">
                <span class="text-secondary">{user.id}</span>
                <AdminWeb.DateTimeComponents.relative_date date={user.inserted_at} />
              </div>
            </div>
            <.button class="btn " phx-click="delete" phx-value-id={user.id}>Delete</.button>
          </div>
        <% end %>
      </div>
    </Layouts.app>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    if connected?(socket) do
      Accounts.subscribe_users()
    end

    socket =
      socket
      |> stream(:users, Accounts.list_users())

    {:ok, socket}
  end

  @impl true
  def handle_event("delete", %{"id" => id, "value" => _}, socket) do
    {:ok, user} = Accounts.delete_user_by_id(id)
    # Update the stream locally by removing the user.
    {:noreply, stream_delete(socket, :users, user)}
  end

  def handle_event("new_user", _, socket) do
    {:ok, user} =
      Accounts.register_user(%{email: "#{System.unique_integer([:positive])}@graasp.org"})

    {:noreply, stream_insert(socket, :users, user)}
  end

  @impl true
  def handle_info({type, %Admin.Accounts.User{}}, socket)
      when type in [:created, :updated, :deleted] do
    Logger.info("receiving an update for users as #{type}")
    {:noreply, stream(socket, :users, Accounts.list_users(), reset: true)}
  end

  def handle_info(msg, socket) do
    Logger.info("[Settings live view]: Handling info got #{inspect(msg)}")
    {:noreply, socket}
  end
end
