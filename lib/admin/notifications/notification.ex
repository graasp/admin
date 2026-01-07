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

    has_many :localized_emails, Admin.Notifications.LocalizedEmail,
      preload_order: [asc: :language]

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(notification, attrs, _user_scope) do
    notification
    |> cast(attrs, [:name, :audience, :default_language, :use_strict_languages, :total_recipients])
    |> validate_required([:name, :audience, :default_language])
    |> validate_inclusion(:default_language, ["en", "fr", "es", "it", "de"])
    |> validate_inclusion(:use_strict_languages, [true, false])
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
end
