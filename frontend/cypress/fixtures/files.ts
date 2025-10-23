import {
  FileItemType,
  ItemType,
  MimeTypes,
  PackedFileItemFactory,
  PermissionLevel,
  buildFileExtra,
} from '@graasp/sdk';

import { MOCK_IMAGE_URL, MOCK_PDF_URL, MOCK_VIDEO_URL } from './fileLinks';
import { CURRENT_MEMBER } from './members';

export const ICON_FILEPATH = 'files/icon.png';
export const TEXT_FILEPATH = 'files/sometext.txt';

export const IMAGE_ITEM_DEFAULT: FileItemType & { readFilepath: string } = {
  id: 'bd5519a2-5ba9-4305-b221-185facbe6a99',
  name: 'icon.png',
  description: 'a default image description',
  type: ItemType.FILE,
  path: 'bd5519a2_5ba9_4305_b221_185facbe6a99',
  creator: CURRENT_MEMBER,
  createdAt: '2021-03-16T16:00:50.968Z',
  updatedAt: '2021-03-16T16:00:52.655Z',
  extra: buildFileExtra({
    name: 'icon.png',
    path: '9a95/e2e1/2a7b-1615910428274',
    size: 32439,
    mimetype: MimeTypes.Image.PNG,
    content: '',
  }),
  // for testing
  readFilepath: MOCK_IMAGE_URL,
  settings: {
    isPinned: false,
    showChatbox: false,
  },
  lang: 'en',
};

export const VIDEO_ITEM_DEFAULT: FileItemType & { readFilepath: string } = {
  id: 'qd5519a2-5ba9-4305-b221-185facbe6a99',
  name: 'video.mp4',
  description: 'a default video description',
  type: ItemType.FILE,
  path: 'qd5519a2_5ba9_4305_b221_185facbe6a99',
  creator: CURRENT_MEMBER,
  createdAt: '2021-03-16T16:00:50.968Z',
  updatedAt: '2021-03-16T16:00:52.655Z',
  extra: buildFileExtra({
    name: 'video.mp4',
    path: '9a95/e2e1/2a7b-1615910428274',
    size: 52345,
    mimetype: MimeTypes.Video.MP4,
    content: '',
  }),
  // for testing
  readFilepath: MOCK_VIDEO_URL,
  settings: {
    isPinned: false,
    showChatbox: false,
  },
  lang: 'en',
};

export const PDF_ITEM_DEFAULT: FileItemType & { readFilepath: string } = {
  id: 'cd5519a2-5ba9-4305-b221-185facbe6a99',
  name: 'doc.pdf',
  description: 'a default pdf description',
  type: ItemType.FILE,
  path: 'cd5519a2_5ba9_4305_b221_185facbe6a99',
  creator: CURRENT_MEMBER,
  createdAt: '2021-03-16T16:00:50.968Z',
  updatedAt: '2021-03-16T16:00:52.655Z',
  extra: buildFileExtra({
    name: 'doc.pdf',
    path: '9a95/e2e1/2a7b-1615910428274',
    size: 54321,
    mimetype: MimeTypes.PDF,
    content: '',
  }),
  // for testing
  readFilepath: MOCK_PDF_URL,
  settings: {
    isPinned: false,
    showChatbox: false,
  },
  lang: 'en',
};

export const IMAGE_ITEM_S3 = PackedFileItemFactory(
  {
    id: 'ad5519a2-5ba9-4305-b221-185facbe6a99',
    name: 'icon.png',
    description: 'a default image description',
    type: ItemType.FILE,
    creator: CURRENT_MEMBER,
    extra: buildFileExtra({
      name: 'mock-image',
      path: MOCK_IMAGE_URL, // for testing
      size: 32439,
      mimetype: MimeTypes.Image.PNG,
      content: '',
    }),
    settings: {
      isPinned: false,
      showChatbox: false,
    },
  },
  {
    permission: PermissionLevel.Admin,
  },
);

export const VIDEO_ITEM_S3 = PackedFileItemFactory(
  {
    id: 'fd5519a2-5ba9-4305-b221-185facbe6a93',
    name: 'video.mp4',
    description: 'a default video description',
    type: ItemType.FILE,
    creator: CURRENT_MEMBER,
    createdAt: '2021-03-16T16:00:50.968Z',
    updatedAt: '2021-03-16T16:00:52.655Z',
    extra: buildFileExtra({
      name: 'mock-video',
      path: MOCK_VIDEO_URL, // for testing
      size: 52345,
      mimetype: MimeTypes.Video.MP4,
      content: '',
    }),
    settings: {
      isPinned: false,
      showChatbox: false,
    },
  },
  { permission: PermissionLevel.Admin },
);

export const PDF_ITEM_S3 = PackedFileItemFactory(
  {
    id: 'bd5519a2-5ba9-4305-b221-185facbe6a99',
    name: 'doc.pdf',
    description: 'a default pdf description',
    creator: CURRENT_MEMBER,
    extra: buildFileExtra({
      name: 'mock-pdf',
      path: MOCK_PDF_URL, // for testing
      size: 54321,
      mimetype: MimeTypes.PDF,
      content: '',
    }),
    settings: {
      isPinned: false,
      showChatbox: false,
    },
  },
  { permission: PermissionLevel.Admin },
);
