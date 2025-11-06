defmodule Admin.MailerWorkerTest do
  use Admin.DataCase
  use Oban.Testing, repo: Admin.Repo

  import Admin.AccountsFixtures
  import Admin.NotificationsFixtures

  describe "mailer worker" do
    test "correct inputs" do
      scope = user_scope_fixture()
      member = member_fixture()
      notification = notification_fixture(scope)

      args = %{
        member_email: member.email,
        user_id: scope.user.id,
        notification_id: notification.id
      }

      Oban.Testing.with_testing_mode(:manual, fn ->
        assert {:ok, _} =
                 args
                 |> Admin.MailerWorker.new()
                 |> Oban.insert()

        assert :ok = perform_job(Admin.MailerWorker, args)
      end)
    end

    test "invalid member email" do
      scope = user_scope_fixture()
      notification = notification_fixture(scope)

      args = %{
        member_email: "toto@email.com",
        user_id: scope.user.id,
        notification_id: notification.id
      }

      assert {:ok, _} =
               args
               |> Admin.MailerWorker.new()
               |> Oban.insert()

      assert {:cancel, :member_not_found} = perform_job(Admin.MailerWorker, args)
    end

    test "invalid notification id" do
      scope = user_scope_fixture()
      member = member_fixture()

      args = %{
        member_email: member.email,
        user_id: scope.user.id,
        notification_id: Ecto.UUID.generate()
      }

      assert {:ok, _} =
               args
               |> Admin.MailerWorker.new()
               |> Oban.insert()

      assert {:cancel, :notification_not_found} = perform_job(Admin.MailerWorker, args)
    end
  end
end
