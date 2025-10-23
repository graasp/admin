import { EmailFrequency } from '@graasp/sdk';

export const DEFAULT_LANG = 'en';

export const DEFAULT_EMAIL_FREQUENCY = EmailFrequency.Always;

export const emailFrequency = {
  [EmailFrequency.Always]: 'ALWAYS_RECEIVE_EMAILS',
  // daily: 'Receive email notifications once per day',
  [EmailFrequency.Never]: 'DISABLE_EMAILS',
} as const;

export const AVATAR_SIZE = 128;

export const ADMIN_CONTACT = 'admin@graasp.org';
export const PRIVACY_EMAIL = 'privacy@graasp.org';
/**
 * Email used when requesting help for account procedures
 */
export const HELP_EMAIL = 'help@graasp.org';

export const GRAASP_BLOG_URL = 'https://graasp.github.io/docs/blog';

export const NS = {
  Account: 'account',
  Analytics: 'analytics',
  Auth: 'auth',
  Builder: 'builder',
  Chatbox: 'chatbox',
  Common: 'common',
  Enums: 'enums',
  Home: 'home',
  Landing: 'landing',
  Map: 'map',
  Messages: 'messages',
  Player: 'player',
  PageEditor: 'pageEditor',
} as const;

export const DEFAULT_LINK_SHOW_BUTTON = true;
export const DEFAULT_LINK_SHOW_IFRAME = false;

export const ITEM_NAME_MAX_LENGTH = 15;
export const MAX_DESCRIPTION_LENGTH = 5000;
