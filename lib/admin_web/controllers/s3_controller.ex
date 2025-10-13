defmodule AdminWeb.S3Controller do
  @moduledoc """
  This module provides a controller for managing S3 buckets and objects.

  It includes actions for listing buckets, showing bucket details, and deleting objects.
  """
  @dev_enabled Application.compile_env(:admin, :dev_routes)

  use AdminWeb, :controller

  def index(conn, _params) do
    buckets = Admin.S3.list_buckets()
    render(conn, :index, buckets: buckets)
  end

  def show(conn, %{"id" => bucket}) do
    bucket = Admin.S3.list_objects(bucket)

    render(conn, :show, bucket: bucket)
  end

  def delete(conn, %{"id" => bucket, "key" => key}) do
    Admin.S3.delete_object(bucket, key)

    redirect(conn, to: redirect_after_delete(bucket))
  end

  # Compute redirect path at compile time to avoid ~p compilation in prod
  if @dev_enabled do
    # Dev/test: redirect back to the bucket page under /dev
    defp redirect_after_delete(bucket), do: ~p"/dev/s3/#{bucket}"
  else
    # Prod: choose a safe fallback that exists in prod (e.g., home or buckets index)
    # Avoid using ~p to dev-only routes here.
    defp redirect_after_delete(_bucket), do: ~p"/"
  end
end
