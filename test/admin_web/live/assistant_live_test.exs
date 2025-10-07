defmodule AdminWeb.AssistantLiveTest do
  use AdminWeb.ConnCase

  import Phoenix.LiveViewTest
  import Admin.SmartAssistantsFixtures

  @create_attrs %{name: "some name", prompt: "some prompt", picture: "some picture"}
  @update_attrs %{name: "some updated name", prompt: "some updated prompt", picture: "some updated picture"}
  @invalid_attrs %{name: nil, prompt: nil, picture: nil}

  setup :register_and_log_in_user

  defp create_assistant(%{scope: scope}) do
    assistant = assistant_fixture(scope)

    %{assistant: assistant}
  end

  describe "Index" do
    setup [:create_assistant]

    test "lists all assistants", %{conn: conn, assistant: assistant} do
      {:ok, _index_live, html} = live(conn, ~p"/assistants")

      assert html =~ "Listing Assistants"
      assert html =~ assistant.name
    end

    test "saves new assistant", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/assistants")

      assert {:ok, form_live, _} =
               index_live
               |> element("a", "New Assistant")
               |> render_click()
               |> follow_redirect(conn, ~p"/assistants/new")

      assert render(form_live) =~ "New Assistant"

      assert form_live
             |> form("#assistant-form", assistant: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#assistant-form", assistant: @create_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/assistants")

      html = render(index_live)
      assert html =~ "Assistant created successfully"
      assert html =~ "some name"
    end

    test "updates assistant in listing", %{conn: conn, assistant: assistant} do
      {:ok, index_live, _html} = live(conn, ~p"/assistants")

      assert {:ok, form_live, _html} =
               index_live
               |> element("#assistants-#{assistant.id} a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/assistants/#{assistant}/edit")

      assert render(form_live) =~ "Edit Assistant"

      assert form_live
             |> form("#assistant-form", assistant: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, index_live, _html} =
               form_live
               |> form("#assistant-form", assistant: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/assistants")

      html = render(index_live)
      assert html =~ "Assistant updated successfully"
      assert html =~ "some updated name"
    end

    test "deletes assistant in listing", %{conn: conn, assistant: assistant} do
      {:ok, index_live, _html} = live(conn, ~p"/assistants")

      assert index_live |> element("#assistants-#{assistant.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#assistants-#{assistant.id}")
    end
  end

  describe "Show" do
    setup [:create_assistant]

    test "displays assistant", %{conn: conn, assistant: assistant} do
      {:ok, _show_live, html} = live(conn, ~p"/assistants/#{assistant}")

      assert html =~ "Show Assistant"
      assert html =~ assistant.name
    end

    test "updates assistant and returns to show", %{conn: conn, assistant: assistant} do
      {:ok, show_live, _html} = live(conn, ~p"/assistants/#{assistant}")

      assert {:ok, form_live, _} =
               show_live
               |> element("a", "Edit")
               |> render_click()
               |> follow_redirect(conn, ~p"/assistants/#{assistant}/edit?return_to=show")

      assert render(form_live) =~ "Edit Assistant"

      assert form_live
             |> form("#assistant-form", assistant: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert {:ok, show_live, _html} =
               form_live
               |> form("#assistant-form", assistant: @update_attrs)
               |> render_submit()
               |> follow_redirect(conn, ~p"/assistants/#{assistant}")

      html = render(show_live)
      assert html =~ "Assistant updated successfully"
      assert html =~ "some updated name"
    end
  end
end
