defmodule AdminWeb.EmailTemplates.Gettext do
  @moduledoc """
  Custom Gettext backend for email templates.
  """
  use Gettext.Backend, otp_app: :admin, priv: "priv/gettext_email_templates"
end
