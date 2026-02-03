defmodule AdminWeb.EmailTemplates do
  @moduledoc """
  Provides email templates for communications.

  This module exposes MJML templates for emails.

  ## Examples

      EmailTemplates.render("simple_notification", %{name: "John Doe", message: "A simple notification"})

  """

  use AdminWeb, :html

  import Phoenix.Template, only: [render_to_string: 4]

  embed_templates "templates_html/*"

  @doc """
  Provides the base template for emails

  ## Examples

      <.layout>
        <mj-column>
          <mj-text>
            Some text
          </mj-text>
        </mj-column>
      </.layout>

  """
  attr :title, :string, doc: "A custom title", default: "Graasp"
  slot :footer, doc: "A custom footer to use"
  slot :inner_block, required: true

  def layout(assigns)

  @doc """
  A basic login, confirmation email for admin communication

  """
  attr :name, :string, required: true
  attr :message, :string, required: true, doc: "The primary message of the email"
  attr :ignore_message, :string, default: ""
  attr :button_text, :string, required: true, doc: "The text of the button"
  attr :button_url, :string, required: true, doc: "The URL of the button"
  def admin_login(assigns)

  @doc """
  Publication removal email.
  """
  attr :name, :string, required: true
  attr :message, :string, required: true, doc: "The primary message of the email"
  attr :reason, :string, required: true, doc: "The reason for the removal"
  def publication_removal(assigns)

  attr :name, :string, required: true
  attr :message, :string, required: true, doc: "The primary message of the email"
  attr :pixel, :string, doc: "The tracking pixel"
  attr :account, :string, doc: "The account (for emails targetting graasp members)"
  attr :button_text, :string, doc: "The text of the button"
  attr :button_url, :string, doc: "The URL of the button"
  def call_to_action(assigns)

  def render(template, assigns \\ %{}) do
    {:ok, html} = render_to_string(__MODULE__, template, "html", assigns) |> Mjml.to_html()
    html
  end
end
