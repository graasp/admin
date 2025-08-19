defmodule AdminWeb.UserController do
  use AdminWeb, :controller
  alias Admin.Accounts

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user_with_notices(id)
    render(conn, :show, user: user)
  end
end
