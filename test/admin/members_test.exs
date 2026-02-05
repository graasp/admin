defmodule Admin.MembersTest do
  use Admin.DataCase

  alias Admin.Accounts

  describe "member extra" do
    test "no extra is ok" do
      assert {:ok, member} =
               Accounts.create_member(%{
                 name: "Someone",
                 email: "unknown@example.com",
                 type: "individual"
               })

      assert member.extra == nil
    end

    test "no lang in extra is ok" do
      assert {:ok, member} =
               Accounts.create_member(%{
                 name: "Someone",
                 email: "unknown@example.com",
                 type: "individual",
                 extra: %{}
               })

      assert member.extra == %{}
    end

    test "fails if extra is not a map" do
      assert {:error, %Ecto.Changeset{} = changeset} =
               Accounts.create_member(%{
                 name: "Someone",
                 email: "unknown@example.com",
                 type: "individual",
                 extra: ["not a map"]
               })

      assert changeset.errors[:extra] == {"is invalid", [{:type, :map}, {:validation, :cast}]}
    end

    test "fails if lang in extra is empty" do
      assert {:error, %Ecto.Changeset{} = changeset} =
               Accounts.create_member(%{
                 name: "Someone",
                 email: "unknown@example.com",
                 type: "individual",
                 extra: %{"lang" => ""}
               })

      assert changeset.errors[:extra] == {"must be a non-empty string", []}
    end

    test "has a valid lang in extra" do
      assert {:ok, member} =
               Accounts.create_member(%{
                 name: "Someone",
                 email: "unknown@example.com",
                 type: "individual",
                 extra: %{"lang" => "en"}
               })

      assert member.extra == %{"lang" => "en"}
    end
  end
end
