defmodule Admin.S3 do
  @moduledoc """
  This module provides functions for interacting with Amazon S3.
  """

  alias Admin.Utils.FileSize
  alias ExAws.S3

  defmodule Bucket do
    @moduledoc """
    Struct to represent a S3 Bucket
    """
    @derive {Phoenix.Param, key: :name}
    defstruct [:name, :creation_date]

    def new(%{name: name, creation_date: creation_date}) do
      %__MODULE__{
        name: name,
        creation_date: creation_date
      }
    end
  end

  defmodule Object do
    @moduledoc """
    Struct to represent a S3 Object
    """
    @derive {Phoenix.Param, key: :key}
    defstruct [:key, :size, :last_modified, :url]

    def new(bucket, %{key: key, size: size, last_modified: last_modified}) do
      %__MODULE__{
        key: key,
        size: FileSize.humanize_size(size |> String.to_integer()),
        last_modified: last_modified,
        url: Admin.S3.get_object_url(bucket, key)
      }
    end
  end

  alias Admin.S3.Bucket
  alias Admin.S3.Object

  def list_buckets do
    {:ok, buckets} = S3.list_buckets() |> ExAws.request()
    buckets.body.buckets |> Enum.map(&Bucket.new/1)
  end

  def list_objects(bucket) do
    {:ok, bucket_objects} =
      S3.list_objects(bucket)
      |> ExAws.request()

    %{
      name: bucket_objects.body.name,
      contents: bucket_objects.body.contents |> Enum.map(&Object.new(bucket, &1))
    }
  end

  def get_object_url(bucket, key) do
    {:ok, url} =
      :s3 |> ExAws.Config.new([]) |> S3.presigned_url(:get, bucket, key)

    url
  end

  def delete_object(bucket, key) do
    {:ok, _} = S3.delete_object(bucket, key) |> ExAws.request()
  end
end
