defmodule AdminWeb.DateTimeComponentTest do
  use AdminWeb.ConnCase, async: true
  import Phoenix.Template

  describe "relative_date/1" do
    test "less than 5 seconds ago is now" do
      Enum.each(-5..0, fn offset ->
        assert render_to_string(AdminWeb.DateTimeComponents, "relative_date", "html", %{
                 date: NaiveDateTime.local_now() |> NaiveDateTime.add(offset, :second)
               }) =~ "now"
      end)
    end

    test "less than 60 seonds ago" do
      Enum.each([6, 10, 20, 40, 60], fn offset ->
        assert render_to_string(AdminWeb.DateTimeComponents, "relative_date", "html", %{
                 date: NaiveDateTime.local_now() |> NaiveDateTime.add(-1 * offset, :second)
               }) =~ "#{offset}s ago"
      end)
    end

    test "less than an hour ago" do
      Enum.each([2, 20, 35, 47, 59], fn offset ->
        assert render_to_string(AdminWeb.DateTimeComponents, "relative_date", "html", %{
                 date: NaiveDateTime.local_now() |> NaiveDateTime.add(-1 * offset, :minute)
               }) =~ "#{offset} minutes ago"
      end)
    end

    test "less than a day ago" do
      Enum.each([2, 5, 8, 13, 20, 23], fn offset ->
        assert render_to_string(AdminWeb.DateTimeComponents, "relative_date", "html", %{
                 date: NaiveDateTime.local_now() |> NaiveDateTime.add(-1 * offset, :hour)
               }) =~ "#{offset}h ago"
      end)
    end

    test "more than a day ago" do
      Enum.each([2, 5, 8, 13, 20, 23], fn offset ->
        assert render_to_string(AdminWeb.DateTimeComponents, "relative_date", "html", %{
                 date: NaiveDateTime.local_now() |> NaiveDateTime.add(-1 * offset, :day)
               }) =~ "#{offset}d ago"
      end)
    end

    test "in the future" do
      assert render_to_string(AdminWeb.DateTimeComponents, "relative_date", "html", %{
               date:
                 NaiveDateTime.local_now()
                 |> NaiveDateTime.add(1, :day)
                 |> NaiveDateTime.add(1, :second)
             }) =~ "in 1d"
    end
  end
end
