defmodule AdminWeb.DateTimeComponents do
  use Phoenix.Component

  def relative_date(assigns) do
    ~H"""
    <span>
      {Timex.format!(@date, "{relative}", :relative)}
    </span>
    """
  end
end
