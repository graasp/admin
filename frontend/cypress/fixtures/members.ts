import {
  AccountType,
  CompleteMember,
  MemberFactory,
  Password,
} from '@graasp/sdk';

import { type Profile } from '../../src/openapi/client/types.gen';
import { AVATAR_LINK } from './thumbnails/links';

export const MEMBER_PUBLIC_PROFILE: Profile = {
  id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
  bio: 'text',
  twitterId: 'twitter_handle',
  facebookId: 'fb_handle',
  linkedinId: 'linkedin_handle',
  createdAt: '2021-04-13 14:56:34.749946',
  updatedAt: '2021-04-13 14:56:34.749946',
  visibility: false,
};

export const MEMBERS = {
  ANNA: MemberFactory({
    id: 'a44a00d2-7d67-44af-8637-86ca02933aa3',
    name: 'Anna',
    email: 'anna@graasp.org',
    extra: { lang: 'en', emailFreq: 'never' },
  }),
  BOB: {
    ...MemberFactory({
      id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
      name: 'bob',
      type: AccountType.Individual,
      email: 'bob@email.com',
      createdAt: '2021-04-13 14:56:34.749946',
      updatedAt: '2021-04-13 14:56:34.749946',
      extra: { lang: 'en' },
      enableSaveActions: true,
    }),
    // this only exists for test
    thumbnails: AVATAR_LINK,
  },
  CEDRIC: MemberFactory({ name: 'Cedric', email: 'cedric@example.com' }),
  DAVID: MemberFactory({
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130062',
    name: 'david',
    type: AccountType.Individual,
    email: 'david@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    updatedAt: '2021-04-13 14:56:34.749946',
    extra: { lang: 'en' },
  }),
  EVAN: MemberFactory({
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130022',
    name: 'evan',
    type: AccountType.Individual,
    email: 'evan@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    updatedAt: '2021-04-13 14:56:34.749946',
    extra: { lang: 'en' },
  }),
  FANNY: MemberFactory({
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130012',
    name: 'fanny',
    extra: {},
    type: AccountType.Individual,
    email: 'fanny@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    updatedAt: '2021-04-13 14:56:34.749946',
  }),
  GARRY: MemberFactory({
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130412',
    name: 'garry',
    extra: {},
    type: AccountType.Individual,
    email: 'garry@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    updatedAt: '2021-04-13 14:56:34.749946',
    isValidated: false,
  }),
} as const;

export const CURRENT_MEMBER = MEMBERS.ANNA;
export const NOT_VALIDATED_MEMBER = MEMBERS.GARRY;
export const VALIDATED_MEMBER = MEMBERS.ANNA;
export const LEGACY_NOT_VALIDATED_MEMBER = {
  ...NOT_VALIDATED_MEMBER,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  isValidated: undefined,
};

export const AUTH_MEMBERS = {
  GRAASP: {
    id: 'graasp-id',
    name: 'graasp',
    email: 'graasp@graasp.org',
    password: 'aPassword1',
    nameValid: true,
    emailValid: true,
    passwordValid: true,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  GRAASP_OTHER: {
    id: 'graasp_other-id',
    name: 'graasp_other',
    email: 'graasp_other@graasp.org',
    password: 'aPassword2',
    nameValid: true,
    emailValid: true,
    passwordValid: true,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  WRONG_NAME: {
    id: 'id1',
    name: 'w',
    email: 'graasp@graasp.org',
    nameValid: false,
    emailValid: true,
    passwordValid: false,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  INVALID_EMAIL: {
    id: 'id2',
    name: 'graasp',
    email: 'wrong',
    password: 'test',
    nameValid: true,
    emailValid: false,
    passwordValid: true,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  INVALID_PASSWORD: {
    id: 'id3',
    name: 'graasp',
    email: 'graasp@graasp.org',
    password: '',
    nameValid: true,
    emailValid: true,
    passwordValid: false,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  WRONG_PASSWORD: {
    id: 'id3',
    name: 'graasp',
    email: 'graasp@graasp.org',
    password: 'test',
    nameValid: true,
    emailValid: true,
    passwordValid: false,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  BOB: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
    name: 'bob',
    email: 'bob@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    extra: { lang: 'en' },
    type: AccountType.Individual,
    updatedAt: new Date().toISOString(),
    enableSaveActions: true,
    isValidated: true,
  },
  CEDRIC: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130006',
    name: 'cedric',
    email: 'cedric@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    type: AccountType.Individual,
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
} as const satisfies {
  [name: string]: CompleteMember & {
    nameValid?: boolean;
    emailValid?: boolean;
    passwordValid?: boolean;
    password?: Password;
  };
};
