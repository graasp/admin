defmodule AdminWeb.S3Controller do
  @moduledoc """
  This module provides a controller for managing S3 buckets and objects.

  It includes actions for listing buckets, showing bucket details, and deleting objects.
  """

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

    redirect(conn, to: ~p"/dev/s3/#{bucket}")
  end
end
