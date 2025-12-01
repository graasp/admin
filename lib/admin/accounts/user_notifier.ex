defmodule Admin.Accounts.UserNotifier do
  @moduledoc """
  This module provides functions to compose and send user targetted notifications by email.
  """
  import Swoosh.Email

  alias Admin.Accounts.Account
  alias Admin.Accounts.User
  alias Admin.Mailer

  alias AdminWeb.EmailTemplates

  @footer "Graasp.org is a learning experience platform."

  # Delivers the email using the application mailer.
  defp deliver(recipient, subject, html, text, reply_to \\ {"Admin", "admin@graasp.org"}) do
    email =
      new()
      |> to(recipient)
      |> from({"Admin", "noreply@graasp.org"})
      |> reply_to(reply_to)
      |> subject(subject)
      |> text_body(text)
      |> html_body(html)

    with {:ok, _metadata} <- Mailer.deliver(email) do
      {:ok, email}
    end
  end

  def deliver_notification(user, subject, message_text) do
    html_body =
      EmailTemplates.render("simple_notification", %{
        name: user.name,
        message: message_text
      })

    deliver(
      user.email,
      subject,
      html_body,
      """

      ==============================

      Hi #{user.name},

      #{message_text}

      ==============================
      #{@footer}
      """,
      {"Graasp Support", "support@graasp.org"}
    )
  end

  @doc """
  Deliver publication removal information.
  """
  def deliver_publication_removal(nil, _publication, _notice), do: {:ok, :not_sent}

  def deliver_publication_removal(%Account{} = user, publication, notice) do
    name = user.name
    human_publication_date = Calendar.strftime(publication.created_at, "%a, %B %d %Y")

    message =
      "We have decided to remove \"#{publication.item.name}\" (published on #{human_publication_date}) from the public Graasp Library for the following reason:"

    html_body =
      EmailTemplates.render("publication_removal", %{
        name: name,
        message: message,
        reason: notice.reason
      })

    deliver(
      user.email,
      "#{publication.item.name} has been removed from the Graasp Library",
      html_body,
      """

      ==============================

      Hi #{name},

      #{message}

      ---

      #{notice.reason}

      ---

      You can reply to this email if you have any questions.

      If you didn't publish this content, no further action is required.

      Thank you for using Graasp

      ==============================
      #{@footer}
      """,
      {"Graasp Support", "support@graasp.org"}
    )
  end

  @doc """
  Deliver instructions to update a user email.
  """
  def deliver_update_email_instructions(user, url) do
    name = user.email
    message = "You can update your email by visiting the URL below:"
    ignore_message = "If you didn't request this email, please ignore this."

    html_body =
      EmailTemplates.render("admin_login", %{
        name: name,
        message: message,
        ignore_message: ignore_message,
        button_text: "Update email",
        button_url: url
      })

    deliver(name, "Update email instructions", html_body, """

    ==============================

    Hi #{name},

    #{message}

    #{url}

    #{ignore_message}

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
    name = user.email
    message = "You can log into your account by visiting the URL below:"
    ignore_message = "If you didn't request this email, please ignore this."

    html_body =
      AdminWeb.EmailTemplates.render("admin_login", %{
        name: name,
        message: message,
        ignore_message: ignore_message,
        button_text: "Log in to admin",
        button_url: url
      })

    deliver(user.email, "Log in instructions for admin", html_body, """

    ==============================

    Hi #{name},

    #{message}

    #{url}

    #{ignore_message}

    ==============================
    #{@footer}
    """)
  end

  defp deliver_confirmation_instructions(user, url) do
    name = user.email
    message = "You can confirm your account by visiting the URL below:"
    ignore_message = "If you didn't request this email, please ignore this."

    html_body =
      AdminWeb.EmailTemplates.render("admin_login", %{
        name: name,
        message: message,
        ignore_message: ignore_message,
        button_text: "Confirm your admin account",
        button_url: url
      })

    deliver(user.email, "Confirmation instructions for admin", html_body, """

    ==============================

    Hi #{user.email},

    #{message}

    #{url}

    #{ignore_message}

    ==============================
    #{@footer}
    """)
  end
end
