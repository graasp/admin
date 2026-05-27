defmodule AdminWeb.DocsHTML do
  use AdminWeb, :html

  embed_templates "docs_html/*"

  attr :href, :string, required: true

  def doc_back_link(assigns) do
    ~H"""
    <.link class="btn btn-ghost w-fit" href={@href}>
      <.icon name="hero-arrow-left" /> {gettext("Back to documentation")}
    </.link>
    """
  end

  attr :page, :map, required: true
  attr :tags, :list, default: []

  def doc_article(assigns) do
    ~H"""
    <article class="flex flex-col bg-base-100 py-8 px-12 rounded-lg w-full h-full">
      <h1 class="text-4xl font-bold text-primary mb-4">{@page.title}</h1>
      <div :if={@tags != []} class="flex flex-row gap-1">
        <.link :for={tag <- @tags} class="badge badge-primary" href={~p"/docs/?tag=#{tag}"}>
          {tag}
        </.link>
      </div>
      <p class="text-gray-400 text-sm mb-4"></p>
      <div class="prose">{raw(@page.body)}</div>
    </article>
    """
  end

  def doc_contact_cta(assigns) do
    ~H"""
    <div class="flex flex-col items-center md:flex-row bg-base-100 p-6 rounded-lg justify-between w-full">
      <span>{gettext("Did not find what you were looking for?")}</span>
      <.link class="btn btn-primary" href={~p"/contact"}>
        {gettext("Contact us")}
      </.link>
    </div>
    """
  end

  attr :sections, :list, required: true
  attr :default_section, :string, required: true
  attr :translate_section, :any, required: true
  attr :page_href, :any, required: true
  attr :show_locale_badge, :boolean, default: false

  def doc_sections_grid(assigns) do
    ~H"""
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 wrap">
      <article
        :for={{section, section_pages} <- @sections}
        id={section}
        class={[
          if(section == @default_section, do: "col-span-1 sm:col-span-2", else: "col-span-1"),
          "flex flex-col gap-4 bg-base-100 p-6 rounded-lg"
        ]}
      >
        <h2 :if={section != @default_section} class="text-2xl font-semibold text-primary">
          {@translate_section.(section)}
        </h2>
        <div :for={page <- section_pages} class="flex flex-col">
          <.link href={@page_href.(page)}>
            {page.title}
            <span
              :if={@show_locale_badge and page.locale != Gettext.get_locale()}
              class="badge badge-outline border-1 badge-neutral badge-xs align-top"
            >
              {page.locale}
            </span>
          </.link>
          <span class="text-sm text-neutral">{page.description}</span>
        </div>
      </article>
    </div>
    """
  end
end
