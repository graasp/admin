defmodule Admin.Housekeeping do
  @moduledoc """
  This module defines a few functions that are used to do tasks in the nodejs backend
  """

  defp backend_origin do
    Application.fetch_env!(:admin, :backend_origin)
  end

  defp backend_secret_auth do
    Application.fetch_env!(:admin, :admin_shared_secret)
  end

  defp base_request_options do
    [
      base_url: backend_origin(),
      auth: {:bearer, backend_secret_auth()}
    ]
  end

  defp global_req_options(options) do
    options |> Keyword.merge(Application.get_env(:admin, :backend_req_options, []))
  end

  defp check_status(%Req.Response{} = response) do
    case response.status do
      401 -> {:error, Map.get(response.body, "message", "Unauthorized")}
      200 -> {:ok, 200}
      _ -> {:error, :unhandled_status_code}
    end
  end

  def bust_cache do
    req =
      base_request_options()
      |> Keyword.merge(
        method: :get,
        url: "/api/bust-cache"
      )
      |> global_req_options()
      |> Req.new()

    with {:ok, response} <- Req.request(req),
         {:ok, _status} <- check_status(response) do
      body =
        response.body

      {:ok, body}
    end
  end
end
