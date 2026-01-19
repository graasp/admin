defmodule Admin.MailingWorkerTest do
  use Admin.DataCase
  use Oban.Testing, repo: Admin.Repo

  import Admin.AccountsFixtures
  import Admin.NotificationsFixtures

  describe "mailing worker" do
    test "correct inputs" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)

      args = %{
        user_id: scope.user.id,
        notification_id: notification.id
      }

      Oban.Testing.with_testing_mode(:manual, fn ->
        assert {:ok, _} =
                 args
                 |> Admin.MailingWorker.new()
                 |> Oban.insert()

        assert :ok = perform_job(Admin.MailingWorker, args)
      end)
    end

    test "invalid notification id" do
      scope = user_scope_fixture()

      args = %{
        user_id: scope.user.id,
        notification_id: Ecto.UUID.generate()
      }

      assert {:ok, _} =
               args
               |> Admin.MailingWorker.new()
               |> Oban.insert()

      assert {:cancel, :notification_not_found} = perform_job(Admin.MailingWorker, args)
    end

    test "invalid audience" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope, %{audience: "invalid"})

      args = %{
        user_id: scope.user.id,
        notification_id: notification.id
      }

      assert {:error, "Failed to send notification: :invalid_target_audience"} =
               perform_job(Admin.MailingWorker, args)
    end
  end
end
