defmodule AdminWeb.S3Controller do
  use AdminWeb, :controller

  def index(conn, _params) do
    buckets = Admin.S3.list_buckets()
    render(conn, :index, buckets: buckets)
  end

  def show(conn, %{"id" => bucket}) do
    bucket = Admin.S3.list_objects(bucket)

    render(conn, :show, bucket: bucket)
  end
end
