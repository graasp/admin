if Application.compile_env(:admin, :dev_routes) do
  defmodule AdminWeb.S3HTML do
    use AdminWeb, :html

    def index(assigns) do
      ~H"""
      <Layouts.admin flash={@flash} current_scope={@current_scope}>
        <.header>
          Listing Buckets
        </.header>
        <.table id="buckets-table" rows={@buckets} row_click={&JS.navigate(~p"/dev/s3/#{&1}")}>
          <:col :let={item} label="Name">{item.name}</:col>
          <:col :let={item} label="Creation Date">{item.creation_date}</:col>
        </.table>
      </Layouts.admin>
      """
    end

    def show(assigns) do
      ~H"""
      <Layouts.admin flash={@flash} current_scope={@current_scope}>
        <.header>
          Listing Bucket {@bucket.name}
        </.header>
        <.table id="bucket-content" rows={@bucket.contents}>
          <:col :let={item} label="Preview">
            <img class="size-10" src={item.url} alt={item.key} />
          </:col>
          <:col :let={item} label="Name">{item.key}</:col>
          <:col :let={item} label="Size">{item.size}</:col>
          <:action :let={item}>
            <.link href={~p"/dev/s3/#{@bucket.name}/#{item.key}"} method="delete">Delete</.link>
          </:action>
        </.table>
      </Layouts.admin>
      """
    end
  end
end
