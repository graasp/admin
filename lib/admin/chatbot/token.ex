defmodule Admin.Chatbot.Token do
  @moduledoc """
  Verifies the short-lived app JWT that Graasp core issues via
  `POST /:itemId/api-access-token` (see core's `AppService.getApiAccessToken`).

  Core signs `{sub: %{accountId, itemId, origin, key}}` with a shared HS256
  secret (`APPS_JWT_SECRET`) and no separate introspection endpoint exists,
  so we verify the signature locally with the same secret instead of calling
  back into core.
  """

  @type subject :: %{
          account_id: String.t(),
          item_id: String.t(),
          origin: String.t() | nil,
          key: String.t() | nil
        }

  @spec verify(token :: String.t(), expected_item_id :: String.t()) ::
          {:ok, subject()} | {:error, :invalid_token | :item_mismatch}
  def verify(token, expected_item_id) when is_binary(token) and is_binary(expected_item_id) do
    with {:ok, claims} <- Joken.Signer.verify(token, signer()),
         %{"sub" => %{"accountId" => account_id, "itemId" => item_id} = sub}
         when is_binary(account_id) and is_binary(item_id) <- claims do
      if item_id == expected_item_id do
        {:ok, %{account_id: account_id, item_id: item_id, origin: sub["origin"], key: sub["key"]}}
      else
        {:error, :item_mismatch}
      end
    else
      _ -> {:error, :invalid_token}
    end
  end

  defp signer do
    secret = Application.fetch_env!(:admin, :graasp_apps_jwt_secret)
    Joken.Signer.create("HS256", secret)
  end

  if Mix.env() != :prod do
    @doc """
    Mints a token signed the same way core would, for local testing without a
    running core instance (see `AdminWeb.Dev.ChatbotMockController`). Never
    compiled into a prod release.
    """
    @spec sign_dev_token(subject :: map()) :: {:ok, String.t()} | {:error, term()}
    def sign_dev_token(subject) when is_map(subject) do
      Joken.Signer.sign(%{"sub" => subject}, signer())
    end
  end
end
