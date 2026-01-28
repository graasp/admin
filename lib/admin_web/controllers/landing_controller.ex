defmodule AdminWeb.LandingController do
  use AdminWeb, :controller

  def index(conn, _params) do
    render(conn, :index)
  end

  def about(conn, _params) do
    render(conn, :about)
  end

  def contact(conn, _params) do
    render(conn, :contact)
  end

  def home(conn, _params) do
    render(conn, :home)
  end
end
