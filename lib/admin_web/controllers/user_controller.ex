defmodule AdminWeb.UserController do
  use AdminWeb, :controller
  alias Admin.Accounts

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, :show, user: user)
  end
end
