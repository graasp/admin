defmodule Admin.H5PItemsTest do
  use Admin.DataCase, async: true
  import Admin.ItemsFixtures, only: [item_fixture: 2]
  import Admin.AccountsFixtures, only: [user_scope_fixture: 0]

  import Mox

  describe "h5p s3 files" do
    setup :verify_on_exit!

    test "delete s3 files associates with h5p" do
      scope = user_scope_fixture()
      content_id = Ecto.UUID.generate()
      item = item_fixture(scope, %{type: "h5p", extra: %{"h5p" => %{"contentId" => content_id}}})

      expect(ExAwsMock, :stream!, fn operation ->
        assert %ExAws.Operation.S3{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == "h5p-items"
        assert operation.params == %{"prefix" => "h5p-content/#{content_id}"}

        # return an empty list of buckets
        Stream.resource(fn -> :ok end, fn _ -> {:halt, :ok} end, fn _ -> [] end)
      end)

      expect(ExAwsMock, :request, fn operation ->
        assert %ExAws.Operation.S3DeleteAllObjects{} = operation
        # expect to get no bucket name since we are listing all buckets
        assert operation.bucket == "h5p-items"
        # operation.objects is a stream object

        # return an empty list of buckets
        {:ok,
         %{
           body:
             "<?xml version=\"1.0\" encoding=\"UTF-8\"?><DeleteResult xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"><Error><Code>NoSuchKey</Code><Key>thumbnails/1234/small</Key><Message>Key not found</Message></Error><Error><Code>NoSuchKey</Code><Key>thumbnails/1234/medium</Key><Message>Key not found</Message></Error><Error><Code>NoSuchKey</Code><Key>thumbnails/1234/large</Key><Message>Key not found</Message></Error><Error><Code>NoSuchKey</Code><Key>thumbnails/1234/original</Key><Message>Key not found</Message></Error></DeleteResult>",
           status_code: 200
         }}
      end)

      assert :ok == Admin.H5PItems.delete(item)
    end
  end
end
