import {
  Account,
  AccountFactory,
  AccountType,
  App,
  ChatMention,
  FolderItemFactory,
  HttpMethod,
  Invitation,
  ItemGeolocation,
  ItemLike,
  ItemLoginSchema,
  ItemLoginSchemaStatus,
  ItemLoginSchemaType,
  ItemMembership,
  ItemPublished,
  ItemValidationGroup,
  ItemValidationProcess,
  ItemValidationStatus,
  ItemVisibility,
  MemberFactory,
  MentionStatus,
  PackedFolderItemFactory,
  PermissionLevel,
  RecycledItemData,
  UUID,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';

import { ChatMessageRaw, Profile } from '@/openapi/client';

type MockFastifyError = {
  name: string;
  code: string;
  message: string;
  statusCode: number;
  origin: string;
};

export const UNAUTHORIZED_RESPONSE: MockFastifyError = {
  name: 'unauthorized',
  code: 'ERRCODE',
  message: 'unauthorized error message',
  statusCode: StatusCodes.UNAUTHORIZED,
  origin: 'plugin',
};
export const BAD_REQUEST_RESPONSE: MockFastifyError = {
  name: 'Bad Request',
  code: 'ERRCODE',
  message: 'Bad request error message',
  statusCode: StatusCodes.BAD_REQUEST,
  origin: 'plugin',
};
export const FILE_NOT_FOUND_RESPONSE: MockFastifyError = {
  name: 'unauthorized',
  code: 'GPFERR006',
  message: 'LOCAL_FILE_NOT_FOUND',
  statusCode: StatusCodes.NOT_FOUND,
  origin: 'graasp-plugin-file',
};

export const generateFolders = (
  nb: number = 5,
): ReturnType<typeof PackedFolderItemFactory>[] =>
  Array.from({ length: nb }, () => PackedFolderItemFactory());

export const RECYCLED_ITEM_DATA: RecycledItemData[] = [
  {
    id: `recycle-item-id`,
    item: FolderItemFactory(),
    creator: MemberFactory(),
    createdAt: '2023-09-06T11:50:32.894Z',
  },
  {
    id: `recycle-item-id-1`,
    item: FolderItemFactory(),
    creator: MemberFactory(),
    createdAt: '2023-09-06T11:50:32.894Z',
  },
  {
    id: `recycle-item-id-2`,
    item: FolderItemFactory(),
    creator: MemberFactory(),
    createdAt: '2023-09-06T11:50:32.894Z',
  },
];

export const OK_RESPONSE = {};

export const createMockMembership = (
  membership?: Partial<ItemMembership>,
): ItemMembership => ({
  id: membership?.id ?? v4(),
  account: { ...AccountFactory(), type: AccountType.Guest },
  item: FolderItemFactory(),
  permission: PermissionLevel.Read,
  createdAt: '2023-04-26T08:46:34.812Z',
  updatedAt: '2023-04-26T08:46:34.812Z',
  creator: AccountFactory(),
  ...membership,
});

const MEMBERSHIP_1: ItemMembership = createMockMembership({
  id: 'membership-id',
  account: { ...AccountFactory(), type: AccountType.Guest },
  permission: PermissionLevel.Read,
});

const MEMBERSHIP_2: ItemMembership = createMockMembership({
  id: 'membership-id1',
  account: { ...AccountFactory(), type: AccountType.Guest },
  permission: PermissionLevel.Admin,
});

export const ITEM_MEMBERSHIPS_RESPONSE: ItemMembership[] = [
  MEMBERSHIP_1,
  MEMBERSHIP_2,
];

export const ITEM_LOGIN_RESPONSE: ItemLoginSchema = {
  type: ItemLoginSchemaType.Username,
  item: FolderItemFactory(),
  createdAt: '2023-09-06T11:50:32.894Z',
  updatedAt: '2023-09-06T11:50:32.894Z',
  id: 'login-schema-id',
  status: ItemLoginSchemaStatus.Active,
};

export const THUMBNAIL_URL_RESPONSE = 'some-thumbnail-url';
export const AVATAR_URL_RESPONSE = 'some-avatar-url';

export const buildMentionResponse = (
  mention: ChatMention,
  method: HttpMethod,
  status?: MentionStatus,
): ChatMention => {
  switch (method) {
    case HttpMethod.Patch:
      return {
        ...mention,
        status: status || mention.status,
      };
    case HttpMethod.Delete:
      return mention;
    default:
      return mention;
  }
};

const defaultAppValues: App = {
  name: 'Code App',
  url: 'http://codeapp.com',
  description: 'description',
  id: 'app-id',
  key: 'key',
  thumbnail: 'http://codeapp.com/logo.png',
  publisher: {
    id: 'publisher-id',
    name: 'publisher name',
    origins: ['origin'],
    createdAt: '2023-09-06T11:50:32.894Z',
    updatedAt: '2023-09-06T11:50:32.894Z',
  },
  createdAt: '2023-09-06T11:50:32.894Z',
  updatedAt: '2023-09-06T11:50:32.894Z',
};

const APP_1: App = {
  ...defaultAppValues,
  name: 'Code App',
  url: 'http://codeapp.com',
  description: 'description',
};

const APP_2: App = {
  ...defaultAppValues,
  name: 'File App',
  description: 'description',
  url: 'http://fileapp.com',
  thumbnail: 'http://fileapp.com/logo.png',
};

export const APPS = [APP_1, APP_2];

export const buildChatMention = ({
  id = v4(),
  account = AccountFactory(),
  status = MentionStatus.Unread,
}: {
  id?: UUID;
  account?: Account;
  status?: MentionStatus;
}): ChatMention => ({
  id,
  account,
  status,
  message: {
    id: 'anotherid',
    itemId: v4(),
    creatorId: v4(),
    createdAt: '2023-09-06T11:50:32.894Z',
    updatedAt: '2023-09-06T11:50:32.894Z',
    body: 'somemessage here',
  },
  createdAt: '2023-09-06T11:50:32.894Z',
  updatedAt: '2023-09-06T11:50:32.894Z',
});

export const buildMemberMentions = (): ChatMention[] => {
  const MEMBER_MENTIONS: ChatMention[] = [
    {
      id: 'someid',
      message: {
        id: 'anotherid',
        itemId: v4(),
        creatorId: v4(),
        createdAt: '2023-09-06T11:50:32.894Z',
        updatedAt: '2023-09-06T11:50:32.894Z',
        body: 'somemessage here',
      },
      createdAt: '2023-09-06T11:50:32.894Z',
      updatedAt: '2023-09-06T11:50:32.894Z',
      account: AccountFactory(),
      status: MentionStatus.Unread,
    },
    {
      id: 'someOtherId',
      message: {
        id: 'anotherid',
        itemId: v4(),
        creatorId: v4(),
        createdAt: '2023-09-06T11:50:32.894Z',
        updatedAt: '2023-09-06T11:50:32.894Z',
        body: 'somemessage here',
      },
      createdAt: '2023-09-06T11:50:32.894Z',
      updatedAt: '2023-09-06T11:50:32.894Z',
      account: AccountFactory(),
      status: MentionStatus.Unread,
    },
  ];
  return MEMBER_MENTIONS;
};

const defaultItemVisibilitiesValues: ItemVisibility = {
  id: 'tag-id',
  itemPath: 'item-path',
  type: 'public',
  createdAt: '2023-09-06T11:50:32.894Z',
  // creator: MemberFactory(),
};
const createMockItemVisibilities = (
  values: Partial<ItemVisibility>,
): ItemVisibility => ({
  ...defaultItemVisibilitiesValues,
  ...values,
});

const ITEM_VISIBILITY_1: ItemVisibility = createMockItemVisibilities({
  id: 'visibility-id',
  itemPath: 'visibility-path',
  type: 'public',
});

const ITEM_VISIBILITY_2: ItemVisibility = createMockItemVisibilities({
  id: 'visibility-id1',
  itemPath: 'visibility-path',
  type: 'public',
});

export const ITEM_VISIBILITIES = [ITEM_VISIBILITY_1, ITEM_VISIBILITY_2];

export const CHAT_MESSAGES: ChatMessageRaw[] = [
  {
    id: v4(),
    itemId: v4(),
    creatorId: v4(),
    createdAt: '2023-09-06T11:50:32.894Z',
    updatedAt: '2023-09-06T11:50:32.894Z',
    body: 'text',
  },
  {
    id: v4(),
    itemId: v4(),
    creatorId: v4(),
    createdAt: '2023-09-06T11:50:32.894Z',
    updatedAt: '2023-09-06T11:50:32.894Z',
    body: 'text of second message',
  },
];
const buildItemLikes = (): ItemLike[] => [
  {
    id: 'id1',
    item: FolderItemFactory(),
    createdAt: '2023-09-06T11:50:32.894Z',
  },
  {
    id: 'id2',
    item: FolderItemFactory(),
    createdAt: '2023-09-06T11:50:32.894Z',
  },
];
export const ITEM_LIKES: ItemLike[] = buildItemLikes();

export const ITEM_VALIDATION_GROUP: ItemValidationGroup = {
  id: 'id-1',
  item: FolderItemFactory(),
  itemValidations: [
    {
      id: 'id-1',
      item: FolderItemFactory(),
      status: ItemValidationStatus.Success,
      process: ItemValidationProcess.BadWordsDetection,
      createdAt: '2023-09-06T11:50:32.894Z',
      result: '',
      itemValidationGroup: { id: 'groupid' } as ItemValidationGroup,
      updatedAt: '2023-09-06T11:50:32.894Z',
    },
  ],
  createdAt: '2023-09-06T11:50:32.894Z',
};

export const MEMBER_PUBLIC_PROFILE = {
  id: v4(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  bio: 'some random bio',
  visibility: true,
  linkedinId: 'user',
  facebookId: 'user',
  twitterId: 'user',
} satisfies Profile;

export const buildInvitation = (values: Partial<Invitation>): Invitation => ({
  id: 'id',
  name: 'member-name',
  email: 'email',
  creator: MemberFactory(),
  permission: PermissionLevel.Read,
  item: FolderItemFactory(),
  createdAt: '2023-09-06T11:50:32.894Z',
  updatedAt: '2023-09-06T11:50:32.894Z',
  ...values,
});

export const buildMockInvitations = (itemId: string) => [
  buildInvitation({
    item: {
      ...FolderItemFactory(),
      path: itemId,
    },
    email: 'a',
  }),
  buildInvitation({
    item: {
      ...FolderItemFactory(),
      path: itemId,
    },
    email: 'b',
  }),
];

export const ITEM_PUBLISHED_DATA: ItemPublished = {
  id: 'item-published-id',
  item: FolderItemFactory(),
  createdAt: '2023-09-06T11:50:32.894Z',
  totalViews: 1,
};

export const ITEM_GEOLOCATION: ItemGeolocation = {
  id: 'item-published-id',
  item: PackedFolderItemFactory(),
  lat: 1,
  lng: 1,
  country: 'DE',
  createdAt: '2023-09-06T11:50:32.894Z',
  updatedAt: '2023-09-06T11:50:32.894Z',
  addressLabel: 'addressLabel',
  helperLabel: 'helperLabel',
};
