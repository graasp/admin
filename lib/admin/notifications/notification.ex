defmodule Admin.Notifications.Notification do
  @moduledoc """
  Schema for storing notifications.
  """

  use Admin.Schema
  import Ecto.Changeset

  schema "notifications" do
    field :name, :string
    field :audience, :string
    field :default_language, :string
    field :use_strict_languages, :boolean, default: false
    field :total_recipients, :integer, default: 0
    field :sent_at, :utc_datetime

    has_many :logs, Admin.Notifications.Log
    has_many :localized_emails, Admin.Notifications.LocalizedEmail
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(notification, attrs, _user_scope) do
    notification
    |> cast(attrs, [:name, :audience, :default_language, :total_recipients])
    |> validate_required([:name, :audience, :default_language])
    |> validate_inclusion(:default_language, ["en", "fr", "es", "it", "de"])
  end

  def update_recipients(notification, %{total_recipients: _} = attrs) do
    notification
    |> cast(attrs, [:total_recipients])
    |> validate_required([:total_recipients])
  end

  def toggle_strict_languages(notification) do
    notification
    # cast to changeset, but do not use any attr values
    |> change(%{})
    |> put_change(:use_strict_languages, !notification.use_strict_languages)
  end

  def set_sent_at(notification) do
    notification
    |> change(%{})
    |> put_change(:sent_at, DateTime.utc_now())
  end

  # # Normalize each email string: trim, downcase, drop empty values
  # defp normalize_emails(changeset, key) do
  #   case get_change(changeset, key) do
  #     nil ->
  #       changeset

  #     emails when is_list(emails) ->
  #       cleaned =
  #         emails
  #         |> Enum.map(&normalize_email_item/1)
  #         |> Enum.reject(&(&1 == ""))

  #       put_change(changeset, key, cleaned)

  #     _other ->
  #       # If a non-list sneaks in, leave as-is; validate_emails_list will add an error
  #       changeset
  #   end
  # end

  # defp normalize_email_item(item) when is_binary(item) do
  #   item
  #   |> String.trim()
  #   |> String.downcase()
  # end

  # defp normalize_email_item(_), do: ""

  # # Validate the list and each element
  # defp validate_email_list(changeset, key) do
  #   # Ensure it's a list
  #   changeset =
  #     validate_change(changeset, key, fn key, value ->
  #       if is_list(value) do
  #         []
  #       else
  #         [%{key => "must be a list of strings"}]
  #       end
  #     end)

  #   recipients = get_field(changeset, key) || []

  #   # Validate each item is a binary and matches email format
  #   changeset =
  #     Enum.with_index(recipients)
  #     |> Enum.reduce(changeset, fn {email, idx}, acc ->
  #       cond do
  #         not is_binary(email) ->
  #           add_error(acc, key, "item at index #{idx} must be a string")

  #         not valid_email?(email) ->
  #           add_error(acc, key, "invalid email at index #{idx}: #{email}")

  #         true ->
  #           acc
  #       end
  #     end)

  #   changeset
  # end

  # # Pragmatic email validator; replace with your preferred validator if available.
  # defp valid_email?(email) when is_binary(email) do
  #   # Simple, commonly used pattern; not fully RFC-compliant but practical.
  #   Regex.match?(~r/^[^\s@]+@[^\s@]+\.[^\s@]+$/, email)
  # end
end
