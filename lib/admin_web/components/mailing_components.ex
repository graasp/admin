defmodule AdminWeb.MailingComponents do
  @moduledoc """
  Components for the mailing module.
  """

  use Phoenix.Component

  attr :id, :string, required: true
  attr :mailing, :map, required: true

  def sent_mailing(assigns) do
    ~H"""
    <div id={@id} class="card w-full bg-base-100 card-sm shadow-sm">
      <div class="card-body w-full flex flex-row items-center">
        <div class="flex flex-col">
          <h2 class="card-title">{@mailing.name}</h2>
          <span>
            <%= for lang <- @mailing.localized_emails |> Enum.map(& &1.language) do %>
              <div class="chip">
                {lang}
              </div>
            <% end %>
          </span>
          <p>Target Audience: {@mailing.audience}</p>
        </div>

        <span class="text-base h-fit">{length(@mailing.logs)} / {@mailing.total_recipients}</span>
      </div>
    </div>
    """
  end
end
