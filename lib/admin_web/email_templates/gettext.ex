defmodule AdminWeb.EmailTemplates.Gettext do
  use Gettext.Backend, otp_app: :admin, priv: "priv/gettext_email_templates"
end
