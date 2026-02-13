defmodule Admin.Docs.Sections do
  defmacro __using__(opts) do
    path = Keyword.fetch!(opts, :path)

    folder_names =
      File.ls!(path)
      |> Enum.filter(fn name ->
        File.dir?(Path.join(path, name))
      end)

    quote bind_quoted: [folders: folder_names] do
      use Gettext, backend: AdminWeb.Gettext

      # For each folder, we generate a clause that calls dgettext/2
      for folder <- folders do
        def translate_section(unquote(folder)) do
          # This *literal* is what gettext.extract sees
          pgettext("documentation section", unquote(folder))
        end
      end
    end
  end
end
