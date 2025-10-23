// import the original type declarations
import 'i18next';

import account from '../locales/en/account.json';
import analytics from '../locales/en/analytics.json';
import auth from '../locales/en/auth.json';
import builder from '../locales/en/builder.json';
import chatbox from '../locales/en/chatbox.json';
import common from '../locales/en/common.json';
import enums from '../locales/en/enums.json';
import home from '../locales/en/home.json';
import landing from '../locales/en/landing.json';
import map from '../locales/en/map.json';
import messages from '../locales/en/messages.json';
import pageEditor from '../locales/en/pageEditor.json';
import player from '../locales/en/player.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      account: typeof account;
      analytics: typeof analytics;
      auth: typeof auth;
      builder: typeof builder;
      chatbox: typeof chatbox;
      common: typeof common;
      enums: typeof enums;
      home: typeof home;
      landing: typeof landing;
      map: typeof map;
      messages: typeof messages;
      player: typeof player;
      pageEditor: typeof pageEditor;
    };
  }
}
export type MessageKeys = typeof messages;
export type BuilderKeys = keyof typeof builder;
