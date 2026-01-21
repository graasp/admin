defmodule AdminWeb.LandingController do
  use AdminWeb, :controller

  def index(conn, _params) do
    render(conn, :index)
  end

  def home(conn, _params) do
    render(conn, :home)
  end
end
