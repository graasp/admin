defmodule AdminWeb.UserController do
  use AdminWeb, :controller
  alias Admin.Accounts

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user_with_notices(id)
    render(conn, :show, page_title: "View user", user: user)
  end
end
