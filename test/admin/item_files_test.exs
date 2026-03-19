defmodule Admin.ItemFilesTest do
  use ExUnit.Case

  import Mox

  alias Admin.ItemFiles

  describe "Delete files" do
    setup :verify_on_exit!

    test "when the file is not found" do
      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3DeleteAllObjects{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == "file-items"
        assert operation.objects == ["files/1234"]
        # return an empty list of buckets
        {:ok,
         %{
           body:
             "<?xml version=\"1.0\" encoding=\"UTF-8\"?><DeleteResult xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"><Error><Code>NoSuchKey</Code><Key>files/1234</Key><Message>Key not found</Message></Error></DeleteResult>",
           status_code: 200
         }}
      end)

      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3DeleteAllObjects{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == "file-items"

        assert operation.objects == [
                 "thumbnails/1234/small",
                 "thumbnails/1234/medium",
                 "thumbnails/1234/large",
                 "thumbnails/1234/original"
               ]

        # return an empty list of buckets
        {:ok,
         %{
           body:
             "<?xml version=\"1.0\" encoding=\"UTF-8\"?><DeleteResult xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"><Error><Code>NoSuchKey</Code><Key>thumbnails/1234/small</Key><Message>Key not found</Message></Error><Error><Code>NoSuchKey</Code><Key>thumbnails/1234/medium</Key><Message>Key not found</Message></Error><Error><Code>NoSuchKey</Code><Key>thumbnails/1234/large</Key><Message>Key not found</Message></Error><Error><Code>NoSuchKey</Code><Key>thumbnails/1234/original</Key><Message>Key not found</Message></Error></DeleteResult>",
           status_code: 200
         }}
      end)

      assert :ok == ItemFiles.delete([%{id: "1234", path: "files/1234"}])
    end

    test "when the file exists" do
      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3DeleteAllObjects{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == "file-items"
        assert operation.objects == ["files/1234"]
        # return an empty list of buckets
        {:ok,
         %{
           body:
             "<?xml version=\"1.0\" encoding=\"UTF-8\"?><DeleteResult xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"><Deleted><Key>files/1234</Key><VersionId>6ee013af9bdfbbe73e301ab6bcd4c47532cca0ad2a5ea9c1e4f35d3a74af9548</VersionId><DeleteMarkerVersionId>e64e18e960769b519b01cdd4b687e2663a033b3a3900b4067207af5a76e0a1fe</DeleteMarkerVersionId></Deleted></DeleteResult>",
           status_code: 200
         }}
      end)

      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3DeleteAllObjects{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == "file-items"

        assert operation.objects == [
                 "thumbnails/1234/small",
                 "thumbnails/1234/medium",
                 "thumbnails/1234/large",
                 "thumbnails/1234/original"
               ]

        # return an empty list of buckets
        {:ok,
         %{
           body:
             "<?xml version=\"1.0\" encoding=\"UTF-8\"?><DeleteResult xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"><Deleted><Key>thumbnails/1234</Key><VersionId>6ee013af9bdfbbe73e301ab6bcd4c47532cca0ad2a5ea9c1e4f35d3a74af9548</VersionId><DeleteMarkerVersionId>e64e18e960769b519b01cdd4b687e2663a033b3a3900b4067207af5a76e0a1fe</DeleteMarkerVersionId></Deleted></DeleteResult>",
           status_code: 200
         }}
      end)

      assert :ok == ItemFiles.delete([%{id: "1234", path: "files/1234"}])
    end
  end
end
