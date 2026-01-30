defmodule Admin.StaticPages do
  alias AdminWeb.NotFoundError
  alias Admin.StaticPages.Page

  use NimblePublisher,
    build: Page,
    from: Application.app_dir(:admin, "priv/pages/**/*.md"),
    as: :pages

  def get_static_page!(locale, id) when is_binary(id) do
    page = @pages |> Enum.find(&(&1.id == id && &1.locale == locale))

    if is_nil(page) and locale == AdminWeb.Gettext.default_locale(),
      do: raise(NotFoundError, message: "Page not found")

    page
  end

  def exists?(locale, id) when is_binary(id) do
    @pages |> Enum.any?(&(&1.id == id && &1.locale == locale))
  end
end
