defmodule AdminWeb.UserLive.Listing do
  use AdminWeb, :live_view

  alias Admin.Accounts

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash} current_scope={@current_scope}>
      <div class="text-center">
        <.header>
          List users
          <:subtitle>Show users that are currently registered in the app</:subtitle>
        </.header>
      </div>
      <.table
        id="users"
        rows={@streams.users}
      >
        <:col :let={{_id, user}} label="id">{user.id}</:col>
        <:col :let={{_id, user}} label="email">{user.email}</:col>
        <:col :let={{_id, user}} label="created At">
          <AdminWeb.DateTimeComponents.relative_date date={user.inserted_at} />
        </:col>
      </.table>
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
  def handle_info({type, %Admin.Accounts.User{}}, socket)
      when type in [:created, :updated, :deleted] do
    {:noreply, stream(socket, :users, Accounts.list_users(), reset: true)}
  end

  def handle_info(msg, _socket) do
    require Logger
    Logger.info("[Settings live view]: Handling info got #{inspect(msg)}")
  end
end
