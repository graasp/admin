defmodule AdminWeb.UserLive.Form do
  use AdminWeb, :live_view
  alias Admin.Accounts
  alias Admin.Accounts.User

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.admin flash={@flash} current_scope={@current_scope}>
      <.header>Create a new User</.header>

      <.form id="user_form" for={@form} phx-submit="save" phx-change="validate">
        <.input
          field={@form[:email]}
          type="email"
          label="Email"
          placeholder="Email"
          required
          phx-mounted={JS.focus()}
        />
        <.button variant="primary">Save</.button>
      </.form>
    </Layouts.admin>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    changeset = Accounts.change_user_email(%User{}, %{}, validate_unique: false)

    {:ok,
     socket
     |> assign(:form, to_form(changeset))}
  end

  @impl true
  def handle_event("save", %{"user" => %{"email" => email}}, socket) do
    case Accounts.register_user(%{email: email}) do
      {:ok, _user} ->
        {:noreply, socket |> put_flash(:info, "User registered") |> push_navigate(to: ~p"/users")}

      {:error, changeset} ->
        {:noreply,
         socket
         |> assign(:form, to_form(changeset))}
    end
  end

  @impl true
  def handle_event("validate", %{"user" => %{"email" => email}}, socket) do
    changeset = Accounts.change_user_email(%User{}, %{email: email}, validate_unique: false)

    {:noreply,
     socket
     |> assign(:form, to_form(changeset))}
  end
end
