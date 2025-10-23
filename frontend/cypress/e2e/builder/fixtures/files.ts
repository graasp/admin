import {
  FileItemFactory,
  ItemType,
  MaxWidth,
  MimeTypes,
  PackedFileItemFactory,
  buildFileExtra,
} from '@graasp/sdk';

import { InternalItemType } from '../../../../src/modules/builder/types';
import { CURRENT_MEMBER } from '../../../fixtures/members';
import { FileItemForTest } from '../../../support/types';
import { MOCK_IMAGE_URL, MOCK_PDF_URL, MOCK_VIDEO_URL } from './fileLinks';

export const ICON_FILEPATH = 'files/icon.png';
export const VIDEO_FILEPATH = 'files/video.mp4';
export const TEXT_FILEPATH = 'files/sometext.txt';

export const IMAGE_ITEM_DEFAULT: FileItemForTest = {
  ...PackedFileItemFactory({
    id: 'bd5519a2-5ba9-4305-b221-185facbe6a99',
    name: 'icon.png',
    description: 'a default image description',
    type: ItemType.FILE,
    path: 'bd5519a2_5ba9_4305_b221_185facbe6a99',
    creator: CURRENT_MEMBER,
    createdAt: '2021-03-16T16:00:50.968Z',
    updatedAt: '2021-03-16T16:00:52.655Z',
    settings: {},
    extra: buildFileExtra({
      name: 'icon.png',
      path: '9a95/e2e1/2a7b-1615910428274',
      size: 32439,
      mimetype: 'image/png',
      altText: 'myAltText',
      content: '',
    }),
  }),
  // for testing: creating needs a fixture, reading needs an url
  createFilepath: ICON_FILEPATH,
  readFilepath: MOCK_IMAGE_URL,
};

export const IMAGE_ITEM_DEFAULT_WITH_MAX_WIDTH: FileItemForTest = {
  ...FileItemFactory({
    id: 'bd5519a2-5ba9-4305-b221-185facbe6a29',
    name: 'icon.png',
    description: 'a default image description',
    type: ItemType.FILE,
    path: 'bd5519a2_5ba9_4305_b221_185facbe6a29',
    creator: CURRENT_MEMBER,
    createdAt: '2021-03-16T16:00:50.968Z',
    updatedAt: '2021-03-16T16:00:52.655Z',
    settings: {
      maxWidth: MaxWidth.Medium,
    },
    extra: buildFileExtra({
      name: 'icon.png',
      path: '9a95/e2e1/2a7b-1615910428274',
      size: 32439,
      mimetype: 'image/png',
      altText: 'myAltText',
      content: '',
    }),
  }),
  // for testing: creating needs a fixture, reading needs an url
  createFilepath: ICON_FILEPATH,
  readFilepath: MOCK_IMAGE_URL,
};

export const VIDEO_ITEM_DEFAULT: FileItemForTest = {
  ...PackedFileItemFactory({
    id: 'qd5519a2-5ba9-4305-b221-185facbe6a99',
    name: 'video.mp4',
    description: 'a default video description',
    type: ItemType.FILE,
    path: 'qd5519a2_5ba9_4305_b221_185facbe6a99',
    creator: CURRENT_MEMBER,
    createdAt: '2021-03-16T16:00:50.968Z',
    updatedAt: '2021-03-16T16:00:52.655Z',
    settings: {},
    extra: buildFileExtra({
      name: 'video.mp4',
      path: '9a95/e2e1/2a7b-1615910428274',
      size: 52345,
      mimetype: MimeTypes.Video.MP4,
      altText: 'myAltText',
      content: '',
    }),
  }),
  // for testing: creating needs a fixture, reading needs an url
  createFilepath: VIDEO_FILEPATH,
  readFilepath: MOCK_VIDEO_URL,
};

export const PDF_ITEM_DEFAULT: FileItemForTest = {
  ...PackedFileItemFactory({
    id: 'cd5519a2-5ba9-4305-b221-185facbe6a99',
    name: 'doc.pdf',
    description: 'a default pdf description',
    type: ItemType.FILE,
    path: 'cd5519a2_5ba9_4305_b221_185facbe6a99',
    creator: CURRENT_MEMBER,
    createdAt: '2021-03-16T16:00:50.968Z',
    updatedAt: '2021-03-16T16:00:52.655Z',
    settings: {},
    extra: buildFileExtra({
      name: 'doc.pdf',
      path: '9a95/e2e1/2a7b-1615910428274',
      size: 54321,
      mimetype: MimeTypes.PDF,
      altText: 'myAltText',
      content: '',
    }),
  }),
  // for testing: creating needs a fixture, reading needs an url
  createFilepath: ICON_FILEPATH,
  readFilepath: MOCK_PDF_URL,
};
export type ZIPInternalItem = {
  type: typeof InternalItemType.ZIP;
  filepath: string;
};
export const ZIP_DEFAULT: ZIPInternalItem = {
  type: InternalItemType.ZIP,
  filepath: 'files/graasp.zip',
};
