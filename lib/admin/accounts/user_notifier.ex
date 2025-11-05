defmodule Admin.Accounts.UserNotifier do
  @moduledoc """
  This module provides functions to compose and send user targetted notifications by email.
  """
  import Swoosh.Email

  alias Admin.Accounts.Account
  alias Admin.Accounts.User
  alias Admin.Mailer
  alias Admin.Notifications.MailingTemplates

  @footer "Graasp.org is a learning experience platform."

  def test_email(scope) do
    html =
      MailingTemplates.simple_call_to_action(%{
        user: scope,
        message: "This is a test email.",
        button_text: "Click here",
        button_url: "https://example.com"
      })

    email =
      new()
      |> to("basile@graasp.org")
      |> from({"Admin", "admin@graasp.org"})
      |> subject("test email")
      |> html_body(html)

    with {:ok, _metadata} <- Mailer.deliver(email) do
      {:ok, email}
    end
  end

  # Delivers the email using the application mailer.
  defp deliver(recipient, subject, body) do
    email =
      new()
      |> to(recipient)
      |> from({"Admin", "noreply@graasp.org"})
      |> subject(subject)
      |> text_body(body)

    with {:ok, _metadata} <- Mailer.deliver(email) do
      {:ok, email}
    end
  end

  def deliver_notification(user, subject, message_text) do
    deliver(user.email, subject, """

    ==============================

    Hi #{user.name},

    #{message_text}

    ==============================
    #{@footer}
    """)
  end

  @doc """
  Deliver publication removal information.
  """
  def deliver_publication_removal(nil, _publication, _notice), do: {:ok, :not_sent}

  def deliver_publication_removal(%Account{} = user, publication, notice) do
    deliver(user.email, "Your publication has been removed", """

    ==============================

    Hi #{user.name},

    We have decided to removed your publication
    Name: #{publication.item.name}
    Published on: #{publication.created_at}

    Your publication was removed for the following reason:

    ---

    #{notice.reason}

    ---

    You can contact us if you have any questions.

    If you didn't publish this content, please ignore this.

    ==============================
    #{@footer}
    """)
  end

  @doc """
  Deliver instructions to update a user email.
  """
  def deliver_update_email_instructions(user, url) do
    deliver(user.email, "Update email instructions", """

    ==============================

    Hi #{user.email},

    You can change your email by visiting the URL below:

    #{url}

    If you didn't request this change, please ignore this.

    ==============================
    #{@footer}
    """)
  end

  @doc """
  Deliver instructions to log in with a magic link.
  """
  def deliver_login_instructions(user, url) do
    case user do
      %User{confirmed_at: nil} -> deliver_confirmation_instructions(user, url)
      _ -> deliver_magic_link_instructions(user, url)
    end
  end

  defp deliver_magic_link_instructions(user, url) do
    deliver(user.email, "Log in instructions", """

    ==============================

    Hi #{user.email},

    You can log into your account by visiting the URL below:

    #{url}

    If you didn't request this email, please ignore this.

    ==============================
    #{@footer}
    """)
  end

  defp deliver_confirmation_instructions(user, url) do
    deliver(user.email, "Confirmation instructions", """

    ==============================

    Hi #{user.email},

    You can confirm your account by visiting the URL below:

    #{url}

    If you didn't create an account with us, please ignore this.

    ==============================
    #{@footer}
    """)
  end
end
