defmodule AdminWeb.RestoreLocale do
  def on_mount(:default, _params, %{"locale" => locale}, socket) do
    socket = Phoenix.Component.assign_new(socket, :locale, fn -> locale end)

    socket =
      Phoenix.Component.assign_new(socket, :locale_form, fn ->
        Phoenix.Component.to_form(%{"locale" => locale})
      end)

    Gettext.put_locale(AdminWeb.Gettext, locale)
    {:cont, socket}
  end

  # catch-all case
  def on_mount(:default, _params, _session, socket), do: {:cont, socket}
end
