defmodule Admin.Notifications.MailingTemplates do
  use Phoenix.Component
  import Phoenix.Template, only: [render_to_string: 4]

  def call_to_action_email(assigns) do
    ~H"""
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-all font-family="Nunito" />
        </mj-attributes>
        <mj-font name="Nunito" href="https://fonts.googleapis.com/css?family=Nunito" />
      </mj-head>

      <mj-body background-color="#f6f6f6">
        <mj-section>
          <mj-column>
            <mj-image width="80px" src="https://graasp.org/apple-touch-icon.png"></mj-image>
            <mj-text font-size="34px" color="#5050d2" align="center" font-family="Nunito">
              Graasp
            </mj-text>
          </mj-column>
        </mj-section>

        <mj-section background-color="#fefefe" border-radius="6px">
          <mj-column border-radius="10px">
            <mj-text>
              Hello {@user.name},
            </mj-text>
            <mj-text>
              {@message}
            </mj-text>
            <mj-button background-color="#5050d2" href={@button_url}>
              {@button_text}
            </mj-button>
            <mj-text color="gray">
              In case you can not click the button above here is the full URL:
            </mj-text>
            <mj-text color="gray">
              <a style="color: gray" href={@button_url}>{@button_url}</a>
            </mj-text>
          </mj-column>
        </mj-section>

        <mj-section>
          <mj-column>
            <mj-text align="center" color="#aaa">
              You are receiving this email because of your account on <a
                style="color: #aaa"
                href="https://graasp.org"
              >Graasp</a>.
            </mj-text>
            <mj-text align="center" color="#aaa">
              Graasp Association, Valais, Switzerland
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
    """
  end

  def simple_call_to_action(assigns) do
    {:ok, html} =
      render_to_string(__MODULE__, "call_to_action_email", "html", assigns) |> Mjml.to_html()

    html
  end
end
