export const TEACHER_USER_STORY = 'teacher-story';
export const RESEARCHER_USER_STORY = 'researcher-story';

export const EN_CAPSULES = [
  {
    title: 'Understanding the climatic greenhouse effect',
    imageSrc: '/capsules/climate.webp',
    url: 'https://graasp.org/player/86281673-76cf-4af0-a09d-86c287ed0e6b/86281673-76cf-4af0-a09d-86c287ed0e6b?fullscreen=false',
  },
  {
    title: 'ESLint Lesson',
    imageSrc: '/capsules/eslint.webp',
    url: 'https://graasp.org/player/0e56d2fb-4344-4be5-95e6-531548158b14/0e56d2fb-4344-4be5-95e6-531548158b14?fullscreen:false',
  },

  {
    title: "The Hitchhiker's Guide to OERs",
    imageSrc: '/capsules/hitchhiker_oer.webp',
    url: 'https://graasp.org/player/e7cf4d11-f830-47a7-b281-b81f59726c49/e7cf4d11-f830-47a7-b281-b81f59726c49?fullscreen:false',
  },
  {
    title: 'Newtonian mechanics',
    imageSrc: '/capsules/newtonian_mechanics.webp',
    url: 'https://graasp.org/player/757861bf-944b-42f3-8f89-a1fa10cad61b/757861bf-944b-42f3-8f89-a1fa10cad61b?fullscreen=false',
  },
  {
    title: 'Towards a global climate model',
    imageSrc: '/capsules/globaleffect.webp',
    url: 'https://graasp.org/player/5fc87751-e6e7-4aaf-9611-7571e9e37f8c/5fc87751-e6e7-4aaf-9611-7571e9e37f8c?fullscreen:false',
  },
  {
    title: 'Sustainable Development Goals (SDGs)',
    imageSrc: '/capsules/sdg.webp',
    url: 'https://graasp.org/player/08a475c9-ed96-41d5-a6ce-6aa6170fc4cd/08a475c9-ed96-41d5-a6ce-6aa6170fc4cd?fullscreen=false',
  },
];

export const FR_CAPSULES = [
  {
    title: 'Préparation à la dissection du coeur',
    imageSrc: '/capsules/coeur.webp',
    url: 'https://graasp.org/player/0604830c-6241-4fc0-8337-c64390d8b2c3/fbc0e22d-c972-461e-bf40-ec83d3ce4e9f?fullscreen:false',
  },
  {
    title: "GLOBE : utiliser des mesures prises dans l'environnement",
    imageSrc: '/capsules/Globe_logo.webp',
    url: 'https://graasp.org/player/95b4e981-56d0-42b2-9672-13c546c79aa1/95b4e981-56d0-42b2-9672-13c546c79aa1?fullscreen:false',
  },
  {
    title: 'Virus SARS-CoV-2',
    imageSrc: '/capsules/covid.webp',
    url: 'https://graasp.org/player/8bea12d8-061d-4c00-807d-6501e2778312/8bea12d8-061d-4c00-807d-6501e2778312?fullscreen=false',
  },
  {
    title: "Comprendre l'effet de serre climatique",
    imageSrc: '/capsules/climate.webp',
    url: 'https://graasp.org/player/7336b9f7-e161-4990-9d74-0bdb0f04409e/4baf6561-c264-45d8-89ea-b855537656b7?fullscreen=false',
  },
  {
    title: 'Scrabble des formes irrégulières du présent',
    imageSrc: '/capsules/scrabble.webp',
    url: 'https://graasp.org/player/e14d82a9-2824-45ad-876c-1ac317319820/e14d82a9-2824-45ad-876c-1ac317319820?fullscreen=false',
  },
  {
    title: 'Séquence du corps humain en bilingue',
    imageSrc: '/capsules/corps.webp',
    url: 'https://graasp.org/player/4a185298-3c1e-44f6-918f-378568499643/4a185298-3c1e-44f6-918f-378568499643?fullscreen=false',
  },
];

const LANG_TO_CAPSULES: { [key: string]: typeof EN_CAPSULES } = {
  en: EN_CAPSULES,
  fr: FR_CAPSULES,
};

export const getCapsulesByLang = (lang: string) => {
  return LANG_TO_CAPSULES[lang] || EN_CAPSULES;
};
