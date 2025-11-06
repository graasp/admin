defmodule AdminWeb.Router do
  use AdminWeb, :router

  import Oban.Web.Router
  import AdminWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {AdminWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_scope_for_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AdminWeb do
    pipe_through :api

    get "/up", HealthController, :up
    # alias route does the same as "/up"
    get "/health", HealthController, :up
  end

  scope "/", AdminWeb do
    pipe_through :browser

    get "/", LandingController, :home
  end

  # Other scopes may use custom stacks.
  # scope "/api", AdminWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:admin, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: AdminWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview

      # S3 debug interface
      delete "/s3/:id/:key", AdminWeb.Dev.S3Controller, :delete
      resources "/s3", AdminWeb.Dev.S3Controller, only: [:index, :show]

      live_session :dev_authenticated_user,
        on_mount: [{AdminWeb.UserAuth, :require_authenticated}] do
        live "/tools", AdminWeb.DevLive.Index, :index
      end
    end
  end

  ## Authentication LV routes
  scope "/", AdminWeb do
    pipe_through [:browser, :require_authenticated_user]

    live_session :require_authenticated_user,
      on_mount: [{AdminWeb.UserAuth, :require_authenticated}] do
      live "/users/settings", UserLive.Settings, :edit
      live "/users/settings/confirm-email/:token", UserLive.Settings, :confirm_email

      # users
      live "/users", UserLive.Listing, :list
      live "/users/new", UserLive.Form, :new

      # published_items
      live "/published_items/:id/unpublish", PublishedItemLive.Unpublish, :unpublish

      # apps
      scope "/apps" do
        live "/:app_id", AppInstanceLive.Show, :show
      end

      # analytics
      scope "/analytics" do
        live "/example", AnalyticsLive.Example, :show
      end

      scope "/publishers" do
        live "/", PublisherLive.Index, :index
        live "/new", PublisherLive.Form, :new

        scope "/:publisher_id" do
          live "/", PublisherLive.Show, :show
          live "/edit", PublisherLive.Form, :edit

          scope "/apps" do
            live "/new", AppInstanceLive.Form, :new

            scope "/:app_id" do
              live "/", AppInstanceLive.Show, :show
              live "/edit", AppInstanceLive.Form, :edit
            end
          end
        end
      end

      scope "/notifications" do
        live "/", NotificationLive.Index, :index
        live "/new", NotificationLive.New, :new
        live "/:id", NotificationLive.Show, :show
      end
    end

    post "/users/update-password", UserSessionController, :update_password
  end

  ## Authentication related routes
  scope "/", AdminWeb do
    pipe_through [:browser]

    live_session :current_user,
      on_mount: [{AdminWeb.UserAuth, :mount_current_scope}] do
      # live "/users/register", UserLive.Registration, :new
      live "/users/log-in", UserLive.Login, :new
      live "/users/log-in/:token", UserLive.Confirmation, :new
    end

    get "/users/register", UserSessionController, :register
    post "/users/log-in", UserSessionController, :create
    delete "/users/log-out", UserSessionController, :delete
  end

  ## Authenticated controller routes
  scope "/", AdminWeb do
    pipe_through [:browser, :require_authenticated_user]

    get "/dashboard", AdminController, :dashboard
    resources "/maintenance", PlannedMaintenanceController
    get "/users/:id", UserController, :show

    get "/published_items/featured", PublishedItemController, :featured
    resources "/published_items", PublishedItemController, except: [:update, :delete, :edit]
    post "/published_items/search", PublishedItemController, :search

    # oban dashboard for jobs
    oban_dashboard("/oban")
  end
end
