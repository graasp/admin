defmodule AdminWeb.PublicationIndexLiveTest do
  use AdminWeb.ConnCase, async: true

  import Phoenix.LiveViewTest

  setup %{conn: conn} do
    %{conn: conn} = register_and_log_in_user(%{conn: conn})
    :ok
    {:ok, conn: conn}
  end

  test "shows error when reindex fails", %{conn: conn} do
    Application.put_env(:admin, :publication_index_url, "http://example")
    Application.put_env(:admin, :publication_index_header_value, "token")

    client = Module.concat([__MODULE__, :FailClient])

    defmodule client do
      def new(_opts), do: :req_request
      def request(_req), do: {:error, :econnrefused}
    end

    Application.put_env(:admin, :publication_index_http_client, client)

    {:ok, view, _html} = live(conn, "/publications/reindex")

    view |> element("button", "Start Reindex") |> render_click()

    assert render(view) =~ "Reindex failed"
  end

  test "show waitingstatus on success", %{conn: conn} do
    Application.put_env(:admin, :publication_index_url, "http://example")
    Application.put_env(:admin, :publication_index_header_value, "token")

    client = Module.concat([__MODULE__, :OkClient])

    defmodule client do
      def new(_opts), do: :req_request
      def request(_req) do
        resp = %Req.Response{status: 200, body: "ok"}
        {:ok, resp}
      end
    end

    Application.put_env(:admin, :publication_index_http_client, client)

    {:ok, view, _html} = live(conn, "/publications/reindex")

    view |> element("button", "Start Reindex") |> render_click()

    refute render(view) =~ "Reindex failed"

    assert view |> element("button[disabled]", "Start Reindex") |> has_element?()
  end
end
