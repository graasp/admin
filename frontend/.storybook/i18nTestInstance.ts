import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import account from '../src/locales/en/account.json';
import auth from '../src/locales/en/auth.json';
import builder from '../src/locales/en/builder.json';
import chatbox from '../src/locales/en/chatbox.json';
import common from '../src/locales/en/common.json';
import landing from '../src/locales/en/landing.json';
import map from '../src/locales/en/map.json';
import messages from '../src/locales/en/messages.json';
import pageEditor from '../src/locales/en/pageEditor.json';
import player from '../src/locales/en/player.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: [
    'auth',
    'account',
    'landing',
    'messages',
    'player',
    'map',
    'builder',
    'chatbox',
    'pageEditor',
  ],
  defaultNS: 'translationsNS',

  // debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: {
    en: {
      landing,
      auth,
      account,
      messages,
      common,
      player,
      map,
      builder,
      chatbox,
      pageEditor,
    },
  },
});

export default i18n;
