defmodule AdminWeb.Public do
  def session(conn, opts) do
    locale = Keyword.get(opts, :locale, "en")
    %{"locale" => conn.assigns.locale || locale}
  end
end
