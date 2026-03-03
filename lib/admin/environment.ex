defmodule Admin.Environment do
  def app_url(opts \\ []) do
    path = Keyword.get(opts, :path, "/")
    "https://#{Application.get_env(:admin, :base_host)}#{path}"
  end
end
