defmodule AdminWeb.AccountController do
  use AdminWeb, :controller

  alias Admin.Accounts

  def marketing_emails_unsubscribe(conn, %{"account_id" => account_id}) do
    account = Accounts.get_member!(account_id)
    {:ok, account} = Accounts.update_member_marketing_emails(account, false)

    conn
    |> put_flash(:info, gettext("Unsubscribed from marketing emails"))
    |> render(:marketing_subscription,
      page_title: pgettext("page title", "Unsubscribed from Marketing Emails"),
      account: account
    )
  end

  def marketing_emails_subscribe(conn, %{"account_id" => account_id}) do
    account = Accounts.get_member!(account_id)
    {:ok, account} = Accounts.update_member_marketing_emails(account, true)

    conn
    |> put_flash(:info, gettext("Subscribed to marketing emails"))
    |> render(:marketing_subscription,
      page_title: pgettext("page title", "Subscribed to Marketing Emails"),
      account: account
    )
  end
end
