defmodule AdminWeb.LandingHTML do
  @moduledoc """
  This module contains pages rendered by LandingController.
  """
  alias Admin.Languages
  use AdminWeb, :html

  def team do
    [
      %{name: "Denis Gillet", role: "President", src: "/images/team/denis.webp"},
      %{
        name: "María Jesús Rodríguez‑Triana",
        role: "VP Research",
        src: "/images/team/maria.webp"
      },
      %{name: "Juan Carlos Farah", role: "VP Product", src: "/images/team/juancarlos.webp"},
      %{name: "Kim Lan Phan Hoang", role: "VP Engineering", src: "/images/team/kim.webp"},
      %{name: "Jérémy La Scala", role: "VP Outreach", src: "/images/team/jeremy.webp"},
      %{name: "Basile Spaenlehauer", role: "VP Technology", src: "/images/team/basile.webp"},
      %{
        name: "Michele Notari",
        role: "VP Education and Content",
        src: "/images/team/michele.webp"
      },
      %{name: "Hagop Taminian", role: "Software Engineer", src: "/images/team/hagop.webp"},
      %{name: "Philippe Kobel", role: "Ambassador", src: "/images/team/philippe.webp"}
    ]
  end

  def papers do
    [
      %{
        title: "Integrated model for comprehensive digital education platforms",
        year: "2022",
        authors:
          "Denis Gillet, Isabelle Vonèche-Cardia, Juan Carlos Farah, Kim Lan Phan Hoang, María Jesús Rodríguez-Triana",
        url: "https://ieeexplore.ieee.org/abstract/document/9766795"
      },
      %{
        title:
          "Understanding teacher design practices for digital inquiry–based science learning: The case of Go-Lab",
        year: "2021",
        authors:
          "Ton de Jong, Denis Gillet, María Jesús Rodríguez-Triana, Tasos Hovardas, Diana Dikke, Rosa Doran, Olga Dziabenko, Jens Koslowsky, Miikka Korventausta, Effie Law, Margus Pedaste, Evita Tasiopoulou, Gérard Vidal, Zacharias C Zacharia",
        url: "https://link.springer.com/article/10.1007/s11423-020-09904-z"
      },
      %{
        title: "Stimulating Brainstorming Activities with Generative AI in Higher Education",
        year: "2025",
        authors: "Jérémy La Scala, Sonia Sahli, Denis Gillet",
        url: "https://ieeexplore.ieee.org/document/11016340"
      },
      %{
        title:
          "Implementation Framework and Strategies for AI-Augmented Open Educational Resources (OER): A Comprehensive Approach Applied to Secondary and Higher Education",
        year: "2024",
        authors: "Denis Gillet, Michele Notari, Basile Spacnlchauer, Thibault Reidy",
        url: "https://ieeexplore.ieee.org/document/10837633"
      },
      %{
        title:
          "Developing Transversal Skills and Strengthening Collaborative Blended Learning Activities in Engineering Education: a Pilot Study",
        year: "2022",
        authors: "Jérémy La Scala; Graciana Aad; Isabelle Vonèche-Cardia; Denis Gillet",
        url: "https://ieeexplore.ieee.org/abstract/document/10031948"
      },
      %{
        title:
          "Introducing Alternative Value Proposition Canvases for Collaborative and Blended Design Thinking Activities in Science and Engineering Education",
        year: "2022",
        authors: "Denis Gillet; Isabelle Vonèche-Cardia; Jérémy La Scala",
        url: "https://ieeexplore.ieee.org/abstract/document/10148548"
      },
      %{
        title:
          "Promoting computational thinking skills in non-computer-science students: Gamifying computational notebooks to increase student engagement",
        year: "2022",
        authors:
          "Alessio De Santo, Juan Carlos Farah, Marc Lafuente Martínez, Arielle Moro, Kristoffer Bergram, Aditya Kumar Purohit, Pascal Felber, Denis Gillet, Adrian Holzer",
        url:
          "https://arodes.hes-so.ch/record/10857/files/deSanto_2022_promoting_computational_thinking_skills_non_computer_science_students.pdf"
      },
      %{
        title:
          "Supporting developers in creating web apps for education via an app development framework",
        year: "2022",
        authors: "Juan Carlos Farah, Sandy Ingram, Denis Gillet",
        url:
          "https://arodes.hes-so.ch/record/10447/files/Ingram_2022_supporting_developers_creating_web_apps_education_app_development_framework_POSTPRINT.pdf"
      },
      %{
        title: "Promoting and implementing digital STEM education at secondary schools in Africa",
        year: "2019",
        authors:
          "Denis Gillet, Bosun Tijani, Senam Beheton, Juan Carlos Farah, Diana Dikke, Aurelle Noutahi, Rosa Doran, Nuno RC Gomes, Sam Rich, Ton De Jong, Célia Gavaud",
        url:
          "https://infoscience.epfl.ch/entities/publication/c622fa65-9e9e-4d9c-b279-2ec657cf828a"
      },
      %{
        title: "Innovations in STEM education: the Go-Lab federation of online labs (2014)",
        year: "2014",
        authors: "Ton de Jong, Sofoklis Sotiriou, Denis Gillet",
        url: "https://link.springer.com/article/10.1186/s40561-014-0003-6"
      },
      %{
        title:
          "Using Social Media for Collaborative Learning in Higher Education: A Case Study (2012)",
        year: "2012",
        authors: "Na Li, Sandy El Helou, Denis Gillet",
        url:
          "https://infoscience.epfl.ch/entities/publication/672772bf-1312-41b3-9e8b-d1f27415e482"
      }
    ]
  end

  def collections("fr"),
    do: [
      %{
        href:
          "https://graasp.org/player/0604830c-6241-4fc0-8337-c64390d8b2c3/fbc0e22d-c972-461e-bf40-ec83d3ce4e9f?fullscreen:false",
        src: "/images/capsules/coeur.webp",
        title: "Préparation à la dissection du coeur"
      },
      %{
        href:
          "https://graasp.org/player/95b4e981-56d0-42b2-9672-13c546c79aa1/95b4e981-56d0-42b2-9672-13c546c79aa1?fullscreen=false",
        title: "GLOBE : utiliser des mesures prises dans l'environnement",
        src: "/images/capsules/Globe_logo.webp"
      },
      %{
        href:
          "https://graasp.org/player/8bea12d8-061d-4c00-807d-6501e2778312/8bea12d8-061d-4c00-807d-6501e2778312?fullscreen=false",
        title: "Virus SARS-CoV-2",
        src: "/images/capsules/covid.webp"
      },
      %{
        href:
          "https://graasp.org/player/7336b9f7-e161-4990-9d74-0bdb0f04409e/4baf6561-c264-45d8-89ea-b855537656b7?fullscreen=false",
        title: "Comprendre l'effet de serre climatique",
        src: "/images/capsules/climate.webp"
      },
      %{
        href:
          "https://graasp.org/player/e14d82a9-2824-45ad-876c-1ac317319820/e14d82a9-2824-45ad-876c-1ac317319820?fullscreen=false",
        title: "Scrabble des formes irrégulières du présent",
        src: "/images/capsules/scrabble.webp"
      },
      %{
        href:
          "https://graasp.org/player/4a185298-3c1e-44f6-918f-378568499643/4a185298-3c1e-44f6-918f-378568499643?fullscreen=false",
        title: "Séquence du corps humain en bilingue",
        src: "/images/capsules/corps.webp"
      }
    ]

  embed_templates "landing_html/*"

  attr :id, :string, required: true, doc: "The id of the section"
  attr :title, :string, required: true, doc: "The title of the section"
  attr :image_src, :string, required: true, doc: "The source of the image"
  slot :inner_block, doc: "The content that follows the section"
  slot :content, doc: "The inside content for the section"
  slot :action, doc: "Actions at the end of the section content"

  def section(assigns) do
    ~H"""
    <div class="flex flex-col gap-12" id={@id}>
      <div class="flex flex-col">
        <div class="flex flex-col gap-0 lg:flex-row lg:gap-6">
          <div class="flex flex-col items-center flex-[1_1_0%]">
            <img
              alt={@title}
              src={@image_src}
              class="max-w-[500px]"
            />
          </div>
          <div class="flex flex-col flex-[2_1_0%] gap-6 text-container">
            <h2 class="text-2xl font-bold lg:text-3xl text-primary text-balance">
              {@title}
            </h2>
            <%= for content <- @content do %>
              <p>{render_slot(content)}</p>
            <% end %>
            <div class="flex flex-row gap-2 flex-wrap">
              <%= for action <- @action do %>
                {render_slot(action)}
              <% end %>
            </div>
          </div>
        </div>
      </div>
      {render_slot(@inner_block)}
    </div>
    """
  end

  attr :title, :string, required: true, doc: "The title of the card"
  attr :icon, :string, required: true, doc: "The name of the icon"
  slot :inner_block, doc: "The content inside the card"

  def card(assigns) do
    ~H"""
    <div class="card bg-base-100 border border-2 border-base-300 text-primary">
      <div class="card-body flex flex-row items-center gap-4">
        <div class="card-icon">
          <.icon name={@icon} class="size-10" />
        </div>
        <div>
          <p class="text-lg font-bold">
            {@title}
          </p>
          {render_slot(@inner_block)}
        </div>
      </div>
    </div>
    """
  end

  attr :href, :string, required: true, doc: "The URL of the collection"
  attr :src, :string, required: true, doc: "The URL of the collection image"
  attr :title, :string, required: true, doc: "The title of the collection"

  def collection_card(assigns) do
    ~H"""
    <div class="bg-base-100 rounded-2xl shadow-md">
      <a
        href={@href}
        target="_blank"
        rel="noopener noreferrer"
        alt={@title}
      >
        <img
          src={@src}
          alt={@title}
          class="w-full h-full object-cover aspect-square overflow-hidden rounded-2xl "
        />
      </a>
    </div>
    """
  end

  attr :title, :string, required: true, doc: "The mission title"
  attr :image_src, :string, required: true, doc: "The URL of the mission illustration image"
  slot :action, doc: "The URL of the mission"

  def mission_card(assigns) do
    ~H"""
    <div class="flex flex-col sm:flex-row lg:flex-col items-center gap-4 bg-base-100 p-6 rounded-2xl lg:grow lg:shrink">
      <div class="">
        <img
          alt={@title}
          src={@image_src}
          class="w-full max-w-[300px] min-w-[150px]"
        />
      </div>
      <div class="flex flex-col items-center sm:items-start lg:items-center gap-4 justify-space-between h-full">
        <div class="flex flex-col grow gap-4 items-center sm:items-start lg:items-center">
          <h3 class="text-primary font-bold text-xl text-center sm:text-start lg:text-center text-balance">
            {@title}
          </h3>
          {render_slot(@inner_block)}
        </div>
        {render_slot(@action)}
      </div>
    </div>
    """
  end

  attr :class, :string, default: "", doc: "The class of the call card"
  attr :rest, :global, doc: "the arbitrary HTML attributes to add to the flash container"
  slot :inner_block

  def call_card(assigns) do
    ~H"""
    <div
      class={[
        "flex flex-row p-4 bg-base-100 rounded-2xl justify-center items-center gap-4 lg:gap-8 lg:p-8",
        @class
      ]}
      {@rest}
    >
      {render_slot(@inner_block)}
    </div>
    """
  end

  attr :value, :string, required: true, doc: "The value of the stats card"
  attr :description, :string, required: true, doc: "The description of the stats card"

  def stats_card(assigns) do
    ~H"""
    <div class="flex flex-col items-center bg-base-100 rounded-2xl p-4">
      <span class="text-2xl font-bold text-primary">
        {@value}
      </span>
      <span class="text-sm text-gray-500">
        {@description}
      </span>
    </div>
    """
  end

  attr :href, :string
  attr :icon, :string
  attr :name, :string

  def social_card(assigns) do
    ~H"""
    <a class="flex flex-col items-center bg-base-100 p-4 rounded-lg gap-2" href={@href}>
      <.icon name={@icon} class="size-6 text-primary" /> {@name}
    </a>
    """
  end

  attr :title, :string, required: true, doc: "The title of the footer section"
  attr :description, :string, required: true, doc: "The description of the project card"
  attr :image_src, :string, required: true, doc: "The image source of the project card"

  def project_card(assigns) do
    ~H"""
    <div class="flex flex-col gap-4 p-8 bg-base-100 rounded-2xl shadow-md">
      <div class="flex flex-col items-center gap-2">
        <img alt={@title} src={@image_src} class="max-h-24" />
        <p class="font-bold text-lg">
          {@title}
        </p>
        <p class="text-center">
          {@description}
        </p>
      </div>
    </div>
    """
  end

  attr :title, :string, required: true, doc: "The title of the footer section"
  slot :inner_block

  def footer_section(assigns) do
    ~H"""
    <div class="flex flex-col gap-2 grow">
      <span class="font-bold text-lg">
        {@title}
      </span>
      <div class="flex flex-col">
        {render_slot(@inner_block)}
      </div>
    </div>
    """
  end

  attr :href, :string, required: true, doc: "The URL of the footer link"
  attr :class, :string, default: "", doc: "The class of the footer link"
  attr :external, :boolean, default: false, doc: "Whether the link is external"
  slot :inner_block

  def footer_link(assigns) do
    ~H"""
    <.link
      href={@href}
      class={[
        "px-4 py-2 rounded hover:underline hover:bg-black/20 flex flex-row items-center gap-1",
        @class
      ]}
    >
      {render_slot(@inner_block)}
      <%= if @external do %>
        <.icon name="hero-arrow-top-right-on-square" class="size-4 align-baseline mb-1" />
      <% end %>
    </.link>
    """
  end

  attr :url, :string, required: true, doc: "The URL of the project"
  slot :inner_block, doc: "The content inside the project link"

  def project_link(assigns) do
    ~H"""
    <a href={@url} class="min-w-[90px] min-h-[3rem] flex items-center justify-center">
      {render_slot(@inner_block)}
    </a>
    """
  end

  attr :locale_form, :map

  def landing_footer(assigns) do
    ~H"""
    <footer
      id="footer"
      class="flex flex-col items-center bg-primary text-white p-6"
    >
      <div class="flex flex-col items-center max-w-screen-xl">
        <p class="font-bold">
          {dgettext("landing", "Developed in Switzerland by the Graasp association")}
        </p>
        <div class="flex flex-col lg:flex-row gap-12 m-8 justify-space-between">
          <div class="flex flex-col sm:flex-row gap-8">
            <.footer_section title={dgettext("landing", "Content")}>
              <.footer_link href={~p"/"}>
                {dgettext("landing", "Home")}
              </.footer_link>

              <.footer_link href="/about-us">
                {dgettext("landing", "About Us")}
              </.footer_link>
              <.footer_link href="/support">
                {dgettext("landing", "Support")}
              </.footer_link>
              <.footer_link href={~p"/contact"}>
                {dgettext("landing", "Contact Us")}
              </.footer_link>
              <.footer_link href={~p"/blog"}>
                {dgettext("landing", "Blog")}
              </.footer_link>
            </.footer_section>
            <.footer_section title={dgettext("landing", "Partners")}>
              <.footer_link href="https://epfl.ch" external={true}>EPFL</.footer_link>
              <.footer_link href="https://edtech-collider.ch" external={true}>
                Swiss EdTech Collider
              </.footer_link>
              <.footer_link
                href="https://www.golabz.eu"
                external={true}
              >
                Go-Lab
              </.footer_link>
              <.footer_link
                href="https://d-skills.ch/"
                external={true}
              >
                Swiss Digital Skills Academy
              </.footer_link>
              <.footer_link
                href="https://www.ihub4schools.eu/"
                external={true}
              >
                iHub4Schools
              </.footer_link>
              <.footer_link
                href="https://belearn.swiss/en/"
                external={true}
              >
                BeLEARN
              </.footer_link>
              <.footer_link
                href="https://go-ga.org/"
                external={true}
              >
                GO-GA
              </.footer_link>
            </.footer_section>
          </div>
          <div class="flex flex-col sm:flex-row gap-8">
            <.footer_section title={dgettext("landing", "Social Media")}>
              <.footer_link href="https://www.facebook.com/graasp">
                <.icon name="facebook" class="size-5" /> Facebook
              </.footer_link>
              <.footer_link href="https://twitter.com/graasp">
                <.icon name="twitter" class="size-5" /> Twitter
              </.footer_link>
              <.footer_link href="https://www.instagram.com/graasper">
                <.icon name="instagram" class="size-5" /> Instagram
              </.footer_link>
              <.footer_link href="https://www.linkedin.com/company/graasp">
                <.icon name="linkedin" class="size-5" /> LinkedIn
              </.footer_link>
              <.footer_link href="https://github.com/graasp">
                <.icon name="github" class="size-5" /> Github
              </.footer_link>
              <.footer_link href="https://tooting.ch/@graasp">
                <.icon name="mastodon" class="size-5" /> Mastodon
              </.footer_link>
            </.footer_section>
            <.footer_section title={dgettext("landing", "Other")}>
              <.footer_link href="/terms">
                {dgettext("landing", "Terms of Use")}
              </.footer_link>
              <.footer_link href="/policy">
                {dgettext("landing", "Privacy Policy")}
              </.footer_link>
              <.footer_link href="/disclaimer">
                {dgettext("landing", "Disclaimer")}
              </.footer_link>
              <div class="text-primary">
                <.form
                  for={@locale_form}
                  action={~p"/locale"}
                  method="post"
                >
                  <.input
                    onchange="this.form.submit()"
                    type="select"
                    field={@locale_form[:locale]}
                    options={Languages.all_options()}
                  />
                </.form>
              </div>

              <div class="text-primary w-fit pt-8">
                <Layouts.theme_toggle />
              </div>
            </.footer_section>
          </div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="text-sm">
            © Graasp 2014 - 2026
          </p>
          <.link
            href="https://storyset.com/idea"
            class="text-[10px] text-secondary text-decoration-none"
          >
            {dgettext("landing", "Idea illustrations by Storyset")}
          </.link>
        </div>
      </div>
    </footer>
    """
  end

  def swiss_flag(assigns) do
    ~H"""
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 32 32"
    >
      <path d="m0 0h32v32h-32z" fill="#f00"></path>
      <path d="m13 6h6v7h7v6h-7v7h-6v-7h-7v-6h7z" fill="#fff"></path>
    </svg>
    """
  end

  def epfl_logo(assigns) do
    ~H"""
    <svg
      id="epfl_logo"
      viewBox="-20 -15 220 83"
      class={logo_classes()}
    >
      <g>
        <polygon fill="red" points="0,21.6 11.4,21.6 11.4,9.8 38.3,9.8 38.3,0 0,0"></polygon>
        <polygon fill="red" points="0,53 38.3,53 38.3,43.2 11.4,43.2 11.4,31.4 0,31.4"></polygon>
        <rect x="11.4" y="21.6" fill="red" width="24.6" height="9.8"></rect>
        <path
          fill="red"
          d="M86,4.9c-1.5-1.5-3.4-2.6-5.7-3.5C78,0.4,75.1,0,71.8,0H48.1v53h11.4V31.4h12.2c3.3,0,6.1-0.4,8.5-1.3
    c2.3-0.9,4.2-2.1,5.7-3.5c1.5-1.5,2.5-3.1,3.2-5s1-3.8,1-5.8s-0.3-4-1-5.8C88.5,8,87.4,6.3,86,4.9z M78,18.7
    c-0.6,0.8-1.3,1.4-2.3,1.8c-0.9,0.4-2,0.7-3.3,0.9c-1.2,0.1-2.5,0.2-3.9,0.2h-9.1V9.8h9.1c1.3,0,2.6,0.1,3.9,0.2
    c1.2,0.1,2.3,0.4,3.3,0.9c0.9,0.4,1.7,1,2.3,1.8c0.6,0.8,0.9,1.8,0.9,3S78.6,18,78,18.7z"
        >
        </path>
        <polygon
          fill="red"
          points="155.5,43.2 155.5,0 144,0 144,53 182.4,53 182.4,43.2"
        >
        </polygon>
        <polygon
          fill="red"
          points="97.4,21.6 108.9,21.6 108.9,9.8 135.8,9.8 135.8,0 97.4,0"
        >
        </polygon>
        <rect x="97.4" y="31.4" fill="red" width="11.4" height="21.6"></rect>
        <rect x="108.9" y="21.6" fill="red" width="24.6" height="9.8"></rect>
      </g>
    </svg>
    """
  end

  def collider_logo(assigns) do
    ~H"""
    <svg
      viewBox="-15 0 185 110.7"
      class={logo_classes()}
    >
      <style type="text/css">
        .stcollider {
          fill: #ec6675;
        }
      </style>
      <path
        class="stcollider"
        d="M31.5 83.3c0 7.7-2.2 19.5 6.8 23.1 5.2 1.9 11.1-.3 13.5-5.3 1-2.1 1-4.3 1-6.5V42.4 24.2c0-1-1.6-1-1.6 0v63.5c0 5 1 11.8-3 15.5-3.4 3.1-8.7 3.1-12.1 0-2.4-2.1-3-4.9-3-7.8v-12c0-1.1-1.6-1.1-1.6-.1zM31.5 24.1V34c0 1 1.6 1 1.6 0v-9.9c0-1-1.6-1-1.6 0zM31.5 53.7v9.9c0 1 1.6 1 1.6 0v-9.9c0-1-1.6-1-1.6 0z"
      >
      </path>
      <path
        class="stcollider"
        d="M52 25c6.8 0 13.5.3 20.3 0 5-.1 9.3-3.3 10.5-8.3C84 11.5 81.2 6 76.1 4.3c-2.7-.9-5.6-.6-8.3-.6H14.3C7 3.7 2.6 8.7 2.6 16v48.8c0 6.7-1.2 14.9 6.1 18.5 3.4 1.5 8.1.9 11.8.9h11.8c1 0 1-1.6 0-1.6-6.2 0-12.4.1-18.6 0-5.3-.1-9.3-3.7-9.5-9.2v-5-46.3c0-5.9-1-13.6 5.9-16.1 2.5-.9 5.6-.6 8.3-.6H66.8c3 0 6.7-.4 9.5.9 8.9 4.1 5.3 16.9-4 17.3-6.8.3-13.5 0-20.3 0-1-.2-1 1.4 0 1.4z"
      >
      </path>
      <path
        class="stcollider"
        d="M32.3 23.4h-9.2c-.4 0-.9.4-.9.9v9.9c0 .4.4.9.9.9h9.2c1 0 1-1.6 0-1.6h-9.2l.9.9v-9.9l-.9.9h9.2c1.1-.4 1.1-2 0-2zM32.3 53h-9.2c-.4 0-.9.4-.9.9v9.9c0 .4.4.9.9.9h9.2c1 0 1-1.6 0-1.6h-9.2l.9.9v-9.9l-.9.9h9.2c1.1-.4 1.1-2 0-2z"
      >
      </path>
      <path
        class="stcollider"
        d="M32.3 54.6c6.1 0 11.2-4.4 11.4-10.7 0-6.4-5.3-10.7-11.4-10.7-1 0-1 1.6 0 1.6 5.2 0 9.8 3.6 9.8 9s-4.6 9-9.8 9c-1 .2-1 1.8 0 1.8z"
      >
      </path>
      <path
        class="stcollider"
        d="M32.3 34.8c1 0 1-1.6 0-1.6-1-.1-1 1.6 0 1.6zM32.3 54.6c1 0 1-1.6 0-1.6s-1 1.6 0 1.6zM32.3 64.4c1 0 1-1.6 0-1.6-1-.1-1 1.6 0 1.6zM32.3 84.2c1 0 1-1.6 0-1.6s-1 1.6 0 1.6z"
      >
      </path>
      <path
        class="stcollider"
        d="M33.1 83.3V63.6c0-1-1.6-1-1.6 0v19.7c0 1.1 1.6 1.1 1.6 0V63.6c0-1-1.6-1-1.6 0v19.7c0 1.1 1.6 1.1 1.6 0zM32.3 25H52c1 0 1-1.6 0-1.6H32.3c-1 0-1 1.6 0 1.6z"
      >
      </path>
      <g>
        <path
          class="stcollider"
          d="M60 37c.7.6 1.5 1.2 2.8 1.2s2.1-.7 2.1-1.8-1.2-1.6-2.1-1.9C61.5 34 60 33.4 60 32c0-1.3 1-2.4 2.8-2.4.9 0 1.9.4 2.5.9l-.4.6c-.6-.4-1.2-.7-2.1-.7-1.3 0-1.9.7-1.9 1.6 0 1 1 1.3 2.1 1.8 1.3.4 2.8 1 2.8 2.7 0 1.3-1 2.5-3 2.5-1.3 0-2.4-.6-3.3-1.2l.5-.8zM66.8 29.7h.9l1.6 5.8c.1.7.4 1.6.6 2.4.1-.7.4-1.5.6-2.4l1.6-5.8h1l1.6 5.8c.1.7.4 1.6.6 2.4.1-.7.4-1.5.6-2.4l1.6-5.8h.9L76 38.5h-1L73.5 33c-.3-.9-.4-1.6-.7-2.5-.1.9-.4 1.8-.7 2.5l-1.5 5.5h-1l-2.8-8.8zM80.3 26.9c0-.4.3-.7.7-.7.4 0 .7.3.7.7s-.3.7-.7.7c-.3.1-.7-.2-.7-.7zm.4 2.8h.7v8.7h-.7v-8.7zM84.3 37c.7.6 1.5 1.2 2.8 1.2 1.3 0 2.1-.7 2.1-1.8s-1.2-1.6-2.1-1.9c-1.5-.4-3-1-3-2.5 0-1.3 1-2.4 2.8-2.4.9 0 1.9.4 2.5.9l-.4.6c-.6-.4-1.2-.7-2.1-.7-1.3 0-1.9.7-1.9 1.6 0 1 1 1.3 2.1 1.8 1.3.4 2.8 1 2.8 2.7 0 1.3-1 2.5-3 2.5-1.3 0-2.4-.6-3.3-1.2l.7-.8zM91.7 37c.7.6 1.5 1.2 2.8 1.2s2.1-.7 2.1-1.8-1.2-1.6-2.1-1.9c-1.3-.4-2.8-1-2.8-2.5 0-1.3 1-2.4 2.8-2.4.9 0 1.9.4 2.5.9l-.4.6c-.6-.4-1.2-.7-2.1-.7-1.3 0-1.9.7-1.9 1.6 0 1 1 1.3 2.1 1.8 1.3.4 2.8 1 2.8 2.7 0 1.3-1 2.5-3 2.5-1.3 0-2.4-.6-3.3-1.2l.5-.8z"
        >
        </path>
      </g>
      <g>
        <path
          class="stcollider"
          d="M59.7 42.8h11.8V45h-9.2v6.5h7.8v2.2h-7.8v7.5H72v2.2H59.9V42.8h-.2zM81.6 47.8c1.8 0 3 .6 4.3 1.8l-.1-2.7V41h2.7v22.5h-2.1l-.1-1.8h-.1c-1.2 1.2-2.8 2.2-4.6 2.2-3.8 0-6.4-3-6.4-8-.2-5 2.9-8.1 6.4-8.1zm.2 13.9c1.5 0 2.7-.7 3.8-2.1v-8c-1.3-1.2-2.5-1.6-3.7-1.6-2.5 0-4.4 2.4-4.4 5.9.1 3.6 1.6 5.8 4.3 5.8zM97.9 45h-6.2v-2.2h15.1V45h-6.2v18.5h-2.7V45zM113.9 47.8c3.8 0 6.1 2.8 6.1 7.1 0 .6 0 1-.1 1.5h-10.4c.1 3.3 2.2 5.3 5 5.3 1.5 0 2.7-.4 3.8-1.2l.9 1.6c-1.3.9-3 1.6-5 1.6-4.1 0-7.4-3-7.4-8 .1-4.9 3.5-7.9 7.1-7.9zm3.8 6.8c0-3.1-1.3-4.9-3.7-4.9-2.1 0-4.1 1.8-4.4 4.9h8.1zM129.9 47.8c2.1 0 3.4.9 4.4 1.8l-1.3 1.6c-.9-.7-1.9-1.3-3.1-1.3-2.8 0-4.7 2.4-4.7 5.9 0 3.6 1.9 5.9 4.7 5.9 1.5 0 2.7-.7 3.6-1.5l1.2 1.6c-1.3 1.2-3.1 1.9-5 1.9-4 0-7.1-3-7.1-8 0-4.9 3.4-7.9 7.3-7.9zM138 41h2.5v6.2l-.1 3.1c1.5-1.3 3-2.5 5-2.5 3.3 0 4.6 2.1 4.6 5.9v9.8h-2.2v-9.3c0-2.8-.9-4.1-3-4.1-1.6 0-2.7.9-4.1 2.4v11.1h-2.5V41h-.2z"
        >
        </path>
      </g>
      <g>
        <path
          class="stcollider"
          d="M65.9 68.4c1.6 0 3 .9 3.7 1.8l-.6.6c-.7-.9-1.8-1.5-3.1-1.5-3.1 0-5.2 2.5-5.2 6.5s1.9 6.7 5 6.7c1.5 0 2.7-.6 3.7-1.8l.6.6c-1 1.3-2.4 2.1-4.3 2.1-3.6 0-6.1-3-6.1-7.5.1-4.7 2.6-7.5 6.3-7.5zM72.5 75.8c0-4.6 2.5-7.4 5.9-7.4s5.9 2.8 5.9 7.4-2.5 7.5-5.9 7.5c-3.4 0-5.9-2.9-5.9-7.5zm10.9 0c0-4-1.9-6.5-4.9-6.5s-4.9 2.5-4.9 6.5 1.9 6.7 4.9 6.7 4.9-2.7 4.9-6.7zM88.6 68.5h1v13.6h6.7v.9h-7.7V68.5zM99.8 68.5h1v13.6h6.7v.9h-7.7V68.5zM110.9 68.5h1V83h-1V68.5zM117 68.5h3.4c4.4 0 6.7 2.8 6.7 7.3 0 4.4-2.1 7.3-6.5 7.3h-3.4V68.5h-.2zm3.3 13.8c4 0 5.6-2.7 5.6-6.5 0-3.7-1.8-6.4-5.6-6.4H118v12.7h2.2v.2zM131.2 68.5h8v.9h-7v5.5h5.8v.9h-5.8v6.4h7.1v.8h-8.1V68.5zM151.3 83l-3.8-6.7h-3.1V83h-1V68.5h4.1c2.8 0 4.7 1 4.7 3.8 0 2.4-1.5 3.7-3.7 4l4 6.8h-1.2V83zm-4.1-7.4c2.5 0 4-1 4-3.1 0-2.2-1.5-3-4-3h-2.8v6.1h2.8z"
        >
        </path>
      </g>
    </svg>
    """
  end

  def unine_logo(assigns) do
    ~H"""
    <svg
      viewBox="0 0 1203.2533 514.58667"
      class={logo_classes()}
    >
      <style type="text/css">
        .stunine {
        fill: var(--color-base-content);
        fill-opacity:1;
        fill-rule:nonzero;
        stroke:none;
        }
      </style>
      <g id="g8" transform="matrix(1.3333333,0,0,-1.3333333,0,514.58667)">
        <g
          id="g10"
          transform="scale(0.1)"
        >
          <path
            class="stunine"
            d="m 1000.41,840.102 c -26.465,15.199 -47.187,36.14 -62.187,62.808 -15,26.66 -22.5,56.461 -22.5,89.379 v 268.121 h 92.497 V 992.289 c 0,-24.168 7.71,-44.379 23.13,-60.629 15.41,-16.25 34.78,-24.371 58.12,-24.371 22.91,0 42.08,8.012 57.5,24.063 15.41,16.027 23.13,36.347 23.13,60.937 v 268.121 h 92.5 V 992.289 c 0,-32.918 -7.5,-62.719 -22.5,-89.379 -15,-26.668 -35.73,-47.609 -62.19,-62.808 -26.46,-15.223 -55.94,-22.813 -88.44,-22.813 -32.92,0 -62.6,7.59 -89.06,22.813"
            id="path12"
          >
          </path>
          <path
            d="m 1417.59,1089.79 c 10,15 21.98,26.45 35.94,34.37 13.96,7.91 29.69,11.88 47.19,11.88 39.16,0 70,-12.41 92.5,-37.19 22.5,-24.8 33.75,-58.86 33.75,-102.19 V 822.91 h -88.13 v 162.5 c 0,20 -5.52,36.04 -16.56,48.13 -11.04,12.08 -25.73,18.12 -44.06,18.12 -18.34,0 -33.03,-6.04 -44.06,-18.12 -11.05,-12.09 -16.57,-28.13 -16.57,-48.13 v -162.5 h -88.12 v 306.88 h 88.12 v -40"
            class="stunine"
            id="path14"
          >
          </path>
          <path
            d="M 1779.47,1129.79 V 822.91 h -88.13 v 306.88 z m -82.19,57.5 c -10.62,10.41 -15.94,22.91 -15.94,37.5 0,14.58 5.32,27.18 15.94,37.81 10.63,10.62 23.22,15.94 37.81,15.94 15,0 27.71,-5.32 38.13,-15.94 10.41,-10.63 15.62,-23.23 15.62,-37.81 0,-14.59 -5.21,-27.09 -15.62,-37.5 -10.42,-10.42 -23.13,-15.63 -38.13,-15.63 -14.59,0 -27.18,5.21 -37.81,15.63"
            class="stunine"
            id="path16"
          >
          </path>
          <path
            d="m 2020.09,822.91 h -75 l -127.5,306.88 h 95.63 l 69.37,-186.88 68.13,186.88 h 96.25 L 2020.09,822.91"
            class="stunine"
            id="path18"
          >
          </path>
          <path
            d="m 2373.22,1012.29 c -1.67,15 -8.44,27.28 -20.31,36.87 -11.88,9.58 -25.94,14.38 -42.19,14.38 -17.5,0 -32.3,-4.28 -44.38,-12.82 -12.09,-8.54 -20.62,-21.35 -25.62,-38.43 z M 2234.47,837.91 c -24.59,14.16 -43.97,33.641 -58.13,58.442 -14.17,24.777 -21.25,51.968 -21.25,81.558 0,29.16 6.98,55.83 20.94,80 13.96,24.16 33.13,43.22 57.5,57.19 24.38,13.95 51.35,20.94 80.94,20.94 27.5,0 52.81,-6.57 75.94,-19.69 23.12,-13.13 41.45,-31.15 55,-54.06 13.53,-22.92 20.31,-48.34 20.31,-76.251 0,-1.668 -0.63,-12.5 -1.88,-32.5 h -226.87 c 3.33,-19.59 11.97,-35 25.94,-46.25 13.95,-11.25 31.14,-16.879 51.56,-16.879 16.25,0 29.69,3.219 40.31,9.692 10.63,6.449 17.39,15.097 20.31,25.937 h 86.25 c -5,-33.34 -20.84,-59.91 -47.5,-79.687 -26.67,-19.801 -59.37,-29.692 -98.12,-29.692 -29.59,0 -56.67,7.082 -81.25,21.25"
            class="stunine"
            id="path20"
          >
          </path>
          <path
            d="m 2517.59,1129.79 h 88.12 v -35 c 19.16,27.5 45.63,41.25 79.38,41.25 6.25,0 16.03,-1.25 29.37,-3.75 v -80 c -12.5,2.91 -23.12,4.37 -31.87,4.37 -22.5,0 -40.94,-6.98 -55.31,-20.94 -14.38,-13.96 -21.57,-34.48 -21.57,-61.56 V 822.91 h -88.12 v 306.88"
            class="stunine"
            id="path22"
          >
          </path>
          <path
            d="m 2776.02,846.039 c -25.62,19.582 -39.9,46.453 -42.81,80.621 h 84.37 c 0.83,-10.418 6.25,-18.75 16.25,-25 10,-6.25 22.29,-9.371 36.88,-9.371 12.91,0 23.02,2.082 30.31,6.25 7.29,4.16 10.94,9.781 10.94,16.871 0,8.75 -4.8,15.102 -14.38,19.059 -9.59,3.961 -25,8.023 -46.25,12.191 -22.92,4.16 -41.87,8.75 -56.87,13.75 -15,5 -27.92,13.442 -38.75,25.309 -10.84,11.883 -16.25,28.441 -16.25,49.691 0,19.16 4.89,36.35 14.69,51.56 9.78,15.21 23.95,27.19 42.5,35.94 18.53,8.75 40.09,13.13 64.68,13.13 35,0 65,-8.97 90,-26.88 25,-17.92 39.38,-43.12 43.13,-75.62 h -88.75 c -0.84,8.33 -5.42,15.31 -13.75,20.93 -8.34,5.63 -19.17,8.44 -32.5,8.44 -10.42,0 -18.86,-1.78 -25.31,-5.31 -6.47,-3.55 -9.69,-8.86 -9.69,-15.94 0,-7.92 4.37,-13.54 13.12,-16.87 8.75,-3.34 22.91,-6.67 42.5,-10 23.33,-3.75 42.91,-8.24 58.75,-13.44 15.83,-5.221 29.58,-14.588 41.25,-28.131 11.66,-13.539 17.5,-32.598 17.5,-57.18 0,-18.34 -5.42,-35.109 -16.25,-50.32 -10.84,-15.207 -25.52,-27.18 -44.06,-35.93 -18.54,-8.75 -39.28,-13.129 -62.19,-13.129 -40.42,0 -73.43,9.789 -99.06,29.379"
            class="stunine"
            id="path24"
          >
          </path>
          <path
            d="M 3134.45,1129.79 V 822.91 h -88.12 v 306.88 z m -82.18,57.5 c -10.63,10.41 -15.94,22.91 -15.94,37.5 0,14.58 5.31,27.18 15.94,37.81 10.62,10.62 23.22,15.94 37.81,15.94 15,0 27.7,-5.32 38.12,-15.94 10.41,-10.63 15.63,-23.23 15.63,-37.81 0,-14.59 -5.22,-27.09 -15.63,-37.5 -10.42,-10.42 -23.12,-15.63 -38.12,-15.63 -14.59,0 -27.19,5.21 -37.81,15.63"
            class="stunine"
            id="path26"
          >
          </path>
          <path
            d="m 3263.83,852.289 c -22.09,22.91 -33.13,54.781 -33.13,95.621 v 98.13 h -56.87 v 83.75 h 56.87 v 80.62 h 88.13 v -80.62 h 75.62 v -83.75 h -75.62 v -96.88 c 0,-15.84 4.78,-27.711 14.37,-35.621 9.58,-7.918 22.5,-11.879 38.75,-11.879 8.75,0 16.25,0.832 22.5,2.5 v -81.25 c -12.5,-3.328 -26.67,-5 -42.5,-5 -36.67,0 -66.04,11.461 -88.12,34.379"
            class="stunine"
            id="path28"
          >
          </path>
          <path
            d="m 3612.57,1163.54 h -81.25 l 53.75,97.5 h 103.75 z m 25.63,-151.25 c -1.67,15 -8.44,27.28 -20.31,36.87 -11.88,9.58 -25.94,14.38 -42.19,14.38 -17.5,0 -32.3,-4.28 -44.38,-12.82 -12.09,-8.54 -20.62,-21.35 -25.62,-38.43 z M 3499.45,837.91 c -24.59,14.16 -43.97,33.641 -58.13,58.442 -14.17,24.777 -21.25,51.968 -21.25,81.558 0,29.16 6.98,55.83 20.94,80 13.96,24.16 33.13,43.22 57.5,57.19 24.38,13.95 51.35,20.94 80.94,20.94 27.5,0 52.81,-6.57 75.94,-19.69 23.12,-13.13 41.45,-31.15 55,-54.06 13.53,-22.92 20.31,-48.34 20.31,-76.251 0,-1.668 -0.63,-12.5 -1.88,-32.5 h -226.87 c 3.33,-19.59 11.97,-35 25.94,-46.25 13.95,-11.25 31.14,-16.879 51.56,-16.879 16.25,0 29.69,3.219 40.31,9.692 10.63,6.449 17.39,15.097 20.31,25.937 h 86.25 c -5,-33.34 -20.84,-59.91 -47.5,-79.687 -26.67,-19.801 -59.37,-29.692 -98.12,-29.692 -29.59,0 -56.67,7.082 -81.25,21.25"
            class="stunine"
            id="path30"
          >
          </path>
          <path
            d="m 4117.25,922.602 c 14.79,14.367 22.19,32.39 22.19,54.058 0,21.25 -7.4,39.16 -22.19,53.75 -14.79,14.58 -33.03,21.88 -54.69,21.88 -21.25,0 -39.37,-7.41 -54.37,-22.19 -15,-14.8 -22.5,-32.608 -22.5,-53.44 0,-21.25 7.5,-39.168 22.5,-53.75 15,-14.59 33.12,-21.871 54.37,-21.871 21.66,0 39.9,7.18 54.69,21.563 z M 3918.5,1056.66 c 12.71,24.58 30,43.96 51.88,58.13 21.87,14.16 45.93,21.25 72.18,21.25 42.5,0 74.79,-16.67 96.88,-50 v 174.37 h 88.12 v -437.5 h -88.12 v 43.75 c -22.09,-33.34 -54.38,-50 -96.88,-50 -26.25,0 -50.31,7.192 -72.18,21.559 -21.88,14.383 -39.17,33.75 -51.88,58.133 -12.71,24.367 -19.06,51.14 -19.06,80.308 0,28.75 6.35,55.41 19.06,80"
            class="stunine"
            id="path32"
          >
          </path>
          <path
            d="m 4493.81,1012.29 c -1.67,15 -8.43,27.28 -20.31,36.87 -11.87,9.58 -25.94,14.38 -42.19,14.38 -17.5,0 -32.29,-4.28 -44.37,-12.82 -12.09,-8.54 -20.63,-21.35 -25.63,-38.43 z M 4355.06,837.91 c -24.59,14.16 -43.96,33.641 -58.12,58.442 -14.17,24.777 -21.25,51.968 -21.25,81.558 0,29.16 6.97,55.83 20.94,80 13.95,24.16 33.12,43.22 57.5,57.19 24.37,13.95 51.34,20.94 80.93,20.94 27.5,0 52.82,-6.57 75.94,-19.69 23.12,-13.13 41.46,-31.15 55,-54.06 13.53,-22.92 20.31,-48.34 20.31,-76.251 0,-1.668 -0.63,-12.5 -1.88,-32.5 h -226.87 c 3.33,-19.59 11.98,-35 25.94,-46.25 13.96,-11.25 31.14,-16.879 51.56,-16.879 16.25,0 29.69,3.219 40.32,9.692 10.62,6.449 17.39,15.097 20.31,25.937 h 86.24 c -5,-33.34 -20.84,-59.91 -47.5,-79.687 -26.66,-19.801 -59.37,-29.692 -98.12,-29.692 -29.59,0 -56.67,7.082 -81.25,21.25"
            class="stunine"
            id="path34"
          >
          </path>
          <path
            d="m 4848.18,1260.41 178.13,-255 v 255 h 92.5 v -437.5 h -77.5 l -179.38,255 v -255 h -92.5 v 437.5 h 78.75"
            class="stunine"
            id="path36"
          >
          </path>
          <path
            d="m 5390.67,1012.29 c -1.67,15 -8.43,27.28 -20.31,36.87 -11.87,9.58 -25.94,14.38 -42.19,14.38 -17.5,0 -32.29,-4.28 -44.37,-12.82 -12.09,-8.54 -20.63,-21.35 -25.63,-38.43 z M 5251.92,837.91 c -24.59,14.16 -43.96,33.641 -58.12,58.442 -14.17,24.777 -21.25,51.968 -21.25,81.558 0,29.16 6.97,55.83 20.94,80 13.95,24.16 33.12,43.22 57.5,57.19 24.37,13.95 51.34,20.94 80.93,20.94 27.5,0 52.82,-6.57 75.94,-19.69 23.13,-13.13 41.46,-31.15 55,-54.06 13.54,-22.92 20.31,-48.34 20.31,-76.251 0,-1.668 -0.62,-12.5 -1.87,-32.5 h -226.88 c 3.33,-19.59 11.98,-35 25.94,-46.25 13.96,-11.25 31.14,-16.879 51.56,-16.879 16.25,0 29.69,3.219 40.32,9.692 10.62,6.449 17.39,15.097 20.31,25.937 h 86.25 c -5,-33.34 -20.84,-59.91 -47.5,-79.687 -26.67,-19.801 -59.38,-29.692 -98.13,-29.692 -29.59,0 -56.67,7.082 -81.25,21.25"
            class="stunine"
            id="path38"
          >
          </path>
          <path
            d="m 5743.8,862.91 c -10,-15 -21.98,-26.461 -35.94,-34.371 -13.96,-7.918 -29.69,-11.879 -47.19,-11.879 -39.17,0 -70,12.391 -92.5,37.192 -22.5,24.777 -33.75,58.847 -33.75,102.187 v 173.751 h 88.13 V 967.289 c 0,-20 5.52,-36.047 16.56,-48.129 11.04,-12.09 25.72,-18.121 44.06,-18.121 18.33,0 33.02,6.031 44.07,18.121 11.03,12.082 16.56,28.129 16.56,48.129 v 162.501 h 88.12 V 822.91 h -88.12 v 40"
            class="stunine"
            id="path40"
          >
          </path>
          <path
            d="m 5961.91,837.602 c -24.17,13.949 -43.23,33.019 -57.18,57.187 -13.97,24.16 -20.94,51.25 -20.94,81.25 0,30.001 6.97,57.181 20.94,81.561 13.95,24.37 33.01,43.53 57.18,57.5 24.16,13.95 51.25,20.94 81.25,20.94 25.41,0 49.07,-5.32 70.94,-15.94 21.88,-10.63 39.89,-25.31 54.06,-44.06 14.16,-18.75 22.5,-39.8 25,-63.13 h -89.37 c -3.34,11.25 -10.63,20.52 -21.88,27.81 -11.25,7.29 -24.17,10.94 -38.75,10.94 -20.84,0 -38.23,-7.19 -52.18,-21.56 -13.97,-14.38 -20.94,-32.401 -20.94,-54.061 0,-21.25 6.97,-39.07 20.94,-53.437 13.95,-14.383 31.34,-21.563 52.18,-21.563 14.58,0 27.6,3.84 39.07,11.563 11.45,7.699 18.84,17.597 22.18,29.687 h 89.38 c -2.09,-23.75 -10.22,-45.219 -24.38,-64.379 -14.17,-19.168 -32.29,-34.168 -54.37,-45 -22.09,-10.828 -46.05,-16.25 -71.88,-16.25 -30,0 -57.09,6.969 -81.25,20.942"
            class="stunine"
            id="path42"
          >
          </path>
          <path
            d="m 6330.66,1260.41 v -170.62 c 10,15 21.98,26.45 35.94,34.37 13.96,7.91 29.69,11.88 47.19,11.88 39.16,0 70,-12.41 92.5,-37.19 22.5,-24.8 33.75,-58.86 33.75,-102.19 V 822.91 h -88.13 v 162.5 c 0,20 -5.52,36.04 -16.56,48.13 -11.04,12.08 -25.73,18.12 -44.06,18.12 -18.34,0 -33.03,-6.04 -44.06,-18.12 -11.05,-12.09 -16.57,-28.13 -16.57,-48.13 v -162.5 h -88.12 v 437.5 h 88.12"
            class="stunine"
            id="path44"
          >
          </path>
          <path
            d="m 6699.4,922.91 c 15,-14.59 33.13,-21.871 54.38,-21.871 21.66,0 39.89,7.18 54.69,21.563 14.78,14.367 22.18,32.39 22.18,54.058 0,21.25 -7.4,39.16 -22.18,53.75 -14.8,14.58 -33.03,21.88 -54.69,21.88 -21.25,0 -39.38,-7.41 -54.38,-22.19 -15,-14.8 -22.5,-32.608 -22.5,-53.44 0,-21.25 7.5,-39.168 22.5,-53.75 z m 189.38,242.5 h -78.13 l -31.25,43.13 -30.62,-43.13 h -78.13 l 60.63,97.5 h 96.25 z m 30,-342.5 h -88.13 v 43.75 c -22.09,-33.34 -54.37,-50 -96.87,-50 -26.25,0 -50.31,7.192 -72.19,21.559 -21.87,14.383 -39.17,33.75 -51.87,58.133 -12.72,24.367 -19.07,51.14 -19.07,80.308 0,28.75 6.35,55.41 19.07,80 12.7,24.58 30,43.96 51.87,58.13 21.88,14.16 45.94,21.25 72.19,21.25 42.5,0 74.78,-16.67 96.87,-50 v 43.75 h 88.13 V 822.91"
            class="stunine"
            id="path46"
          >
          </path>
          <path
            d="m 7048.15,852.289 c -22.09,22.91 -33.12,54.781 -33.12,95.621 v 98.13 h -56.88 v 83.75 h 56.88 v 80.62 h 88.12 v -80.62 h 75.63 v -83.75 h -75.63 v -96.88 c 0,-15.84 4.79,-27.711 14.38,-35.621 9.58,-7.918 22.5,-11.879 38.75,-11.879 8.75,0 16.25,0.832 22.5,2.5 v -81.25 c -12.5,-3.328 -26.67,-5 -42.5,-5 -36.67,0 -66.05,11.461 -88.13,34.379"
            class="stunine"
            id="path48"
          >
          </path>
          <path
            d="m 7422.53,1012.29 c -1.67,15 -8.44,27.28 -20.31,36.87 -11.88,9.58 -25.94,14.38 -42.19,14.38 -17.5,0 -32.3,-4.28 -44.38,-12.82 -12.09,-8.54 -20.62,-21.35 -25.62,-38.43 z M 7283.78,837.91 c -24.59,14.16 -43.97,33.641 -58.13,58.442 -14.17,24.777 -21.25,51.968 -21.25,81.558 0,29.16 6.98,55.83 20.94,80 13.96,24.16 33.13,43.22 57.5,57.19 24.38,13.95 51.35,20.94 80.94,20.94 27.5,0 52.81,-6.57 75.94,-19.69 23.12,-13.13 41.45,-31.15 55,-54.06 13.53,-22.92 20.31,-48.34 20.31,-76.251 0,-1.668 -0.63,-12.5 -1.88,-32.5 h -226.87 c 3.33,-19.59 11.97,-35 25.94,-46.25 13.95,-11.25 31.14,-16.879 51.56,-16.879 16.25,0 29.69,3.219 40.31,9.692 10.63,6.449 17.39,15.097 20.31,25.937 h 86.25 c -5,-33.34 -20.84,-59.91 -47.5,-79.687 -26.67,-19.801 -59.37,-29.692 -98.12,-29.692 -29.59,0 -56.67,7.082 -81.25,21.25"
            class="stunine"
            id="path50"
          >
          </path>
          <path
            d="m 7650.64,822.91 h -88.12 v 437.5 h 88.12 v -437.5"
            class="stunine"
            id="path52"
          >
          </path>
          <path
            d="m 8352.69,2805.59 c 0,143.75 -116.32,260.07 -260.07,260.07 -143.75,0 -260.07,-116.32 -260.07,-260.07 0,-143.75 116.32,-260.07 260.07,-260.07 143.75,0 260.07,116.32 260.07,260.07"
            id="path54"
            style="fill: rgb(37, 74, 165); fill-opacity: 1; fill-rule: nonzero; stroke: none;"
          >
          </path>
          <path
            d="M 2253.64,3036.45 V 1560.66 h -423.81 v 195.37 c -90.17,-144.29 -228.43,-225.44 -399.75,-225.44 -378.71,0 -607.146,255.49 -607.146,673.27 v 832.59 h 423.796 v -778.49 c 0,-195.38 114.22,-321.59 291.54,-321.59 174.34,0 291.56,126.21 291.56,321.59 v 778.49 h 423.81"
            class="stunine"
            id="path56"
          >
          </path>
          <path
            d="M 3876.71,2396.23 V 1560.66 H 3452.9 v 781.47 c 0,192.37 -117.22,318.61 -291.54,318.61 -177.34,0 -291.56,-126.24 -291.56,-318.61 V 1560.66 H 2446 v 1475.79 h 423.8 v -192.37 c 93.18,141.27 231.44,222.42 399.76,222.42 378.73,0 607.15,-252.49 607.15,-670.27"
            class="stunine"
            id="path58"
          >
          </path>
          <path
            d="m 4492.87,1560.66 h -423.81 v 1475.79 h 423.81 V 1560.66"
            class="stunine"
            id="path60"
          >
          </path>
          <path
            d="m 6118.95,2396.23 v -835.57 h -423.81 v 781.47 c 0,192.37 -117.22,318.61 -291.55,318.61 -177.35,0 -291.55,-126.24 -291.55,-318.61 v -781.47 h -423.8 v 1475.79 h 423.8 v -192.37 c 93.18,141.27 231.44,222.42 399.76,222.42 378.71,0 607.15,-252.49 607.15,-670.27"
            class="stunine"
            id="path62"
          >
          </path>
          <path
            d="m 7300.18,2468.37 c -12.02,150.27 -147.27,255.49 -303.58,255.49 -162.3,0 -288.54,-81.17 -339.64,-255.49 z m 432.83,-270.51 h -1097.1 c 30.07,-192.37 177.34,-315.59 375.73,-315.59 165.3,0 270.49,72.12 294.54,174.3 h 414.78 c -48.07,-318.57 -327.61,-525.98 -697.31,-525.98 -435.81,0 -775.47,339.63 -775.47,775.48 0,429.81 336.64,760.43 766.46,760.43 399.76,0 727.37,-312.59 727.37,-718.35 0,-33.05 -3,-102.22 -9,-150.29"
            class="stunine"
            id="path64"
          >
          </path>
        </g>
      </g>
    </svg>
    """
  end

  def golabz_logo(assigns) do
    ~H"""
    <svg
      viewBox="-40 -20 560 130"
      class={logo_classes()}
    >
      <path
        d="M 250,72.5 C 237.5,62.5 240,45 240,41.9225 V 0 h 20 V 30.5655 C 260,57.5 260,55 265,60 c 7.5,5 7.5,4.88 40,5 0,7.5 0,7.5 0,15 -22.5,0 -42.5,2.5 -55,-7.5 z M 340,0 h 20 l 35,80 H 373.50611 L 365,62.5 H 337.5 L 329.96039,80 H 307.5 Z m 57.5,0 H 445 c 0,0 25,0 25,20 0,17.5 -11,20 -11,20 0,0 11,2.5 11,17 0,25.5 -24.97873,23.045721 -24.97873,23.045721 L 397.5,80 Z m 40,35 c 0,0 12.5,0 12.5,-10 0,-7.5 -12.5,-7.5 -12.5,-7.5 h -20 V 35 Z M 351.04572,22.350611 342,47 h 18 z M 437.5,65 c 0,0 12.5,0 12.5,-8.69511 C 450,47.5 437.5,47.5 437.5,47.5 h -20 V 65 Z"
        id="path2"
        fill="rgb(48, 180, 255)"
      >
      </path>
      <path
        d="M 40,80 C 12.5,78.5 0,61 0.19,42 0,16 17.544757,0.25 38.944757,0 H 82.5 V 17.5 L 44,17.5 C 17.26,17.63 15,53.5 28.33,60.79 40,68.5 62.5,66 62.5,66 V 47.5 h -25 v -15 h 45 V 80 Z M 133.94476,0 C 160,0 175,12.5 175,38.5 175,73.5 156.84053,81.286526 135,81 110,80 95,67.5 95,42.5 95,12.5 107.5,0 133.94476,0 Z M 112.5,40 c 0,12.5 2.5,25 22.5,25 17.5,0 20,-14 20,-24 C 154.81,25.79 150,16 132,16.04 117.5,16 112.5,27.5 112.5,40 Z M 229,35 V 51 L 187.5,50.98 V 35 Z"
        id="path4"
        fill="var(--color-base-content)"
      >
      </path>
    </svg>
    """
  end

  def belearn_logo(assigns) do
    ~H"""
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 245.04371 85.475301"
      class={[logo_classes(), "max-w-[110px]"]}
      fill="var(--color-base-content)"
    >
      <path d="m 65.561683,46.821356 c 0,3.76 -2.2,6.49 -7.26,6.49 h -20.39 v -22.28 h 19.65 c 5.06,0 6.62,2.58 6.62,5.86 -0.03,1.61 -0.65,3.15 -1.75,4.33 1.99,1.15 3.19,3.3 3.13,5.6 z m -21.9,-7 h 11.82 c 1.53,0 2.93,0 2.93,-2.33 0,-2.33 -1.4,-2.29 -3,-2.29 h -11.77 z m 16.17,6.74 c 0,-2.35 -1.4,-2.35 -2.93,-2.35 h -13.26 v 4.68 h 13.24 c 1.53,0 2.93,0 2.93,-2.36 z" />
      <path d="m 87.561683,46.601356 h 5.41 c -1.24,4.77 -5.89,7 -12.83,7 -6.94,0 -12.66,-2.8 -12.66,-9.67 0,-6.87 5.38,-9.71 13,-9.71 7.13,0 12.83,2.45 12.83,11 h -20.31 c 0.6,3 3.47,4 7.09,4 3.62,0 6.05,-0.71 7.47,-2.62 z m -14.37,-4.84 h 14.22 c -0.92,-2.64 -3.59,-3.37 -7,-3.37 -3.75,0 -6.36,0.73 -7.22,3.37 z" />
      <path d="m 119.56168,48.511356 v 4.8 H 96.561683 v -22.28 h 5.729997 v 17.48 z" />
      <path d="m 128.11168,35.591356 v 4.52 h 17.83 v 4.13 h -17.83 v 4.52 h 17.83 v 4.55 h -23.56 v -22.28 h 23.56 v 4.56 z" />
      <path d="m 170.67168,48.571356 h -13.33 l -2.39,4.74 h -6.3 l 11.49,-22.28 h 7.73 l 11.53,22.28 h -6.34 z m -2.11,-4.26 -4.52,-9 -4.55,9 z" />
      <path d="m 203.49168,46.691356 4.07,6.62 h -6.75 l -3.6,-6 h -9.23 v 6 h -5.73 v -22.28 h 17.51 c 5.06,0 8.53,3.22 8.53,8.18 0.18,3.27 -1.75,6.28 -4.8,7.48 z m -15.47,-4.13 h 10.19 c 1.72,0 4.39,0 4.39,-3.35 0,-3.35 -2.67,-3.32 -4.39,-3.32 h -10.19 z" />
      <path d="m 240.77168,31.031356 v 22.28 h -7.8 l -15.18,-16.71 v 16.71 h -5.73 v -22.28 h 7.77 l 15.21,16.75 v -16.75 z" />
      <path d="M 43.178636,6.9062779 C 36.246101,6.5829549 29.146878,8.2533599 22.776292,12.136747 v 0.002 C 5.7979884,22.494597 0.42254943,44.668097 10.778245,61.656325 c 10.355538,16.977792 32.52955,22.352484 49.517579,11.998047 4.732565,-2.88025 8.734008,-6.818491 11.695312,-11.509766 l 0.603516,-0.958984 h -3.91211 l -0.185547,0.271484 c -10.248041,14.881259 -30.608297,18.636 -45.5,8.388672 h -0.002 c -14.8806946,-10.248655 -18.6369456,-30.60859 -8.388671,-45.5 10.248044,-14.8812591 30.608297,-18.6360001 45.5,-8.388672 3.434324,2.364777 6.389048,5.365752 8.705078,8.849609 l 0.185546,0.279297 h 3.878907 L 72.295824,24.136747 C 65.823417,13.525307 54.732862,7.4451489 43.178636,6.9062779 Z" />
      <path d="M 61.329027,6.9062779 C 54.396492,6.5829549 47.297269,8.2533599 40.926683,12.136747 v 0.002 c -16.978304,10.35585 -22.353745,32.52935 -11.998047,49.517578 10.355801,16.988396 32.529505,22.35365 49.517578,11.998047 4.732566,-2.88025 8.732059,-6.818491 11.693359,-11.509766 l 0.60547,-0.958984 h -3.91211 l -0.18555,0.271484 c -10.248368,14.881739 -30.610121,18.637234 -45.50195,8.388672 -14.881739,-10.248374 -18.637234,-30.608171 -8.388672,-45.5 10.248375,-14.8817391 30.608171,-18.6372341 45.5,-8.388672 3.434324,2.364777 6.389052,5.365752 8.705082,8.849609 l 0.18554,0.279297 h 3.87696 l -0.57813,-0.949218 C 83.973813,13.52526 72.883252,7.4451489 61.329027,6.9062779 Z" />
    </svg>
    """
  end

  def eda_logo(assigns) do
    ~H"""
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="30 85 730 90"
      class={[logo_classes(), "max-w-[150px]"]}
      fill="var(--color-base-content)"
    >
      <path d="M 174.91859,69.18314 C 176.31998,70.07297 177.95979,70.58469 180.18222,70.58469 C 183.123,70.58469 185.55009,69.08067 185.55009,65.69716 C 185.55009,61.01206 174.60924,60.43131 174.60924,54.17586 C 174.60924,50.34721 177.95979,47.95355 182.16628,47.95355 C 183.32771,47.95355 185.20748,48.12469 186.84956,48.73888 L 186.47301,50.89436 C 185.41437,50.31163 183.73716,50.00468 182.13083,50.00468 C 179.67053,50.00468 176.96971,51.03022 176.96971,54.10689 C 176.96971,58.89425 187.90834,58.92759 187.90834,65.90184 C 187.90834,70.72244 183.77287,72.63577 180.07962,72.63577 C 177.75513,72.63577 175.94415,72.15744 174.67849,71.61023 L 174.91859,69.18314" />
      <path d="M 206.43723,57.11458 C 205.27598,56.60291 203.87445,56.22679 202.71084,56.22679 C 198.50645,56.22679 196.1461,59.27007 196.1461,63.50813 C 196.1461,67.47464 198.5398,70.79157 202.47075,70.79157 C 203.83888,70.79157 205.10454,70.48233 206.40401,70.00405 L 206.60853,72.02179 C 205.13794,72.53341 203.76962,72.63577 202.13036,72.63577 C 196.52193,72.63577 193.78772,68.36228 193.78772,63.50813 C 193.78772,58.14007 197.24051,54.38049 202.40372,54.38049 C 204.4882,54.38049 205.99219,54.85878 206.60853,55.06345 L 206.43723,57.11458" />
      <path d="M 212.93326,46.58539 L 215.08644,46.58539 L 215.08644,57.73076 L 215.1557,57.73076 C 216.07861,55.81763 218.02727,54.38049 220.59004,54.38049 C 225.27496,54.38049 226.53895,57.49274 226.53895,61.79963 L 226.53895,72.22646 L 224.38522,72.22646 L 224.38522,61.83287 C 224.38522,58.82528 223.80487,56.22679 220.24966,56.22679 C 216.42136,56.22679 215.08644,59.85071 215.08644,62.89399 L 215.08644,72.22646 L 212.93326,72.22646 L 212.93326,46.58539" />
      <path d="M 252.52246,72.22646 L 249.9242,72.22646 L 245.17212,57.15017 L 245.10332,57.15017 L 240.35138,72.22646 L 237.75317,72.22646 L 232.14696,54.7898 L 234.50508,54.7898 L 239.08585,69.86819 L 239.15451,69.86819 L 244.00892,54.7898 L 246.60731,54.7898 L 251.22339,69.86819 L 251.29,69.86819 L 256.11074,54.7898 L 258.26433,54.7898 L 252.52246,72.22646" />
      <path d="M 274.5039,62.27791 C 274.5039,59.23464 273.27382,56.22679 270.06141,56.22679 C 266.88029,56.22679 264.93168,59.40593 264.93168,62.27791 L 274.5039,62.27791 z M 275.56505,71.67916 C 274.06142,72.29544 272.11244,72.63577 270.50416,72.63577 C 264.72675,72.63577 262.57343,68.73825 262.57343,63.50813 C 262.57343,58.17571 265.5144,54.38049 269.92327,54.38049 C 274.84656,54.38049 276.86434,58.347 276.86434,63.02985 L 276.86434,64.12436 L 264.93168,64.12436 C 264.93168,67.81726 266.91583,70.79157 270.67551,70.79157 C 272.24826,70.79157 274.53944,70.14184 275.56505,69.49237 L 275.56505,71.67916" />
      <path d="M 283.63155,54.7898 L 285.78505,54.7898 L 285.78505,72.22646 L 283.63155,72.22646 L 283.63155,54.7898 z M 285.78505,50.14034 L 283.63155,50.14034 L 283.63155,47.27044 L 285.78505,47.27044 L 285.78505,50.14034" />
      <path d="M 292.28337,70.41545 L 302.7791,56.6363 L 292.6925,56.6363 L 292.6925,54.7898 L 305.27262,54.7898 L 305.27262,56.6363 L 294.77912,70.38002 L 305.27262,70.38002 L 305.27262,72.22646 L 292.28337,72.22646 L 292.28337,70.41545" />
      <path d="M 322.36458,62.27791 C 322.36458,59.23464 321.1344,56.22679 317.92199,56.22679 C 314.74096,56.22679 312.79194,59.40593 312.79194,62.27791 L 322.36458,62.27791 z M 323.42572,71.67916 C 321.92164,72.29544 319.97307,72.63577 318.36483,72.63577 C 312.58733,72.63577 310.43369,68.73825 310.43369,63.50813 C 310.43369,58.17571 313.37507,54.38049 317.78389,54.38049 C 322.70724,54.38049 324.72501,58.347 324.72501,63.02985 L 324.72501,64.12436 L 312.79194,64.12436 C 312.79194,67.81726 314.7765,70.79157 318.5361,70.79157 C 320.10893,70.79157 322.40007,70.14184 323.42572,69.49237 L 323.42572,71.67916" />
      <path d="M 331.49441,58.68738 C 331.49441,56.7742 331.49441,56.0556 331.35864,54.7898 L 333.51228,54.7898 L 333.51228,58.14007 L 333.57884,58.14007 C 334.36653,56.1936 335.83676,54.38049 338.0592,54.38049 C 338.57089,54.38049 339.18723,54.48281 339.56315,54.58502 L 339.56315,56.84317 C 339.11848,56.70522 338.53758,56.6363 337.9904,56.6363 C 334.5711,56.6363 333.64805,60.4671 333.64805,63.6105 L 333.64805,72.22646 L 331.49441,72.22646 L 331.49441,58.68738" />
      <path d="M 345.54522,54.7898 L 347.6984,54.7898 L 347.6984,72.22646 L 345.54522,72.22646 L 345.54522,54.7898 z M 347.6984,50.14034 L 345.54522,50.14034 L 345.54522,47.27044 L 347.6984,47.27044 L 347.6984,50.14034" />
      <path d="M 354.46821,69.697 C 355.76709,70.34662 357.34033,70.79157 359.01504,70.79157 C 361.06621,70.79157 362.87728,69.66132 362.87728,67.67916 C 362.87728,63.54372 354.50142,64.19334 354.50142,59.13232 C 354.50142,55.67963 357.30434,54.38049 360.17646,54.38049 C 361.10001,54.38049 362.94603,54.58502 364.48323,55.16801 L 364.27871,57.04785 C 363.15114,56.53394 361.61344,56.22679 360.41698,56.22679 C 358.19459,56.22679 356.65506,56.90985 356.65506,59.13232 C 356.65506,62.38028 365.23543,61.97092 365.23543,67.67916 C 365.23543,71.37216 361.78292,72.63577 359.15081,72.63577 C 357.4756,72.63577 355.8008,72.43094 354.2636,71.81711 L 354.46821,69.697" />
      <path d="M 383.11472,57.11458 C 381.95339,56.60291 380.55195,56.22679 379.3883,56.22679 C 375.18404,56.22679 372.82351,59.27007 372.82351,63.50813 C 372.82351,67.47464 375.21729,70.79157 379.14829,70.79157 C 380.51646,70.79157 381.78208,70.48233 383.08146,70.00405 L 383.28598,72.02179 C 381.81529,72.53341 380.44716,72.63577 378.80795,72.63577 C 373.19943,72.63577 370.46535,68.36228 370.46535,63.50813 C 370.46535,58.14007 373.91791,54.38049 379.08131,54.38049 C 381.16606,54.38049 382.66955,54.85878 383.28598,55.06345 L 383.11472,57.11458" />
      <path d="M 389.61067,46.58539 L 391.7639,46.58539 L 391.7639,57.73076 L 391.83314,57.73076 C 392.75624,55.81763 394.70486,54.38049 397.26763,54.38049 C 401.95296,54.38049 403.2164,57.49274 403.2164,61.79963 L 403.2164,72.22646 L 401.06276,72.22646 L 401.06276,61.83287 C 401.06276,58.82528 400.48227,56.22679 396.92725,56.22679 C 393.09881,56.22679 391.7639,59.85071 391.7639,62.89399 L 391.7639,72.22646 L 389.61067,72.22646 L 389.61067,46.58539" />
      <path d="M 421.91663,62.27791 C 421.91663,59.23464 420.68655,56.22679 417.47405,56.22679 C 414.29298,56.22679 412.34391,59.40593 412.34391,62.27791 L 421.91663,62.27791 z M 422.97769,71.67916 C 421.47379,72.29544 419.52512,72.63577 417.91689,72.63577 C 412.13939,72.63577 409.98575,68.73825 409.98575,63.50813 C 409.98575,58.17571 412.92713,54.38049 417.336,54.38049 C 422.25929,54.38049 424.27707,58.347 424.27707,63.02985 L 424.27707,64.12436 L 412.34391,64.12436 C 412.34391,67.81726 414.32856,70.79157 418.08824,70.79157 C 419.66094,70.79157 421.95212,70.14184 422.97769,69.49237 L 422.97769,71.67916" />
      <path d="M 442.42976,48.36291 L 454.12004,48.36291 L 454.12004,50.41384 L 444.78787,50.41384 L 444.78787,58.92759 L 453.64216,58.92759 L 453.64216,60.97862 L 444.78787,60.97862 L 444.78787,70.17534 L 454.53186,70.17534 L 454.53186,72.22646 L 442.42976,72.22646 L 442.42976,48.36291" />
      <path d="M 461.951,54.7898 L 464.10463,54.7898 L 464.10463,72.22646 L 461.951,72.22646 L 461.951,54.7898 z M 464.10463,50.14034 L 461.951,50.14034 L 461.951,47.27044 L 464.10463,47.27044 L 464.10463,50.14034" />
      <path d="M 478.70253,70.79157 C 482.53101,70.79157 483.8636,66.68712 483.8636,63.50813 C 483.8636,60.32915 482.53101,56.22679 478.70253,56.22679 C 474.60032,56.22679 473.53918,60.12432 473.53918,63.50813 C 473.53918,66.89404 474.60032,70.79157 478.70253,70.79157 z M 486.01906,72.22646 L 483.8636,72.22646 L 483.8636,69.45679 L 483.79667,69.45679 C 482.63352,71.67916 480.85585,72.63577 478.35996,72.63577 C 473.57471,72.63577 471.18102,68.67151 471.18102,63.50813 C 471.18102,58.20894 473.23215,54.38049 478.35996,54.38049 C 481.77881,54.38049 483.48732,56.87651 483.79667,57.73076 L 483.8636,57.73076 L 483.8636,46.58539 L 486.01906,46.58539 L 486.01906,72.22646" />
      <path d="M 500.24163,70.38002 C 504.13704,70.38002 505.5403,66.68712 505.5403,63.50813 C 505.5403,59.30356 504.31022,56.22679 500.37831,56.22679 C 496.27792,56.22679 495.21637,60.12432 495.21637,63.50813 C 495.21637,66.92738 496.58318,70.38002 500.24163,70.38002 z M 507.69535,70.79157 C 507.69535,75.64571 505.5084,79.60997 499.52638,79.60997 C 497.23465,79.60997 495.14803,78.9604 494.25956,78.68674 L 494.42813,76.5333 C 495.76305,77.21851 497.67658,77.76576 499.55827,77.76576 C 505.09836,77.76576 505.5767,73.73029 505.5767,68.80707 L 505.5084,68.80707 C 504.34666,71.33658 502.42852,72.22646 500.20974,72.22646 C 494.63329,72.22646 492.85539,67.37217 492.85539,63.50813 C 492.85539,58.20894 494.90656,54.38049 500.03665,54.38049 C 502.36019,54.38049 503.86368,54.68749 505.47195,56.7742 L 505.5403,56.7742 L 505.5403,54.7898 L 507.69535,54.7898 L 507.69535,70.79157" />
      <path d="M 526.18827,62.27791 C 526.18827,59.23464 524.95815,56.22679 521.74613,56.22679 C 518.56603,56.22679 516.61599,59.40593 516.61599,62.27791 L 526.18827,62.27791 z M 527.24985,71.67916 C 525.74633,72.29544 523.79635,72.63577 522.18807,72.63577 C 516.41101,72.63577 514.26067,68.73825 514.26067,63.50813 C 514.26067,58.17571 517.19924,54.38049 521.60946,54.38049 C 526.52988,54.38049 528.54828,58.347 528.54828,63.02985 L 528.54828,64.12436 L 516.61599,64.12436 C 516.61599,67.81726 518.60243,70.79157 522.3613,70.79157 C 523.93302,70.79157 526.22472,70.14184 527.24985,69.49237 L 527.24985,71.67916" />
      <path d="M 535.31856,58.89425 C 535.31856,57.55948 535.31856,56.1936 535.18189,54.7898 L 537.26865,54.7898 L 537.26865,57.9021 L 537.33686,57.9021 C 538.05214,56.32926 539.35062,54.38049 542.97725,54.38049 C 547.2873,54.38049 548.923,57.25248 548.923,61.08109 L 548.923,72.22646 L 546.77251,72.22646 L 546.77251,61.62834 C 546.77251,58.347 545.61066,56.22679 542.63559,56.22679 C 538.70375,56.22679 537.47353,59.67953 537.47353,62.58491 L 537.47353,72.22646 L 535.31856,72.22646 L 535.31856,58.89425" />
      <path d="M 563.79829,70.79157 C 567.55705,70.79157 569.5754,67.54361 569.5754,63.50813 C 569.5754,59.4749 567.55705,56.22679 563.79829,56.22679 C 560.03504,56.22679 558.01679,59.4749 558.01679,63.50813 C 558.01679,67.54361 560.03504,70.79157 563.79829,70.79157 z M 563.79829,54.38049 C 569.43873,54.38049 571.93536,58.75635 571.93536,63.50813 C 571.93536,68.25991 569.43873,72.63577 563.79829,72.63577 C 558.15795,72.63577 555.66127,68.25991 555.66127,63.50813 C 555.66127,58.75635 558.15795,54.38049 563.79829,54.38049" />
      <path d="M 577.33431,69.697 C 578.63274,70.34662 580.20916,70.79157 581.88121,70.79157 C 583.93147,70.79157 585.74468,69.66132 585.74468,67.67916 C 585.74468,63.54372 577.37076,64.19334 577.37076,59.13232 C 577.37076,55.67963 580.17266,54.38049 583.04296,54.38049 C 583.96787,54.38049 585.81305,54.58502 587.34847,55.16801 L 587.14797,57.04785 C 586.01818,56.53394 584.4827,56.22679 583.2844,56.22679 C 581.06111,56.22679 579.5212,56.90985 579.5212,59.13232 C 579.5212,62.38028 588.10469,61.97092 588.10469,67.67916 C 588.10469,71.37216 584.65124,72.63577 582.01783,72.63577 C 580.34124,72.63577 578.66914,72.43094 577.12923,71.81711 L 577.33431,69.697" />
      <path d="M 593.29866,69.697 C 594.59709,70.34662 596.17345,70.79157 597.8455,70.79157 C 599.89577,70.79157 601.70903,69.66132 601.70903,67.67916 C 601.70903,63.54372 593.33052,64.19334 593.33052,59.13232 C 593.33052,55.67963 596.13695,54.38049 599.00736,54.38049 C 599.93217,54.38049 601.77739,54.58502 603.31282,55.16801 L 603.10778,57.04785 C 601.98243,56.53394 600.44705,56.22679 599.24885,56.22679 C 597.02546,56.22679 595.4855,56.90985 595.4855,59.13232 C 595.4855,62.38028 604.06909,61.97092 604.06909,67.67916 C 604.06909,71.37216 600.61564,72.63577 597.98223,72.63577 C 596.30559,72.63577 594.63359,72.43094 593.09352,71.81711 L 593.29866,69.697" />
      <path d="M 621.23185,62.27791 C 621.23185,59.23464 619.99699,56.22679 616.78512,56.22679 C 613.60487,56.22679 611.65488,59.40593 611.65488,62.27791 L 621.23185,62.27791 z M 622.28863,71.67916 C 620.78522,72.29544 618.83977,72.63577 617.23149,72.63577 C 611.45443,72.63577 609.29941,68.73825 609.29941,63.50813 C 609.29941,58.17571 612.23808,54.38049 616.64835,54.38049 C 621.57335,54.38049 623.5917,58.347 623.5917,63.02985 L 623.5917,64.12436 L 611.65488,64.12436 C 611.65488,67.81726 613.64132,70.79157 617.40003,70.79157 C 618.97186,70.79157 621.26361,70.14184 622.28863,69.49237 L 622.28863,71.67916" />
      <path d="M 630.35745,58.89425 C 630.35745,57.55948 630.35745,56.1936 630.22072,54.7898 L 632.30733,54.7898 L 632.30733,57.9021 L 632.37569,57.9021 C 633.09113,56.32926 634.38951,54.38049 638.01613,54.38049 C 642.32154,54.38049 643.96168,57.25248 643.96168,61.08109 L 643.96168,72.22646 L 641.81125,72.22646 L 641.81125,61.62834 C 641.81125,58.347 640.64944,56.22679 637.67442,56.22679 C 633.74254,56.22679 632.51237,59.67953 632.51237,62.58491 L 632.51237,72.22646 L 630.35745,72.22646 L 630.35745,58.89425" />
      <path d="M 650.70015,69.697 C 651.99858,70.34662 653.57041,70.79157 655.24705,70.79157 C 657.29731,70.79157 659.10604,69.66132 659.10604,67.67916 C 659.10604,63.54372 650.73201,64.19334 650.73201,59.13232 C 650.73201,55.67963 653.53391,54.38049 656.40875,54.38049 C 657.32912,54.38049 659.17883,54.58502 660.71431,55.16801 L 660.50923,57.04785 C 659.38387,56.53394 657.84391,56.22679 656.6457,56.22679 C 654.4269,56.22679 652.88699,56.90985 652.88699,59.13232 C 652.88699,62.38028 661.47058,61.97092 661.47058,67.67916 C 661.47058,71.37216 658.01249,72.63577 655.38372,72.63577 C 653.70708,72.63577 652.03044,72.43094 650.49048,71.81711 L 650.70015,69.697" />
      <path d="M 679.34842,57.11458 C 678.18666,56.60291 676.78342,56.22679 675.62162,56.22679 C 671.41628,56.22679 669.05632,59.27007 669.05632,63.50813 C 669.05632,67.47464 671.44829,70.79157 675.38008,70.79157 C 676.75156,70.79157 678.01349,70.48233 679.3165,70.00405 L 679.51695,72.02179 C 678.04994,72.53341 676.67856,72.63577 675.04306,72.63577 C 669.43453,72.63577 666.69636,68.36228 666.69636,63.50813 C 666.69636,58.14007 670.14971,54.38049 675.31636,54.38049 C 677.39848,54.38049 678.90195,54.85878 679.51695,55.06345 L 679.34842,57.11458" />
      <path d="M 685.84535,46.58539 L 687.99579,46.58539 L 687.99579,57.73076 L 688.06415,57.73076 C 688.98895,55.81763 690.93899,54.38049 693.4994,54.38049 C 698.18312,54.38049 699.44969,57.49274 699.44969,61.79963 L 699.44969,72.22646 L 697.29915,72.22646 L 697.29915,61.83287 C 697.29915,58.82528 696.716,56.22679 693.16228,56.22679 C 689.33072,56.22679 687.99579,59.85071 687.99579,62.89399 L 687.99579,72.22646 L 685.84535,72.22646 L 685.84535,46.58539" />
      <path d="M 717.32747,63.43916 L 716.717,63.43916 C 712.98571,63.43916 708.54802,63.81737 708.54802,67.64582 C 708.54802,69.93492 710.18367,70.79157 712.16547,70.79157 C 717.2273,70.79157 717.32747,66.38012 717.32747,64.50033 L 717.32747,63.43916 z M 717.53256,69.42345 L 717.46878,69.42345 C 716.51196,71.50792 714.07906,72.63577 711.92862,72.63577 C 706.9716,72.63577 706.18357,69.28545 706.18357,67.71271 C 706.18357,61.86855 712.407,61.59495 716.91745,61.59495 L 717.32747,61.59495 L 717.32747,60.70497 C 717.32747,57.73076 716.27053,56.22679 713.36372,56.22679 C 711.555,56.22679 709.84649,56.6363 708.23363,57.66169 L 708.23363,55.57732 C 709.56871,54.92775 711.82386,54.38049 713.36372,54.38049 C 717.66933,54.38049 719.48255,56.32926 719.48255,60.87641 L 719.48255,68.5692 C 719.48255,69.97066 719.48255,71.02959 719.65562,72.22646 L 717.53256,72.22646 L 717.53256,69.42345" />
      <path d="M 728.74497,56.6363 L 725.2277,56.6363 L 725.2277,54.7898 L 728.74497,54.7898 L 728.74497,53.52624 C 728.74497,49.86893 728.88165,46.17608 733.36467,46.17608 C 734.04365,46.17608 734.96851,46.27844 735.37853,46.51865 L 735.24186,48.39834 C 734.79533,48.15823 734.14836,48.02253 733.53336,48.02253 C 730.59015,48.02253 730.8999,51.20151 730.8999,53.28598 L 730.8999,54.7898 L 734.83183,54.7898 L 734.83183,56.6363 L 730.8999,56.6363 L 730.8999,72.22646 L 728.74497,72.22646 L 728.74497,56.6363" />
      <path d="M 748.84614,56.6363 L 744.88234,56.6363 L 744.88234,67.91958 C 744.88234,69.49237 745.46559,70.79157 747.21054,70.79157 C 748.03059,70.79157 748.57738,70.62028 749.1879,70.38002 L 749.32906,72.15744 C 748.81428,72.36217 747.75724,72.63577 746.69571,72.63577 C 742.86863,72.63577 742.72742,70.00405 742.72742,66.82491 L 742.72742,56.6363 L 739.31042,56.6363 L 739.31042,54.7898 L 742.72742,54.7898 L 742.72742,50.58528 L 744.88234,49.83324 L 744.88234,54.7898 L 748.84614,54.7898 L 748.84614,56.6363" />
      <path d="M 191.67017,98.18586 C 190.16631,97.40043 188.01039,97.16032 186.33551,97.16032 C 180.14896,97.16032 176.66036,101.53592 176.66036,107.45144 C 176.66036,113.46683 180.04636,117.74033 186.33551,117.74033 C 187.90834,117.74033 190.30203,117.53539 191.67017,116.71479 L 191.80589,118.76602 C 190.50669,119.55329 187.84132,119.79141 186.33551,119.79141 C 178.81404,119.79141 174.30266,114.83495 174.30266,107.45144 C 174.30266,100.20334 178.952,95.10919 186.33551,95.10919 C 187.73703,95.10919 190.5754,95.34935 191.80589,95.99907 L 191.67017,98.18586" />
      <path d="M 206.47281,117.94725 C 210.23468,117.94725 212.25031,114.69929 212.25031,110.66351 C 212.25031,106.63053 210.23468,103.38258 206.47281,103.38258 C 202.71322,103.38258 200.69521,106.63053 200.69521,110.66351 C 200.69521,114.69929 202.71322,117.94725 206.47281,117.94725 z M 206.47281,101.53592 C 212.1145,101.53592 214.61025,105.91204 214.61025,110.66351 C 214.61025,115.41544 212.1145,119.79141 206.47281,119.79141 C 200.83326,119.79141 198.3371,115.41544 198.3371,110.66351 C 198.3371,105.91204 200.83326,101.53592 206.47281,101.53592" />
      <path d="M 221.34443,106.04963 C 221.34443,104.71516 221.34443,103.34924 221.20875,101.94549 L 223.29309,101.94549 L 223.29309,105.05774 L 223.36207,105.05774 C 224.07864,103.48504 225.37756,101.53592 229.00148,101.53592 C 233.31044,101.53592 234.95025,104.40817 234.95025,108.23647 L 234.95025,119.382 L 232.79657,119.382 L 232.79657,108.78372 C 232.79657,105.50253 231.63528,103.38258 228.6611,103.38258 C 224.72783,103.38258 223.49775,106.83506 223.49775,109.74059 L 223.49775,119.382 L 221.34443,119.382 L 221.34443,106.04963" />
      <path d="M 244.48917,103.79163 L 240.96786,103.79163 L 240.96786,101.94549 L 244.48917,101.94549 L 244.48917,100.68162 C 244.48917,97.02446 244.62503,93.33146 249.1032,93.33146 C 249.78825,93.33146 250.71189,93.43397 251.12093,93.67184 L 250.98521,95.55387 C 250.54058,95.31371 249.89085,95.17806 249.27437,95.17806 C 246.33577,95.17806 246.64289,98.35714 246.64289,100.44151 L 246.64289,101.94549 L 250.5738,101.94549 L 250.5738,103.79163 L 246.64289,103.79163 L 246.64289,119.382 L 244.48917,119.382 L 244.48917,103.79163" />
      <path d="M 264.11301,95.21125 L 266.81336,95.21125 L 262.50655,100.13452 L 260.93376,100.13452 L 264.11301,95.21125 z M 267.7012,109.43345 C 267.7012,106.39032 266.47071,103.38258 263.25875,103.38258 C 260.07727,103.38258 258.12866,106.56171 258.12866,109.43345 L 267.7012,109.43345 z M 268.76235,118.83469 C 267.25849,119.45077 265.30987,119.79141 263.70105,119.79141 C 257.92395,119.79141 255.77041,115.89388 255.77041,110.66351 C 255.77041,105.33109 258.71119,101.53592 263.1207,101.53592 C 268.04386,101.53592 270.06141,105.50253 270.06141,110.18548 L 270.06141,111.2799 L 258.12866,111.2799 C 258.12866,114.97259 260.11272,117.94725 263.87249,117.94725 C 265.44515,117.94725 267.73687,117.29763 268.76235,116.64791 L 268.76235,118.83469" />
      <path d="M 283.32475,117.94725 C 287.15332,117.94725 288.48596,113.84265 288.48596,110.66351 C 288.48596,107.48478 287.15332,103.38258 283.32475,103.38258 C 279.22259,103.38258 278.16144,107.28031 278.16144,110.66351 C 278.16144,114.04957 279.22259,117.94725 283.32475,117.94725 z M 290.64133,119.382 L 288.48596,119.382 L 288.48596,116.61232 L 288.41894,116.61232 C 287.25533,118.83469 285.47802,119.79141 282.98227,119.79141 C 278.19698,119.79141 275.80329,115.82684 275.80329,110.66351 C 275.80329,105.36488 277.85432,101.53592 282.98227,101.53592 C 286.40153,101.53592 288.11004,104.0322 288.41894,104.88645 L 288.48596,104.88645 L 288.48596,93.74107 L 290.64133,93.74107 L 290.64133,119.382" />
      <path d="M 305.54639,95.21125 L 308.24716,95.21125 L 303.93811,100.13452 L 302.36719,100.13452 L 305.54639,95.21125 z M 309.13477,109.43345 C 309.13477,106.39032 307.90464,103.38258 304.69213,103.38258 C 301.51107,103.38258 299.56209,106.56171 299.56209,109.43345 L 309.13477,109.43345 z M 310.19578,118.83469 C 308.69192,119.45077 306.74331,119.79141 305.13498,119.79141 C 299.35757,119.79141 297.20388,115.89388 297.20388,110.66351 C 297.20388,105.33109 300.14521,101.53592 304.55413,101.53592 C 309.47729,101.53592 311.49516,105.50253 311.49516,110.18548 L 311.49516,111.2799 L 299.56209,111.2799 C 299.56209,114.97259 301.54674,117.94725 305.30642,117.94725 C 306.87903,117.94725 309.1703,117.29763 310.19578,116.64791 L 310.19578,118.83469" />
      <path d="M 318.26456,105.84291 C 318.26456,103.92973 318.26456,103.21113 318.12879,101.94549 L 320.28247,101.94549 L 320.28247,105.29785 L 320.34899,105.29785 C 321.13673,103.34924 322.60696,101.53592 324.82939,101.53592 C 325.34099,101.53592 325.95746,101.63849 326.33329,101.74055 L 326.33329,103.9984 C 325.88821,103.86091 325.30773,103.79163 324.76064,103.79163 C 321.34129,103.79163 320.41824,107.62054 320.41824,110.76598 L 320.41824,119.382 L 318.26456,119.382 L 318.26456,105.84291" />
      <path d="M 342.12819,110.59709 L 341.51176,110.59709 C 337.78579,110.59709 333.34093,110.9729 333.34093,114.80135 C 333.34093,117.09076 334.98251,117.94725 336.96484,117.94725 C 342.02336,117.94725 342.12819,113.53565 342.12819,111.65586 L 342.12819,110.59709 z M 342.33271,116.57903 L 342.26392,116.57903 C 341.30719,118.66355 338.88019,119.79141 336.72474,119.79141 C 331.76818,119.79141 330.98281,116.44103 330.98281,114.86834 C 330.98281,109.02424 337.20494,108.75033 341.71678,108.75033 L 342.12819,108.75033 L 342.12819,107.86065 C 342.12819,104.88645 341.06704,103.38258 338.16176,103.38258 C 336.34841,103.38258 334.6399,103.79163 333.03385,104.81722 L 333.03385,102.73285 C 334.36653,102.08313 336.62227,101.53592 338.16176,101.53592 C 342.46857,101.53592 344.28138,103.48504 344.28138,108.03209 L 344.28138,115.72478 C 344.28138,117.12619 344.28138,118.18512 344.45263,119.382 L 342.33271,119.382 L 342.33271,116.57903" />
      <path d="M 359.59598,103.79163 L 355.62959,103.79163 L 355.62959,115.07511 C 355.62959,116.64791 356.21225,117.94725 357.95403,117.94725 C 358.77503,117.94725 359.32221,117.77591 359.93864,117.53539 L 360.07441,119.31312 C 359.56272,119.5178 358.50116,119.79141 357.4423,119.79141 C 353.61395,119.79141 353.47586,117.15943 353.47586,113.9807 L 353.47586,103.79163 L 350.05669,103.79163 L 350.05669,101.94549 L 353.47586,101.94549 L 353.47586,97.74081 L 355.62959,96.98903 L 355.62959,101.94549 L 359.59598,101.94549 L 359.59598,103.79163" />
      <path d="M 366.12532,101.94549 L 368.27841,101.94549 L 368.27841,119.382 L 366.12532,119.382 L 366.12532,101.94549 z M 368.27841,97.29612 L 366.12532,97.29612 L 366.12532,94.42628 L 368.27841,94.42628 L 368.27841,97.29612" />
      <path d="M 383.18347,117.94725 C 386.94539,117.94725 388.96102,114.69929 388.96102,110.66351 C 388.96102,106.63053 386.94539,103.38258 383.18347,103.38258 C 379.42384,103.38258 377.40647,106.63053 377.40647,110.66351 C 377.40647,114.69929 379.42384,117.94725 383.18347,117.94725 z M 383.18347,101.53592 C 388.8253,101.53592 391.3215,105.91204 391.3215,110.66351 C 391.3215,115.41544 388.8253,119.79141 383.18347,119.79141 C 377.54402,119.79141 375.04826,115.41544 375.04826,110.66351 C 375.04826,105.91204 377.54402,101.53592 383.18347,101.53592" />
      <path d="M 398.05527,106.04963 C 398.05527,104.71516 398.05527,103.34924 397.91951,101.94549 L 400.00393,101.94549 L 400.00393,105.05774 L 400.07314,105.05774 C 400.78944,103.48504 402.08828,101.53592 405.71219,101.53592 C 410.02129,101.53592 411.66105,104.40817 411.66105,108.23647 L 411.66105,119.382 L 409.50778,119.382 L 409.50778,108.78372 C 409.50778,105.50253 408.34653,103.38258 405.37181,103.38258 C 401.43909,103.38258 400.2085,106.83506 400.2085,109.74059 L 400.2085,119.382 L 398.05527,119.382 L 398.05527,106.04963" />
      <path d="M 430.22775,116.85243 C 431.52713,117.50216 433.09987,117.94725 434.77508,117.94725 C 436.8262,117.94725 438.63682,116.81685 438.63682,114.83495 C 438.63682,110.69955 430.26096,111.34882 430.26096,106.2878 C 430.26096,102.83532 433.06438,101.53592 435.936,101.53592 C 436.85951,101.53592 438.70607,101.74055 440.24323,102.32145 L 440.03821,104.20349 C 438.91059,103.68957 437.37348,103.38258 436.17661,103.38258 C 433.95413,103.38258 432.41464,104.06544 432.41464,106.2878 C 432.41464,109.53591 440.99725,109.1263 440.99725,114.83495 C 440.99725,118.5277 437.54246,119.79141 434.91039,119.79141 C 433.23564,119.79141 431.56039,119.58647 430.02095,118.97274 L 430.22775,116.85243" />
      <path d="M 461.12995,115.27979 C 461.12995,116.61232 461.12995,117.98044 461.26796,119.382 L 459.18134,119.382 L 459.18134,116.27194 L 459.11437,116.27194 C 458.39588,117.84254 457.09691,119.79141 453.47313,119.79141 C 449.16577,119.79141 447.52427,116.91932 447.52427,113.09086 L 447.52427,101.94549 L 449.67791,101.94549 L 449.67791,112.5433 C 449.67791,115.82684 450.84106,117.94725 453.81565,117.94725 C 457.74664,117.94725 458.97682,114.49237 458.97682,111.58699 L 458.97682,101.94549 L 461.12995,101.94549 L 461.12995,115.27979" />
      <path d="M 469.19869,101.94549 L 471.35233,101.94549 L 471.35233,119.382 L 469.19869,119.382 L 469.19869,101.94549 z M 471.35233,97.29612 L 469.19869,97.29612 L 469.19869,94.42628 L 471.35233,94.42628 L 471.35233,97.29612" />
      <path d="M 478.12163,116.85243 C 479.42102,117.50216 480.99376,117.94725 482.66905,117.94725 C 484.72023,117.94725 486.53075,116.81685 486.53075,114.83495 C 486.53075,110.69955 478.15494,111.34882 478.15494,106.2878 C 478.15494,102.83532 480.95831,101.53592 483.82989,101.53592 C 484.75344,101.53592 486.59995,101.74055 488.13725,102.32145 L 487.93223,104.20349 C 486.80457,103.68957 485.26736,103.38258 484.07044,103.38258 C 481.84801,103.38258 480.30853,104.06544 480.30853,106.2878 C 480.30853,109.53591 488.88895,109.1263 488.88895,114.83495 C 488.88895,118.5277 485.43634,119.79141 482.80483,119.79141 C 481.12953,119.79141 479.45427,119.58647 477.91711,118.97274 L 478.12163,116.85243" />
      <path d="M 494.0878,116.85243 C 495.38946,117.50216 496.96128,117.94725 498.63791,117.94725 C 500.68812,117.94725 502.49687,116.81685 502.49687,114.83495 C 502.49687,110.69955 494.1211,111.34882 494.1211,106.2878 C 494.1211,102.83532 496.92489,101.53592 499.79969,101.53592 C 500.72001,101.53592 502.56981,101.74055 504.10515,102.32145 L 503.90013,104.20349 C 502.77479,103.68957 501.23489,103.38258 500.03665,103.38258 C 497.81786,103.38258 496.27792,104.06544 496.27792,106.2878 C 496.27792,109.53591 504.86145,109.1263 504.86145,114.83495 C 504.86145,118.5277 501.40346,119.79141 498.77459,119.79141 C 497.09797,119.79141 495.42139,119.58647 493.88095,118.97274 L 494.0878,116.85243" />
      <path d="M 522.01948,109.43345 C 522.01948,106.39032 520.78937,103.38258 517.5774,103.38258 C 514.39271,103.38258 512.44729,106.56171 512.44729,109.43345 L 522.01948,109.43345 z M 523.08106,118.83469 C 521.57296,119.45077 519.62751,119.79141 518.01928,119.79141 C 512.24227,119.79141 510.08722,115.89388 510.08722,110.66351 C 510.08722,105.33109 513.0304,101.53592 517.43614,101.53592 C 522.3613,101.53592 524.37944,105.50253 524.37944,110.18548 L 524.37944,111.2799 L 512.44729,111.2799 C 512.44729,114.97259 514.42911,117.94725 518.18782,117.94725 C 519.76418,117.94725 522.0514,117.29763 523.08106,116.64791 L 523.08106,118.83469" />
      <path d="M 191.67017,145.34123 C 190.16631,144.55586 188.01039,144.3157 186.33551,144.3157 C 180.14896,144.3157 176.66036,148.6914 176.66036,154.60682 C 176.66036,160.62236 180.04636,164.89586 186.33551,164.89586 C 187.90834,164.89586 190.30203,164.69077 191.67017,163.87017 L 191.80589,165.9214 C 190.50669,166.70861 187.84132,166.94694 186.33551,166.94694 C 178.81404,166.94694 174.30266,161.99048 174.30266,154.60682 C 174.30266,147.35872 178.952,142.26462 186.33551,142.26462 C 187.73703,142.26462 190.5754,142.50253 191.80589,143.15205 L 191.67017,145.34123" />
      <path d="M 206.47281,165.10258 C 210.23468,165.10258 212.25031,161.85462 212.25031,157.81889 C 212.25031,153.78596 210.23468,150.53801 206.47281,150.53801 C 202.71322,150.53801 200.69521,153.78596 200.69521,157.81889 C 200.69521,161.85462 202.71322,165.10258 206.47281,165.10258 z M 206.47281,148.6914 C 212.1145,148.6914 214.61025,153.06737 214.61025,157.81889 C 214.61025,162.57082 212.1145,166.94694 206.47281,166.94694 C 200.83326,166.94694 198.3371,162.57082 198.3371,157.81889 C 198.3371,153.06737 200.83326,148.6914 206.47281,148.6914" />
      <path d="M 221.34443,153.20506 C 221.34443,151.87054 221.34443,150.50462 221.20875,149.10086 L 223.29309,149.10086 L 223.29309,152.21312 L 223.36207,152.21312 C 224.07864,150.64047 225.37756,148.6914 229.00148,148.6914 C 233.31044,148.6914 234.95025,151.56339 234.95025,155.392 L 234.95025,166.53738 L 232.79657,166.53738 L 232.79657,155.9391 C 232.79657,152.6578 231.63528,150.53801 228.6611,150.53801 C 224.72783,150.53801 223.49775,153.99049 223.49775,156.89582 L 223.49775,166.53738 L 221.34443,166.53738 L 221.34443,153.20506" />
      <path d="M 244.48917,150.94706 L 240.96786,150.94706 L 240.96786,149.10086 L 244.48917,149.10086 L 244.48917,147.83715 C 244.48917,144.17999 244.62503,140.48684 249.1032,140.48684 C 249.78825,140.48684 250.71189,140.5893 251.12093,140.82946 L 250.98521,142.70941 C 250.54058,142.46925 249.89085,142.33344 249.27437,142.33344 C 246.33577,142.33344 246.64289,145.51257 246.64289,147.59704 L 246.64289,149.10086 L 250.5738,149.10086 L 250.5738,150.94706 L 246.64289,150.94706 L 246.64289,166.53738 L 244.48917,166.53738 L 244.48917,150.94706" />
      <path d="M 267.7012,156.58867 C 267.7012,153.54524 266.47071,150.53801 263.25875,150.53801 C 260.07727,150.53801 258.12866,153.71668 258.12866,156.58867 L 267.7012,156.58867 z M 268.76235,165.99022 C 267.25849,166.60655 265.30987,166.94694 263.70105,166.94694 C 257.92395,166.94694 255.77041,163.04916 255.77041,157.81889 C 255.77041,152.48662 258.71119,148.6914 263.1207,148.6914 C 268.04386,148.6914 270.06141,152.6578 270.06141,157.34102 L 270.06141,158.43543 L 258.12866,158.43543 C 258.12866,162.12802 260.11272,165.10258 263.87249,165.10258 C 265.44515,165.10258 267.73687,164.45301 268.76235,163.80328 L 268.76235,165.99022" />
      <path d="M 283.32475,165.10258 C 287.15332,165.10258 288.48596,160.99818 288.48596,157.81889 C 288.48596,154.64021 287.15332,150.53801 283.32475,150.53801 C 279.22259,150.53801 278.16144,154.43553 278.16144,157.81889 C 278.16144,161.20495 279.22259,165.10258 283.32475,165.10258 z M 290.64133,166.53738 L 288.48596,166.53738 L 288.48596,163.7677 L 288.41894,163.7677 C 287.25533,165.99022 285.47802,166.94694 282.98227,166.94694 C 278.19698,166.94694 275.80329,162.98227 275.80329,157.81889 C 275.80329,152.52016 277.85432,148.6914 282.98227,148.6914 C 286.40153,148.6914 288.11004,151.18758 288.41894,152.04183 L 288.48596,152.04183 L 288.48596,140.89645 L 290.64133,140.89645 L 290.64133,166.53738" />
      <path d="M 309.13477,156.58867 C 309.13477,153.54524 307.90464,150.53801 304.69213,150.53801 C 301.51107,150.53801 299.56209,153.71668 299.56209,156.58867 L 309.13477,156.58867 z M 310.19578,165.99022 C 308.69192,166.60655 306.74331,166.94694 305.13498,166.94694 C 299.35757,166.94694 297.20388,163.04916 297.20388,157.81889 C 297.20388,152.48662 300.14521,148.6914 304.55413,148.6914 C 309.47729,148.6914 311.49516,152.6578 311.49516,157.34102 L 311.49516,158.43543 L 299.56209,158.43543 C 299.56209,162.12802 301.54674,165.10258 305.30642,165.10258 C 306.87903,165.10258 309.1703,164.45301 310.19578,163.80328 L 310.19578,165.99022" />
      <path d="M 318.26456,152.99819 C 318.26456,151.08511 318.26456,150.36667 318.12879,149.10086 L 320.28247,149.10086 L 320.28247,152.45103 L 320.34899,152.45103 C 321.13673,150.50462 322.60696,148.6914 324.82939,148.6914 C 325.34099,148.6914 325.95746,148.79392 326.33329,148.89598 L 326.33329,151.15393 C 325.88821,151.01629 325.30773,150.94706 324.76064,150.94706 C 321.34129,150.94706 320.41824,154.77826 320.41824,157.92136 L 320.41824,166.53738 L 318.26456,166.53738 L 318.26456,152.99819" />
      <path d="M 342.12819,157.75007 L 341.51176,157.75007 C 337.78579,157.75007 333.34093,158.12828 333.34093,161.95668 C 333.34093,164.24614 334.98251,165.10258 336.96484,165.10258 C 342.02336,165.10258 342.12819,160.69103 342.12819,158.81124 L 342.12819,157.75007 z M 342.33271,163.73446 L 342.26392,163.73446 C 341.30719,165.81878 338.88019,166.94694 336.72474,166.94694 C 331.76818,166.94694 330.98281,163.59641 330.98281,162.02372 C 330.98281,156.17962 337.20494,155.90586 341.71678,155.90586 L 342.12819,155.90586 L 342.12819,155.01618 C 342.12819,152.04183 341.06704,150.53801 338.16176,150.53801 C 336.34841,150.53801 334.6399,150.94706 333.03385,151.97275 L 333.03385,149.88828 C 334.36653,149.23851 336.62227,148.6914 338.16176,148.6914 C 342.46857,148.6914 344.28138,150.64047 344.28138,155.18727 L 344.28138,162.88021 C 344.28138,164.28172 344.28138,165.3405 344.45263,166.53738 L 342.33271,166.53738 L 342.33271,163.73446" />
      <path d="M 350.46847,164.72682 L 360.96416,150.94706 L 350.87764,150.94706 L 350.87764,149.10086 L 363.45776,149.10086 L 363.45776,150.94706 L 352.96426,164.69077 L 363.45776,164.69077 L 363.45776,166.53738 L 350.46847,166.53738 L 350.46847,164.72682" />
      <path d="M 369.92045,149.10086 L 372.07404,149.10086 L 372.07404,166.53738 L 369.92045,166.53738 L 369.92045,149.10086 z M 372.07404,144.4514 L 369.92045,144.4514 L 369.92045,141.58165 L 372.07404,141.58165 L 372.07404,144.4514" />
      <path d="M 386.97865,165.10258 C 390.74056,165.10258 392.75624,161.85462 392.75624,157.81889 C 392.75624,153.78596 390.74056,150.53801 386.97865,150.53801 C 383.21905,150.53801 381.20164,153.78596 381.20164,157.81889 C 381.20164,161.85462 383.21905,165.10258 386.97865,165.10258 z M 386.97865,148.6914 C 392.62048,148.6914 395.11668,153.06737 395.11668,157.81889 C 395.11668,162.57082 392.62048,166.94694 386.97865,166.94694 C 381.33919,166.94694 378.84344,162.57082 378.84344,157.81889 C 378.84344,153.06737 381.33919,148.6914 386.97865,148.6914" />
      <path d="M 401.8505,153.20506 C 401.8505,151.87054 401.8505,150.50462 401.71463,149.10086 L 403.79907,149.10086 L 403.79907,152.21312 L 403.86836,152.21312 C 404.58457,150.64047 405.88345,148.6914 409.50778,148.6914 C 413.81696,148.6914 415.45618,151.56339 415.45618,155.392 L 415.45618,166.53738 L 413.303,166.53738 L 413.303,155.9391 C 413.303,152.6578 412.14167,150.53801 409.16744,150.53801 C 405.23422,150.53801 404.00368,153.99049 404.00368,156.89582 L 404.00368,166.53738 L 401.8505,166.53738 L 401.8505,153.20506" />
      <path d="M 434.15637,156.58867 C 434.15637,153.54524 432.92629,150.53801 429.71378,150.53801 C 426.53285,150.53801 424.58373,153.71668 424.58373,156.58867 L 434.15637,156.58867 z M 435.21751,165.99022 C 433.71352,166.60655 431.76495,166.94694 430.15663,166.94694 C 424.37913,166.94694 422.22599,163.04916 422.22599,157.81889 C 422.22599,152.48662 425.16686,148.6914 429.57578,148.6914 C 434.49903,148.6914 436.5169,152.6578 436.5169,157.34102 L 436.5169,158.43543 L 424.58373,158.43543 C 424.58373,162.12802 426.56829,165.10258 430.32798,165.10258 C 431.90072,165.10258 434.19191,164.45301 435.21751,163.80328 L 435.21751,165.99022" />
      <path d="M 454.70554,163.49395 C 456.10688,164.38419 457.74664,164.89586 459.96862,164.89586 C 462.90949,164.89586 465.33699,163.39189 465.33699,160.00807 C 465.33699,155.32318 454.39614,154.74227 454.39614,148.48672 C 454.39614,144.65832 457.74664,142.26462 461.95318,142.26462 C 463.11452,142.26462 464.99443,142.43591 466.63592,143.04959 L 466.26,145.20558 C 465.20123,144.62284 463.52374,144.3157 461.91774,144.3157 C 459.45698,144.3157 456.75662,145.34123 456.75662,148.41806 C 456.75662,153.20506 467.69474,153.23866 467.69474,160.2126 C 467.69474,165.0335 463.55923,166.94694 459.86657,166.94694 C 457.54162,166.94694 455.73106,166.46866 454.46489,165.9214 L 454.70554,163.49395" />
      <path d="M 480.92501,166.53738 L 478.39554,166.53738 L 472.47995,149.10086 L 474.84038,149.10086 L 479.66116,164.17925 L 479.72818,164.17925 L 484.78898,149.10086 L 487.04467,149.10086 L 480.92501,166.53738" />
      <path d="M 492.71962,149.10086 L 494.87467,149.10086 L 494.87467,166.53738 L 492.71962,166.53738 L 492.71962,149.10086 z M 494.87467,144.4514 L 492.71962,144.4514 L 492.71962,141.58165 L 494.87467,141.58165 L 494.87467,144.4514" />
      <path d="M 501.37157,164.72682 L 511.86867,150.94706 L 501.78157,150.94706 L 501.78157,149.10086 L 514.36079,149.10086 L 514.36079,150.94706 L 503.86819,164.69077 L 514.36079,164.69077 L 514.36079,166.53738 L 501.37157,166.53738 L 501.37157,164.72682" />
      <path d="M 519.21754,164.72682 L 529.71467,150.94706 L 519.62751,150.94706 L 519.62751,149.10086 L 532.20682,149.10086 L 532.20682,150.94706 L 521.71422,164.69077 L 532.20682,164.69077 L 532.20682,166.53738 L 519.21754,166.53738 L 519.21754,164.72682" />
      <path d="M 549.29642,156.58867 C 549.29642,153.54524 548.06635,150.53801 544.85434,150.53801 C 541.67423,150.53801 539.72424,153.71668 539.72424,156.58867 L 549.29642,156.58867 z M 550.35815,165.99022 C 548.85464,166.60655 546.90924,166.94694 545.30091,166.94694 C 539.51926,166.94694 537.36882,163.04916 537.36882,157.81889 C 537.36882,152.48662 540.30744,148.6914 544.71766,148.6914 C 549.64272,148.6914 551.65653,152.6578 551.65653,157.34102 L 551.65653,158.43543 L 539.72424,158.43543 C 539.72424,162.12802 541.71068,165.10258 545.46944,165.10258 C 547.04127,165.10258 549.33292,164.45301 550.35815,163.80328 L 550.35815,165.99022" />
      <path d="M 558.42681,152.99819 C 558.42681,151.08511 558.42681,150.36667 558.29467,149.10086 L 560.44511,149.10086 L 560.44511,152.45103 L 560.51342,152.45103 C 561.30166,150.50462 562.76862,148.6914 564.99201,148.6914 C 565.50679,148.6914 566.1219,148.79392 566.49552,148.89598 L 566.49552,151.15393 C 566.05359,151.01629 565.47039,150.94706 564.92369,150.94706 C 561.50664,150.94706 560.58178,154.77826 560.58178,157.92136 L 560.58178,166.53738 L 558.42681,166.53738 L 558.42681,152.99819" />
      <path d="M 582.29128,157.75007 L 581.67617,157.75007 C 577.94932,157.75007 573.5027,158.12828 573.5027,161.95668 C 573.5027,164.24614 575.14738,165.10258 577.12923,165.10258 C 582.18642,165.10258 582.29128,160.69103 582.29128,158.81124 L 582.29128,157.75007 z M 582.49632,163.73446 L 582.42796,163.73446 C 581.47114,165.81878 579.04281,166.94694 576.88779,166.94694 C 571.93087,166.94694 571.14723,163.59641 571.14723,162.02372 C 571.14723,156.17962 577.37076,155.90586 581.88121,155.90586 L 582.29128,155.90586 L 582.29128,155.01618 C 582.29128,152.04183 581.2297,150.53801 578.32748,150.53801 C 576.51417,150.53801 574.80567,150.94706 573.19744,151.97275 L 573.19744,149.88828 C 574.53232,149.23851 576.78757,148.6914 578.32748,148.6914 C 582.63294,148.6914 584.44625,150.64047 584.44625,155.18727 L 584.44625,162.88021 C 584.44625,164.28172 584.44625,165.3405 584.61479,166.53738 L 582.49632,166.53738 L 582.49632,163.73446" />
      <path d="M 191.67017,192.49442 C 190.16631,191.70899 188.01039,191.46883 186.33551,191.46883 C 180.14896,191.46883 176.66036,195.84444 176.66036,201.76011 C 176.66036,207.7754 180.04636,212.04884 186.33551,212.04884 C 187.90834,212.04884 190.30203,211.84391 191.67017,211.02346 L 191.80589,213.07443 C 190.50669,213.8618 187.84132,214.10013 186.33551,214.10013 C 178.81404,214.10013 174.30266,209.14351 174.30266,201.76011 C 174.30266,194.51226 178.952,189.41765 186.33551,189.41765 C 187.73703,189.41765 190.5754,189.65552 191.80589,190.30524 L 191.67017,192.49442" />
      <path d="M 206.47281,212.25577 C 210.23468,212.25577 212.25031,209.00781 212.25031,204.97208 C 212.25031,200.9391 210.23468,197.69104 206.47281,197.69104 C 202.71322,197.69104 200.69521,200.9391 200.69521,204.97208 C 200.69521,209.00781 202.71322,212.25577 206.47281,212.25577 z M 206.47281,195.84444 C 212.1145,195.84444 214.61025,200.22055 214.61025,204.97208 C 214.61025,209.72401 212.1145,214.10013 206.47281,214.10013 C 200.83326,214.10013 198.3371,209.72401 198.3371,204.97208 C 198.3371,200.22055 200.83326,195.84444 206.47281,195.84444" />
      <path d="M 221.34443,200.3586 C 221.34443,199.02373 221.34443,197.65775 221.20875,196.2542 L 223.29309,196.2542 L 223.29309,199.3663 L 223.36207,199.3663 C 224.07864,197.79351 225.37756,195.84444 229.00148,195.84444 C 233.31044,195.84444 234.95025,198.71668 234.95025,202.54503 L 234.95025,213.69036 L 232.79657,213.69036 L 232.79657,203.09213 C 232.79657,199.81109 231.63528,197.69104 228.6611,197.69104 C 224.72783,197.69104 223.49775,201.14363 223.49775,204.04895 L 223.49775,213.69036 L 221.34443,213.69036 L 221.34443,200.3586" />
      <path d="M 244.48917,198.10004 L 240.96786,198.10004 L 240.96786,196.2542 L 244.48917,196.2542 L 244.48917,194.99019 C 244.48917,191.33302 244.62503,187.64002 249.1032,187.64002 C 249.78825,187.64002 250.71189,187.74249 251.12093,187.9825 L 250.98521,189.86239 C 250.54058,189.62228 249.89085,189.48662 249.27437,189.48662 C 246.33577,189.48662 246.64289,192.66571 246.64289,194.75008 L 246.64289,196.2542 L 250.5738,196.2542 L 250.5738,198.10004 L 246.64289,198.10004 L 246.64289,213.69036 L 244.48917,213.69036 L 244.48917,198.10004" />
      <path d="M 267.7012,203.74196 C 267.7012,200.69899 266.47071,197.69104 263.25875,197.69104 C 260.07727,197.69104 258.12866,200.87028 258.12866,203.74196 L 267.7012,203.74196 z M 268.76235,213.14325 C 267.25849,213.75974 265.30987,214.10013 263.70105,214.10013 C 257.92395,214.10013 255.77041,210.20244 255.77041,204.97208 C 255.77041,199.63965 258.71119,195.84444 263.1207,195.84444 C 268.04386,195.84444 270.06141,199.81109 270.06141,204.49405 L 270.06141,205.58841 L 258.12866,205.58841 C 258.12866,209.28116 260.11272,212.25577 263.87249,212.25577 C 265.44515,212.25577 267.73687,211.60604 268.76235,210.95647 L 268.76235,213.14325" />
      <path d="M 283.32475,212.25577 C 287.15332,212.25577 288.48596,208.15116 288.48596,204.97208 C 288.48596,201.79335 287.15332,197.69104 283.32475,197.69104 C 279.22259,197.69104 278.16144,201.58872 278.16144,204.97208 C 278.16144,208.35814 279.22259,212.25577 283.32475,212.25577 z M 290.64133,213.69036 L 288.48596,213.69036 L 288.48596,210.92089 L 288.41894,210.92089 C 287.25533,213.14325 285.47802,214.10013 282.98227,214.10013 C 278.19698,214.10013 275.80329,210.13541 275.80329,204.97208 C 275.80329,199.67345 277.85432,195.84444 282.98227,195.84444 C 286.40153,195.84444 288.11004,198.34076 288.41894,199.19501 L 288.48596,199.19501 L 288.48596,188.04948 L 290.64133,188.04948 L 290.64133,213.69036" />
      <path d="M 309.13477,203.74196 C 309.13477,200.69899 307.90464,197.69104 304.69213,197.69104 C 301.51107,197.69104 299.56209,200.87028 299.56209,203.74196 L 309.13477,203.74196 z M 310.19578,213.14325 C 308.69192,213.75974 306.74331,214.10013 305.13498,214.10013 C 299.35757,214.10013 297.20388,210.20244 297.20388,204.97208 C 297.20388,199.63965 300.14521,195.84444 304.55413,195.84444 C 309.47729,195.84444 311.49516,199.81109 311.49516,204.49405 L 311.49516,205.58841 L 299.56209,205.58841 C 299.56209,209.28116 301.54674,212.25577 305.30642,212.25577 C 306.87903,212.25577 309.1703,211.60604 310.19578,210.95647 L 310.19578,213.14325" />
      <path d="M 318.26456,200.15132 C 318.26456,198.23825 318.26456,197.5197 318.12879,196.2542 L 320.28247,196.2542 L 320.28247,199.60417 L 320.34899,199.60417 C 321.13673,197.65775 322.60696,195.84444 324.82939,195.84444 C 325.34099,195.84444 325.95746,195.94701 326.33329,196.04952 L 326.33329,198.30753 C 325.88821,198.16948 325.30773,198.10004 324.76064,198.10004 C 321.34129,198.10004 320.41824,201.9313 320.41824,205.07454 L 320.41824,213.69036 L 318.26456,213.69036 L 318.26456,200.15132" />
      <path d="M 342.12819,204.90321 L 341.51176,204.90321 C 337.78579,204.90321 333.34093,205.28126 333.34093,209.10987 C 333.34093,211.39932 334.98251,212.25577 336.96484,212.25577 C 342.02336,212.25577 342.12819,207.84407 342.12819,205.96438 L 342.12819,204.90321 z M 342.33271,210.8875 L 342.26392,210.8875 C 341.30719,212.97197 338.88019,214.10013 336.72474,214.10013 C 331.76818,214.10013 330.98281,210.74955 330.98281,209.17685 C 330.98281,203.33265 337.20494,203.0589 341.71678,203.0589 L 342.12819,203.0589 L 342.12819,202.16922 C 342.12819,199.19501 341.06704,197.69104 338.16176,197.69104 C 336.34841,197.69104 334.6399,198.10004 333.03385,199.12579 L 333.03385,197.04142 C 334.36653,196.39154 336.62227,195.84444 338.16176,195.84444 C 342.46857,195.84444 344.28138,197.79351 344.28138,202.34045 L 344.28138,210.03325 C 344.28138,211.43475 344.28138,212.49353 344.45263,213.69036 L 342.33271,213.69036 L 342.33271,210.8875" />
      <path d="M 350.46847,211.87995 L 360.96416,198.10004 L 350.87764,198.10004 L 350.87764,196.2542 L 363.45776,196.2542 L 363.45776,198.10004 L 352.96426,211.84391 L 363.45776,211.84391 L 363.45776,213.69036 L 350.46847,213.69036 L 350.46847,211.87995" />
      <path d="M 369.92045,196.2542 L 372.07404,196.2542 L 372.07404,213.69036 L 369.92045,213.69036 L 369.92045,196.2542 z M 372.07404,191.60459 L 369.92045,191.60459 L 369.92045,188.73484 L 372.07404,188.73484 L 372.07404,191.60459" />
      <path d="M 393.78176,209.5883 C 393.78176,210.92089 393.78176,212.289 393.91977,213.69036 L 391.83314,213.69036 L 391.83314,210.5805 L 391.76622,210.5805 C 391.04773,212.15106 389.74826,214.10013 386.12439,214.10013 C 381.81762,214.10013 380.17612,211.23023 380.17612,207.39958 L 380.17612,196.2542 L 382.32922,196.2542 L 382.32922,206.85187 C 382.32922,210.13541 383.49287,212.25577 386.46701,212.25577 C 390.398,212.25577 391.62812,208.80094 391.62812,205.89546 L 391.62812,196.2542 L 393.78176,196.2542 L 393.78176,209.5883" />
      <path d="M 401.8505,200.3586 C 401.8505,199.02373 401.8505,197.65775 401.71463,196.2542 L 403.79907,196.2542 L 403.79907,199.3663 L 403.86836,199.3663 C 404.58457,197.79351 405.88345,195.84444 409.50778,195.84444 C 413.81696,195.84444 415.45618,198.71668 415.45618,202.54503 L 415.45618,213.69036 L 413.303,213.69036 L 413.303,203.09213 C 413.303,199.81109 412.14167,197.69104 409.16744,197.69104 C 405.23422,197.69104 404.00368,201.14363 404.00368,204.04895 L 404.00368,213.69036 L 401.8505,213.69036 L 401.8505,200.3586" />
      <path d="M 434.02065,211.16084 C 435.32007,211.81072 436.89272,212.25577 438.56802,212.25577 C 440.6191,212.25577 442.42976,211.12541 442.42976,209.14351 C 442.42976,205.00792 434.0544,205.65723 434.0544,200.59637 C 434.0544,197.14389 436.85718,195.84444 439.72936,195.84444 C 440.65236,195.84444 442.49901,196.04952 444.03613,196.63226 L 443.83161,198.512 C 442.70353,197.99814 441.16638,197.69104 439.96946,197.69104 C 437.74698,197.69104 436.20754,198.37395 436.20754,200.59637 C 436.20754,203.84443 444.78787,203.43487 444.78787,209.14351 C 444.78787,212.83611 441.33536,214.10013 438.70384,214.10013 C 437.02859,214.10013 435.35329,213.89504 433.81608,213.28131 L 434.02065,211.16084" />
      <path d="M 457.37027,213.69036 L 454.84131,213.69036 L 448.92566,196.2542 L 451.28619,196.2542 L 456.10688,211.33229 L 456.1734,211.33229 L 461.23474,196.2542 L 463.49048,196.2542 L 457.37027,213.69036" />
      <path d="M 469.16543,196.2542 L 471.31907,196.2542 L 471.31907,213.69036 L 469.16543,213.69036 L 469.16543,196.2542 z M 471.31907,191.60459 L 469.16543,191.60459 L 469.16543,188.73484 L 471.31907,188.73484 L 471.31907,191.60459" />
      <path d="M 477.81465,211.87995 L 488.31038,198.10004 L 478.2241,198.10004 L 478.2241,196.2542 L 490.80422,196.2542 L 490.80422,198.10004 L 480.31081,211.84391 L 490.80422,211.84391 L 490.80422,213.69036 L 477.81465,213.69036 L 477.81465,211.87995" />
      <path d="M 497.26659,200.15132 C 497.26659,198.23825 497.26659,197.5197 497.12991,196.2542 L 499.28491,196.2542 L 499.28491,199.60417 L 499.35325,199.60417 C 500.13689,197.65775 501.60848,195.84444 503.83178,195.84444 C 504.34206,195.84444 504.95717,195.94701 505.33528,196.04952 L 505.33528,198.30753 C 504.88883,198.16948 504.31022,198.10004 503.76344,198.10004 C 500.34191,198.10004 499.42159,201.9313 499.42159,205.07454 L 499.42159,213.69036 L 497.26659,213.69036 L 497.26659,200.15132" />
      <path d="M 521.13105,204.90323 L 520.51598,204.90323 C 516.7891,204.90323 512.34246,205.28129 512.34246,209.10986 C 512.34246,211.39931 513.98263,212.25576 515.9692,212.25576 C 521.02626,212.25576 521.13105,207.84406 521.13105,205.96438 L 521.13105,204.90323 z M 521.33602,210.88749 L 521.26773,210.88749 C 520.31096,212.97197 517.88264,214.10013 515.72764,214.10013 C 510.77067,214.10013 509.98699,210.74958 509.98699,209.17688 C 509.98699,203.33267 516.20597,203.0589 520.71649,203.0589 L 521.13105,203.0589 L 521.13105,202.1692 C 521.13105,199.19502 520.06944,197.69103 517.16269,197.69103 C 515.34944,197.69103 513.64093,198.10007 512.03716,199.12577 L 512.03716,197.04143 C 513.36756,196.39156 515.6228,195.84442 517.16269,195.84442 C 521.4727,195.84442 523.28149,197.7935 523.28149,202.34046 L 523.28149,210.03323 C 523.28149,211.43476 523.28149,212.49354 523.45467,213.69036 L 521.33602,213.69036 L 521.33602,210.88749" />
      <path
        d="M 135.51619,47.31729 C 135.51619,47.31729 117.4343,39.397628 87.161694,39.397628 L 87.152536,39.397628 C 56.879701,39.397628 38.79348,47.31729 38.79348,47.31729 C 38.79348,47.31729 37.174083,82.381842 44.03916,102.20801 C 56.163493,137.06804 87.14839,146.86069 87.14839,146.86069 L 87.157138,146.86069 L 87.166159,146.86069 C 87.166159,146.86069 118.14632,137.06804 130.27498,102.20801 C 137.13987,82.381842 135.51619,47.31729 135.51619,47.31729"
        id="path3133"
        style="fill:#ff0000;fill-opacity:1;fill-rule:nonzero;stroke:none"
      />
      <path
        style="fill:#ffffff;"
        id="path3135"
        d="M 119.29394,77.54553 L 119.29394,96.86413 L 96.75442,96.86413 L 96.75442,119.40433 L 77.435244,119.40433 L 77.435244,96.86413 L 54.895457,96.86413 L 54.895457,77.54553 L 77.435244,77.54553 L 77.435244,55.01008 L 96.749864,55.01008 L 96.75442,77.54553 L 119.29394,77.54553"
      />
    </svg>
    """
  end

  # define classes to apply to the logos
  @logo_classes "h-[3rem] max-h-[3rem] max-w-[90px] w-fit"

  # we need to define a function that returns the logo classes so we can use them in the template
  defp logo_classes, do: @logo_classes
end
