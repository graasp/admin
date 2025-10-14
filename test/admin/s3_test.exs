defmodule Admin.S3Test do
  use ExUnit.Case

  import Mox

  alias Admin.S3.Bucket
  alias Admin.S3.Object

  describe "S3.Bucket" do
    test "creates a bucket from a map" do
      create_bucket = %{name: "my-bucket", creation_date: Date.from_iso8601("2025-10-13")}
      bucket = Bucket.new(create_bucket)
      assert bucket.name == "my-bucket"
      assert bucket.creation_date == create_bucket.creation_date
    end
  end

  describe "S3.Object" do
    test "creates an object from a map" do
      create_object = %{
        key: "my-key",
        size: "1024",
        last_modified: Date.from_iso8601("2025-10-13")
      }

      object = Object.new("my-bucket", create_object)
      assert object.key == "my-key"
      assert object.size == "1.0 KiB"
      assert object.last_modified == Date.from_iso8601("2025-10-13")
      assert object.url =~ "https://s3.eu-central-1.amazonaws.com/my-bucket"
    end
  end

  describe "List buckets" do
    setup :verify_on_exit!

    test "when there are no buckets" do
      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == ""
        assert operation.http_method == :get
        # return an empty list of buckets
        {:ok, %{body: %{buckets: []}}}
      end)

      buckets = Admin.S3.list_buckets()
      assert buckets == []
    end

    test "with buckets existing" do
      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == ""
        assert operation.http_method == :get
        # return an empty list of buckets
        {:ok,
         %{
           body: %{
             buckets: [
               %{name: "my-bucket", creation_date: "2023-01-01"},
               %{name: "my-other-bucket", creation_date: "2023-01-02"}
             ]
           }
         }}
      end)

      buckets = Admin.S3.list_buckets()

      assert buckets == [
               %Bucket{name: "my-bucket", creation_date: "2023-01-01"},
               %Bucket{name: "my-other-bucket", creation_date: "2023-01-02"}
             ]
    end
  end

  describe "List Objects" do
    test "No objects" do
      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == "my-bucket"
        assert operation.http_method == :get
        # return an empty list of buckets
        {:ok,
         %{
           body: %{
             name: "my-bucket",
             contents: []
           }
         }}
      end)

      %{name: name, contents: objects} = Admin.S3.list_objects("my-bucket")
      assert name == "my-bucket"
      assert objects == []
    end

    test "A few objects" do
      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == "my-bucket"
        assert operation.http_method == :get
        # return an empty list of buckets
        {:ok,
         %{
           body: %{
             name: "my-bucket",
             contents: [
               %{key: "object1", size: "1024", last_modified: "2023-01-01"},
               %{key: "object2", size: "2048", last_modified: "2023-01-02"}
             ]
           }
         }}
      end)

      %{name: name, contents: objects} = Admin.S3.list_objects("my-bucket")
      assert name == "my-bucket"

      # partially match to ensure that the objects contain the provided information
      assert [
               %Object{key: "object1", size: "1.0 KiB", last_modified: "2023-01-01"},
               %Object{key: "object2", size: "2.0 KiB", last_modified: "2023-01-02"}
             ] = objects

      # ensure that each object has a presigned url
      Enum.each(objects, fn object ->
        assert object.url =~ "s3.eu-central-1.amazonaws.com"
      end)
    end
  end
end
