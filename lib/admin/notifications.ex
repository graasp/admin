defmodule Admin.Notifications do
  @moduledoc """
  The Notifications context.
  """
  require Logger

  import Ecto.Query, warn: false
  alias Admin.Repo

  alias Admin.Accounts
  alias Admin.Accounts.Scope
  alias Admin.Notifications.LocalizedEmail
  alias Admin.Notifications.Log
  alias Admin.Notifications.Notification

  # Notifications
  def new_notification, do: %Notification{}

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking notification changes.

  ## Examples

      iex> change_notification(scope, notification)
      %Ecto.Changeset{data: %Notification{}}

  """
  def change_notification(%Scope{} = scope, %Notification{} = notification, attrs \\ %{}) do
    Notification.changeset(notification, attrs, scope)
  end

  def update_recipients(%Notification{} = notification, %{total_recipients: _} = attrs) do
    Notification.update_recipients(notification, attrs)
  end

  def update_sent_at(%Scope{} = _scope, %Notification{} = notification) do
    case from(n in Notification,
           where: n.id == ^notification.id,
           select: n,
           update: [set: [sent_at: fragment("NOW()")]]
         )
         |> Repo.update_all([]) do
      {1, notification} -> {:ok, notification}
      {:error, error} -> {:error, error}
    end
  end

  def create_notification(%Scope{} = scope, attrs) do
    with {:ok, notification = %Notification{}} <-
           change_notification(scope, %Notification{}, attrs)
           |> Repo.insert() do
      broadcast_notification(scope, {:created, notification})
      {:ok, notification |> Repo.preload([:logs, :localized_emails, :pixel])}
    end
  end

  @doc """
  Subscribes to scoped notifications about any notification changes.

  The broadcasted messages match the pattern:

    * {:created, %Notification{}}
    * {:updated, %Notification{}}
    * {:deleted, %Notification{}}

  """
  def subscribe_notifications(%Scope{} = _scope) do
    Phoenix.PubSub.subscribe(Admin.PubSub, "notifications")
  end

  defp broadcast_notification(%Scope{} = _scope, message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "notifications", message)
  end

  def subscribe_notifications(%Scope{} = _scope, notification_id) do
    Phoenix.PubSub.subscribe(Admin.PubSub, "notifications:#{notification_id}")
  end

  defp broadcast_localized_email(%Scope{} = _scope, notification_id, message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "notifications:#{notification_id}", message)
  end

  def subscribe_sending_progress(%Scope{} = _scope) do
    Phoenix.PubSub.subscribe(Admin.PubSub, "notifications:sending")
  end

  def report_sending_progress(%Scope{} = _scope, message) do
    Phoenix.PubSub.broadcast(Admin.PubSub, "notifications:sending", message)
  end

  @doc """
  Returns the list of notifications.

  ## Examples

      iex> list_notifications(scope)
      [%Notification{}, ...]

  """
  def list_notifications(%Scope{} = _scope) do
    Repo.all(from n in Notification, order_by: [desc: :updated_at])
    |> Repo.preload([:logs, :localized_emails, :pixel])
  end

  def list_notifications_by_status(%Scope{} = _scope) do
    Repo.all(from n in Notification, order_by: [desc: :sent_at])
    |> Repo.preload([:logs, :localized_emails, :pixel])
  end

  def list_recently_sent_notifications(%Scope{} = _scope) do
    Repo.all(
      from n in Notification, where: not is_nil(n.sent_at), order_by: [desc: :sent_at], limit: 10
    )
    |> Repo.preload([:logs])
  end

  @doc """
  Gets a single notification.

  Raises `Ecto.NoResultsError` if the Notification does not exist.

  ## Examples

      iex> get_notification!(scope, 123)
      %Notification{}

      iex> get_notification!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_notification!(%Scope{} = _scope, id) do
    Repo.get_by!(Notification, id: id) |> Repo.preload([:logs, :localized_emails, :pixel])
  end

  @doc """
  Gets a single notification.

  ## Examples

      iex> get_notification(scope, 123)
      {:ok, %Notification{}}

      iex> get_notification(scope, 456)
      {:error, :not_found}

  """
  def get_notification(%Scope{} = _scope, id) do
    case Repo.get_by(Notification, id: id) |> Repo.preload([:logs, :localized_emails, :pixel]) do
      %Notification{} = notification -> {:ok, notification}
      nil -> {:error, :notification_not_found}
    end
  end

  @doc """
  Updates a service_message.

  ## Examples

      iex> update_service_message(scope, service_message, %{field: new_value})
      {:ok, %ServiceMessage{}}

      iex> update_service_message(scope, service_message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_notification(%Scope{} = scope, %Notification{} = notification, attrs) do
    with {:ok, notification = %Notification{}} <-
           notification
           |> Notification.changeset(attrs, scope)
           |> Repo.update() do
      broadcast_notification(scope, {:updated, notification})
      {:ok, notification}
    end
  end

  def toggle_strict_languages(%Scope{} = scope, %Notification{} = notification) do
    with {:ok, notification = %Notification{}} <-
           notification
           |> Notification.toggle_strict_languages()
           |> Repo.update() do
      broadcast_notification(scope, {:updated, notification})
      {:ok, notification}
    end
  end

  @doc """
  Deletes a notification.

  ## Examples

      iex> delete_notification(scope, notification)
      {:ok, %Notification{}}

      iex> delete_notification(scope, notification)
      {:error, %Ecto.Changeset{}}

  """
  def delete_notification(%Scope{} = scope, %Notification{} = notification) do
    with {:ok, notification = %Notification{}} <-
           Repo.delete(notification) do
      broadcast_notification(scope, {:deleted, notification})
      {:ok, notification}
    end
  end

  def save_log(%Scope{} = scope, log, %Notification{id: notification_id} = notification) do
    with {:ok, log = %Log{}} <-
           %Log{}
           |> Log.changeset(log, notification_id)
           |> Repo.insert() do
      broadcast_notification(scope, {:updated, notification})
      {:ok, log}
    end
  end

  def change_localized_email(
        %Scope{} = scope,
        notification_id,
        %LocalizedEmail{} = localized_email,
        attrs
      ) do
    LocalizedEmail.changeset(localized_email, attrs, notification_id, scope)
  end

  def create_localized_email(%Scope{} = scope, notification_id, attrs) do
    with {:ok, localized_email = %LocalizedEmail{}} <-
           change_localized_email(scope, notification_id, %LocalizedEmail{}, attrs)
           |> Repo.insert() do
      broadcast_localized_email(
        scope,
        localized_email.notification_id,
        {:created, localized_email}
      )

      {:ok, localized_email}
    end
  end

  def update_localized_email(%Scope{} = scope, %LocalizedEmail{} = localized_email, attrs) do
    with {:ok, localized_email = %LocalizedEmail{}} <-
           change_localized_email(scope, localized_email.notification_id, localized_email, attrs)
           |> Repo.update() do
      broadcast_localized_email(
        scope,
        localized_email.notification_id,
        {:updated, localized_email}
      )

      {:ok, localized_email}
    end
  end

  def get_localized_email_by_lang!(%Scope{} = _scope, notification_id, language) do
    case Repo.one(
           from l in LocalizedEmail,
             where:
               l.notification_id == ^notification_id and
                 l.language == ^language,
             limit: 1
         ) do
      nil -> raise "Localized email not found"
      localized_email -> localized_email
    end
  end

  def get_localized_email_by_lang(%Scope{} = _scope, notification_id, language) do
    case Repo.one(
           from l in LocalizedEmail,
             where:
               l.notification_id == ^notification_id and
                 l.language == ^language,
             limit: 1
         ) do
      nil -> {:error, :not_found}
      localized_email -> {:ok, localized_email}
    end
  end

  def get_local_email_from_notification(notification, language) do
    fallback_email =
      notification.localized_emails
      |> Enum.find(fn email -> email.language == notification.default_language end)

    case notification.use_strict_languages do
      true ->
        notification.localized_emails
        |> Enum.find(fn email -> email.language == language end)

      false ->
        notification.localized_emails
        |> Enum.find(fn email -> email.language == language end) || fallback_email
    end
  end

  def delete_localized_email(%Scope{} = scope, localized_email) do
    with {:ok, localized_email = %LocalizedEmail{}} <-
           Repo.delete(localized_email) do
      broadcast_localized_email(
        scope,
        localized_email.notification_id,
        {:deleted, localized_email}
      )

      {:ok, localized_email}
    end
  end

  @type audience :: %{name: String.t(), email: String.t(), lang: String.t()}
  @spec get_target_audience(Scope.t(), String.t(), Keyword.t()) ::
          {:ok, [audience]} | {:error, String.t()}
  @doc """
  Get the target audience for a notification.

  The supported target audiences are
      - `active`
      - `french`
      - `graasp_team`

  ## Examples

      iex> get_target_audience(%Scope{}, "active", [])
      {:ok, [%{name: "John Doe", email: "john@example.com", lang: "en"}]}

      iex> get_target_audience(%Scope{}, "french", [])
      {:ok, [%{name: "Jean Dupont", email: "jean@example.com", lang: "fr"}]}

      iex> get_target_audience(%Scope{}, "invalid_target", [])
      {:error, "Invalid target audience"}
  """
  def get_target_audience(scope, target_audience, opts \\ [])

  def get_target_audience(%Scope{} = _scope, "active", opts) do
    audience =
      Accounts.get_active_members()
      |> Enum.map(&%{name: &1.name, email: &1.email, lang: &1.lang})
      |> filter_audience_with_options(opts)

    {:ok, audience}
  end

  def get_target_audience(%Scope{} = _scope, "french", opts) do
    audience =
      Accounts.get_members_by_language("fr")
      |> Enum.map(&%{name: &1.name, email: &1.email, lang: &1.lang})
      |> filter_audience_with_options(opts)

    {:ok, audience}
  end

  def get_target_audience(%Scope{} = _scope, "graasp_team", opts) do
    audience =
      Accounts.list_users()
      |> Enum.map(&%{name: &1.name, email: &1.email, lang: &1.language})
      |> filter_audience_with_options(opts)

    {:ok, audience}
  end

  def get_target_audience(%Scope{} = _scope, target_audience, _opts) do
    Logger.error("Invalid target audience: #{target_audience}")
    {:error, :invalid_target_audience}
  end

  defp filter_audience_with_options(audience, opts) do
    only_langs = Keyword.get(opts, :only_langs, Admin.Languages.all_values()) |> MapSet.new()
    audience |> Enum.filter(fn user -> MapSet.member?(only_langs, user.lang) end)
  end

  def create_pixel(%Scope{} = scope, %Admin.Notifications.Notification{} = notification) do
    with {:ok, pixel_resp} <- Admin.UmamiApi.create_pixel(notification.name),
         pixel = %Admin.Notifications.Pixel{
           notification_id: notification.id,
           id: pixel_resp["id"],
           name: pixel_resp["name"],
           slug: pixel_resp["slug"]
         },
         {:ok, pixel} <- Admin.Repo.insert(pixel) do
      broadcast_localized_email(scope, notification.id, {:updated, pixel})
      {:ok, pixel}
    end
  end
end
