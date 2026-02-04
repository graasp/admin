defmodule AdminWeb.Marketing do
  @moduledoc """
  Module for managing localized marketing pages.
  """

  alias AdminWeb.Localization

  def disclaimer_path,
    do: Path.join(Localization.locale_path_prefix(Gettext.get_locale()), "disclaimer")

  def privacy_policy_path,
    do: Path.join(Localization.locale_path_prefix(Gettext.get_locale()), "privacy")

  def terms_path, do: Path.join(Localization.locale_path_prefix(Gettext.get_locale()), "terms")

  def get_path(page_name), do: get_path(page_name, Gettext.get_locale())

  def get_path(page_name, locale) do
    locale_path_prefix = Localization.locale_path_prefix(locale)

    case page_name do
      "disclaimer" -> Path.join(locale_path_prefix, "disclaimer")
      "privacy" -> Path.join(locale_path_prefix, "privacy")
      "terms" -> Path.join(locale_path_prefix, "terms")
      _ -> "/"
    end
  end
end

defmodule AdminWeb.Marketing.Macros do
  @moduledoc """
  Module for managing marketing routes.
  """

  @doc """
  A macro that generates localized routes for the marketing pages.

  Using a macro in this context is required in order for the paths to be defined at compile time.
  """
  defmacro generate_localized_routes do
    quote do
      for locale <- AdminWeb.Localization.supported_locales() do
        locale_path_prefix = AdminWeb.Localization.locale_path_prefix(locale)

        private = %{locale: locale}

        for page_name <- Admin.StaticPages.get_unique_page_ids() do
          get Path.join(locale_path_prefix, page_name), LandingController, :static_page,
            private: private
        end
      end
    end
  end
end
