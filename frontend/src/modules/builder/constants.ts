export const SETTINGS = {
  ITEM_LOGIN: {
    name: 'item-login',
    SIGN_IN_MODE: {
      PSEUDONYM: 'pseudonym',
      MEMBER_ID: 'memberId',
      USERNAME_AND_PASSWORD: 'username+password',
    },
  },
  ITEM_PUBLIC: {
    name: 'public-item',
  },
  ITEM_HIDDEN: {
    name: 'hidden',
  },
  // this tag doesn't exist but is used if none of the visiblity tag is set
  ITEM_PRIVATE: {
    name: 'private-item',
  },
};

export const SHORT_LINK_COLOR = 'black';
export const SHORT_LINK_CONTAINER_BORDER_WIDTH = 1;
export const SHORT_LINK_CONTAINER_BORDER_STYLE = 'dotted';

export const CC_LICENSE_ABOUT_URL =
  'https://creativecommons.org/about/cclicenses/';

export const DISPLAY_CO_EDITORS_OPTIONS = {
  YES: {
    value: true,
    label: 'Yes',
  },
  NO: {
    value: false,
    label: 'No',
  },
};

export const TAGS_DOCUMENTATION =
  'https://graasp.github.io/docs/user/library/tags/';

// todo: to remove once we dynamically compute how many items we display
export const ITEM_PAGE_SIZE = 12;
export const DIALOG_CONTENT_WIDTH = { xs: '300px', sm: '500px' };
