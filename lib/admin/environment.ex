defmodule Admin.Environment do
  @moduledoc """
  This module provides environment-related functions for the Admin application.
  """

  def app_url(opts \\ []) do
    path = Keyword.get(opts, :path, "/")
    "https://#{Application.get_env(:admin, :base_host)}#{path}"
  end
end
