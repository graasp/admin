defmodule AdminWeb.Layouts do
  @moduledoc """
  This module holds layouts and related functionality
  used by your application.
  """
  use AdminWeb, :html

  # Embed all files in layouts/* within this module.
  # The default root.html.heex file contains the HTML
  # skeleton of your application, namely HTML headers
  # and other static content.
  embed_templates "layouts/*"

  @doc """
  Renders your app layout.

  This function is typically invoked from every template,
  and it often contains your application menu, sidebar,
  or similar.

  ## Examples

      <Layouts.app flash={@flash}>
        <h1>Content</h1>
      </Layouts.app>

  """
  attr :flash, :map, required: true, doc: "the map of flash messages"

  attr :current_scope, :map,
    default: nil,
    doc: "the current [scope](https://hexdocs.pm/phoenix/scopes.html)"

  slot :inner_block, required: true

  def app(assigns) do
    ~H"""
    <%!-- <header class="navbar px-4 sm:px-6 lg:px-8">
      <div class="flex-1">
        <a
          href={~p"/dashboard"}
          class="flex-1 flex w-fit items-center gap-2"
        >
          <img src={~p"/images/logo.svg"} width="36" />
          <span class="text-sm font-semibold">Admin</span>
        </a>
      </div>
    </header> --%>

    <main class="px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl space-y-4">
        {render_slot(@inner_block)}
      </div>
    </main>

    <.flash_group flash={@flash} />
    """
  end

  @doc """
  Shows the flash group with standard titles and content.

  ## Examples

      <.flash_group flash={@flash} />
  """
  attr :flash, :map, required: true, doc: "the map of flash messages"
  attr :id, :string, default: "flash-group", doc: "the optional id of flash container"

  def flash_group(assigns) do
    ~H"""
    <div id={@id} aria-live="polite">
      <.flash kind={:info} flash={@flash} />
      <.flash kind={:success} flash={@flash} />
      <.flash kind={:error} flash={@flash} />

      <.flash
        id="client-error"
        kind={:error}
        title={gettext("We can't find the internet")}
        phx-disconnected={show(".phx-client-error #client-error") |> JS.remove_attribute("hidden")}
        phx-connected={hide("#client-error") |> JS.set_attribute({"hidden", ""})}
        hidden
      >
        {gettext("Attempting to reconnect")}
        <.icon name="hero-arrow-path" class="ml-1 size-3 motion-safe:animate-spin" />
      </.flash>

      <.flash
        id="server-error"
        kind={:error}
        title={gettext("Something went wrong!")}
        phx-disconnected={show(".phx-server-error #server-error") |> JS.remove_attribute("hidden")}
        phx-connected={hide("#server-error") |> JS.set_attribute({"hidden", ""})}
        hidden
      >
        {gettext("Attempting to reconnect")}
        <.icon name="hero-arrow-path" class="ml-1 size-3 motion-safe:animate-spin" />
      </.flash>
    </div>
    """
  end

  @doc """
  Provides dark vs light theme toggle based on themes defined in app.css.

  See <head> in root.html.heex which applies the theme before page load.
  """
  def theme_toggle(assigns) do
    ~H"""
    <div class="card relative flex flex-row items-center border-2 border-base-300 bg-base-300 rounded-full">
      <div class="absolute w-1/3 h-full rounded-full border-1 border-base-200 bg-base-100 brightness-200 left-0 [[data-theme=light]_&]:left-1/3 [[data-theme=dark]_&]:left-2/3 transition-[left]" />

      <button
        class="flex p-2 cursor-pointer w-1/3"
        phx-click={JS.dispatch("phx:set-theme")}
        data-phx-theme="system"
      >
        <.icon name="hero-computer-desktop-micro" class="size-4 opacity-75 hover:opacity-100" />
      </button>

      <button
        class="flex p-2 cursor-pointer w-1/3"
        phx-click={JS.dispatch("phx:set-theme")}
        data-phx-theme="light"
      >
        <.icon name="hero-sun-micro" class="size-4 opacity-75 hover:opacity-100" />
      </button>

      <button
        class="flex p-2 cursor-pointer w-1/3"
        phx-click={JS.dispatch("phx:set-theme")}
        data-phx-theme="dark"
      >
        <.icon name="hero-moon-micro" class="size-4 opacity-75 hover:opacity-100" />
      </button>
    </div>
    """
  end

  defp burger_menu(assigns) do
    ~H"""
    <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </div>
    """
  end

  def menu_bar(assigns) do
    ~H"""
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <%= if @current_scope.user do %>
          <div class="dropdown">
            <.burger_menu />
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li><.link navigate={~p"/users"}>Users</.link></li>
              <li>
                <.link navigate={~p"/published_items"}>Publications</.link>
                <ul class="p-2">
                  <li><.link navigate={~p"/published_items"}>Recent</.link></li>
                  <li><.link navigate={~p"/published_items/featured"}>Featured</.link></li>
                </ul>
              </li>
              <li><.link navigate={~p"/publishers"}>Apps</.link></li>
              <li><.link navigate={~p"/users/settings"}>Settings</.link></li>
            </ul>
          </div>
        <% end %>
        <.link navigate={~p"/dashboard"} class="btn btn-ghost text-xl">
          <img src="/images/logo.svg" width="32" />
          <span class="text-sm font-semibold">Admin</span>
        </.link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <%= if @current_scope.user do %>
            <li><.link navigate={~p"/users"}>Users</.link></li>
            <li>
              <details>
                <summary>Publications</summary>
                <ul class="p-2">
                  <li><.link navigate={~p"/published_items"}>Recent</.link></li>
                  <li><.link navigate={~p"/published_items/featured"}>Featured</.link></li>
                </ul>
              </details>
            </li>
            <li><.link navigate={~p"/publishers"}>Apps</.link></li>
            <li><.link navigate={~p"/users/settings"}>Settings</.link></li>
          <% end %>
        </ul>
      </div>
      <div class="navbar-end gap-1">
        <%= if @current_scope.user do %>
          <.link class="btn btn-ghost" href={~p"/users/log-out"} method="delete">Log out</.link>
        <% else %>
          <li>
            <.link href={~p"/users/log-in"}>Log in</.link>
          </li>
        <% end %>
        <.theme_toggle />
      </div>
    </div>
    """
  end
end
