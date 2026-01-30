defmodule AdminWeb.Marketing.Localized do
  @moduledoc """
  Module for managing localized marketing pages.
  """
  use Phoenix.VerifiedRoutes,
    router: AdminWeb.Router,
    endpoint: AdminWeb.Endpoint,
    path_prefixes: [{Gettext, :get_locale, []}]

  def disclaimer_path, do: ~p"/disclaimer"
  def privacy_policy_path, do: ~p"/privacy"
  def terms_path, do: ~p"/terms"

  def get_path(page_name) do
    case page_name do
      "disclaimer" -> disclaimer_path()
      "privacy" -> privacy_policy_path()
      "terms" -> terms_path()
      _ -> ~p"/"
    end
  end
end

defmodule AdminWeb.Marketing.Routes do
  @moduledoc """
  Module for managing marketing routes.
  """
  use Phoenix.VerifiedRoutes,
    router: AdminWeb.Router,
    endpoint: AdminWeb.Endpoint

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

  def get_path(page_name) do
    case page_name do
      "disclaimer" -> ~p"/disclaimer"
      "privacy" -> ~p"/privacy"
      "terms" -> ~p"/terms"
      _ -> ~p"/"
    end
  end
end
