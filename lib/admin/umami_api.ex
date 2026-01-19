defmodule Admin.UmamiApi do
  @moduledoc """
  This module exposes functions that interact with Umami and allow to create pixels for tracking users opening emails etc.
  """
  require Logger

  @slug_charset ~c"abcdefghijklmnopqrstuvwxyz0123456789"

  defp umami_origin do
    Application.get_env(:admin, :umami_origin, "https://umami.graasp.org")
  end

  defp base_request_options do
    [
      base_url: umami_origin()
    ]
  end

  def pixel_url(pixel) do
    with %{team_id: team_id} <- verify_auth() do
      "#{umami_origin()}/teams/#{team_id}/pixels/#{pixel.id}"
    end
  end

  def pixel_src(pixel) do
    "#{umami_origin()}/p/#{pixel.slug}"
  end

  defp global_req_options(options) do
    options |> Keyword.merge(Application.get_env(:admin, :umami_req_options, []))
  end

  defp get_team_id(teams) when is_list(teams) do
    teams
    |> Enum.find(fn %{"name" => name} = _ -> String.downcase(name) == "graasp" end)
    |> Map.get("id")
  end

  defp get_credentials do
    Application.get_env(:admin, :umami, [{:username, "admin"}, {:password, "umami"}])
    |> Map.new()
  end

  defp set_token(token) do
    Application.put_env(:admin, __MODULE__, token)
  end

  defp get_token do
    case Application.get_env(:admin, __MODULE__) do
      nil ->
        {:error, :not_set}

      token ->
        {:ok, token}
    end
  end

  @doc """
  Authenticate to Umami using the user credentials.

  Returns a token and the team_id to be used with future authenticated requests to the umami api.
  """
  def auth do
    Logger.debug("UmamiAPI: Authenticating")

    req =
      base_request_options()
      |> Keyword.merge(
        method: :post,
        url: "/api/auth/login"
      )
      |> global_req_options()
      |> Req.new()

    with {:ok, resp} <- Req.post(req, json: get_credentials()) do
      body = resp.body
      token = body["token"]
      set_token(token)
      Logger.debug("UmamiAPI: Refreshed token")
      team_id = get_team_id(get_in(body, ["user", "teams"]))

      %{token: token, team_id: team_id}
    end
  end

  def verify_auth do
    Logger.debug("UmamiAPI: Verify Auth")

    # get config
    with {:ok, token} <- get_token(),
         {:ok, resp} <-
           base_request_options()
           |> Keyword.merge(auth: {:bearer, token}, url: "/api/auth/verify")
           |> global_req_options()
           |> Req.new()
           |> Req.post() do
      %{token: token} |> Map.merge(handle_verify_response(resp))
    else
      {:error, _} ->
        auth()
    end
  end

  defp handle_verify_response(%Req.Response{status: 200} = resp) do
    team_id = get_team_id(get_in(resp.body, ["teams"]))
    %{team_id: team_id}
  end

  defp handle_verify_response(%Req.Response{status: 401} = _), do: auth()

  def create_pixel(name) when is_binary(name) do
    with %{token: token, team_id: team_id} <- verify_auth() do
      req =
        base_request_options()
        |> Keyword.merge(auth: {:bearer, token}, url: "/api/pixels")
        |> global_req_options()
        |> Req.new()

      slug = generate_slug()

      with {:ok, resp} <-
             Req.post(req,
               json: %{name: name, slug: slug, teamId: team_id}
             ) do
        case resp do
          %Req.Response{status: 200} ->
            body = resp |> Req.Response.to_map() |> Map.get(:body)
            {:ok, body}

          %Req.Response{status: 500} ->
            # do it again (because we had a collision)
            create_pixel(name)

          _ ->
            Logger.error(resp)
            {:error, resp}
        end
      end
    end
  end

  def generate_slug do
    len = 10
    # Use cryptographically strong randomness
    bytes = :crypto.strong_rand_bytes(len)

    bytes
    |> :binary.bin_to_list()
    |> Enum.map(fn b -> Enum.at(@slug_charset, rem(b, length(@slug_charset))) end)
    |> to_string()
  end
end
