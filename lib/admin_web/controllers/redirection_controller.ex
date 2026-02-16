defmodule AdminWeb.RedirectionController do
  use AdminWeb, :controller

  def library(conn, _params) do
    redirect(conn, external: Application.get_env(:admin, :library_origin))
  end
end
