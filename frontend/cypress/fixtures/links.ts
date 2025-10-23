import {
  ItemType,
  LinkItemType,
  PackedLinkItemFactory,
  PermissionLevel,
  buildLinkExtra,
} from '@graasp/sdk';

import { CURRENT_MEMBER } from './members';

export const GRAASP_LINK_ITEM = PackedLinkItemFactory(
  {
    id: 'ecafbd2a-5688-11eb-ae91-0242ac130002',
    name: 'graasp link',
    description: 'a description for graasp link',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    creator: CURRENT_MEMBER,
    extra: buildLinkExtra({
      url: 'https://graasp.eu',
      thumbnails: ['https://graasp.eu/img/epfl/logo-tile.png'],
      icons: [
        'https://graasp.eu/cdn/img/epfl/favicons/favicon-32x32.png?v=yyxJ380oWY',
      ],
      html: '',
    }),
    settings: {
      isPinned: false,
      showChatbox: false,
      showLinkIframe: true,
    },
  },
  { permission: PermissionLevel.Admin },
);

export const GRAASP_LINK_ITEM_IFRAME_ONLY: LinkItemType = {
  ...GRAASP_LINK_ITEM,
  id: 'ecafbd2a-5688-11eb-ae91-0242ac130122',
  settings: {
    showLinkIframe: true,
    showLinkButton: false,
  },
};

export const YOUTUBE_LINK_ITEM: LinkItemType = PackedLinkItemFactory(
  {
    id: 'gcafbd2a-5688-11eb-ae93-0242ac130002',
    type: ItemType.LINK,
    name: 'graasp youtube link',
    description: 'a description for graasp youtube link',
    creator: CURRENT_MEMBER,
    path: 'gcafbd2a_5688_11eb_ae93_0242ac130002',
    extra: buildLinkExtra({
      url: 'https://www.youtube.com/watch?v=FmiEgBMTPLo',
      html: '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.5%;"><iframe src="https://www.youtube.com/embed/FmiEgBMTPLo?feature=oembed" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture"></iframe></div>',
      thumbnails: ['https://i.ytimg.com/vi/FmiEgBMTPLo/maxresdefault.jpg'],
      icons: ['https://www.youtube.com/s/desktop/f0ff6c1d/img/favicon_96.png'],
    }),
    settings: {
      showLinkIframe: true,
      isPinned: false,
      showChatbox: false,
    },
  },
  { permission: PermissionLevel.Admin },
);
