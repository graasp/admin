defmodule Admin.Schema do
  defmacro __using__(_) do
    quote do
      use Ecto.Schema
      # use `created_at` instead of `inserted_at`
      @timestamps_opts inserted_at: :created_at

      # this allows to use UUID primary keys by default
      @primary_key {:id, :binary_id, autogenerate: true}
      @foreign_key_type :binary_id
      @derive Phoenix.Param
    end
  end
end
