import {
  HttpMethod,
  MemberFactory,
  PackedFolderItemFactory,
  PackedShortcutItemFactory,
} from '@graasp/sdk';

import { formatDistanceToNow } from 'date-fns';
import { StatusCodes } from 'http-status-codes';

import { getLocalForDateFns } from '../../../src/config/langs';
import {
  AVATAR_UPLOAD_ICON_ID,
  AVATAR_UPLOAD_INPUT_ID,
  CROP_MODAL_CONFIRM_BUTTON_ID,
  MEMBER_AVATAR_IMAGE_ID,
  MEMBER_CREATED_AT_ID,
  MEMBER_USERNAME_DISPLAY_ID,
} from '../../../src/config/selectors';
import { API_ROUTES } from '../../../src/query/routes';
import { MEMBERS } from '../../fixtures/members';
import {
  AVATAR_LINK,
  THUMBNAIL_MEDIUM_PATH,
} from '../../fixtures/thumbnails/links';
import { API_HOST } from '../../support/env';
import { MemberForTest } from '../../support/types';
import { ID_FORMAT } from '../../support/utils';

const { buildGetCurrentMemberRoute, buildUploadAvatarRoute } = API_ROUTES;

const targetItem = PackedFolderItemFactory({ name: 'Target' });
const shortcutItem = PackedShortcutItemFactory({
  name: 'Shortcut',
  extra: { shortcut: { target: targetItem.id } },
});

type TestHelperInput = { currentMember: MemberForTest };
class TestHelper {
  private readonly currentMember: MemberForTest;

  constructor(args: TestHelperInput) {
    this.currentMember = structuredClone(args.currentMember);
  }

  setupServer() {
    cy.intercept(
      {
        method: HttpMethod.Get,
        url: `${API_HOST}/${buildGetCurrentMemberRoute()}`,
      },
      ({ reply }) =>
        reply({ statusCode: StatusCodes.OK, body: this.currentMember }),
    ).as('getCurrentMember');
    cy.intercept(
      {
        method: HttpMethod.Get,
        url: new RegExp(
          `${API_HOST}/members/${ID_FORMAT}/avatar/(original|large|medium|small)\\?replyUrl\\=true`,
        ),
      },
      ({ reply }) => {
        if (this.currentMember.extra.hasAvatar) {
          return reply({ body: this.currentMember.thumbnails });
        }
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      },
    ).as('getAvatar');
    cy.intercept(
      {
        method: HttpMethod.Post,
        url: new RegExp(`${buildUploadAvatarRoute()}`),
      },
      ({ reply }) => {
        // update avatar
        this.currentMember.extra.hasAvatar = true;
        // use default avatar link as thumbnail, we discard the uploaded thumbnail
        this.currentMember.thumbnails = AVATAR_LINK;
        return reply({ statusCode: StatusCodes.OK });
      },
    ).as('uploadAvatar');
  }
}

describe('Upload Avatar', () => {
  let helpers: TestHelper;
  beforeEach(() => {
    helpers = new TestHelper({ currentMember: MEMBERS.BOB });
    helpers.setupServer();
    cy.visit('/account/settings');
  });

  it('Upload a new thumbnail', () => {
    // select the avatar image
    cy.get(`#${AVATAR_UPLOAD_INPUT_ID}`).selectFile(
      THUMBNAIL_MEDIUM_PATH,
      // use force because the input is visually hidden
      { force: true },
    );
    cy.get(`#${CROP_MODAL_CONFIRM_BUTTON_ID}`)
      .click()
      .then(() => {
        cy.get(`#${MEMBER_AVATAR_IMAGE_ID}`).should('be.visible');
      });
    cy.wait('@uploadAvatar');
  });
});

describe('Image is not set', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: MEMBERS.BOB });
    cy.visit('/account/settings');
  });

  it('Image is not set', () => {
    cy.wait('@getCurrentMember');
    // uploader icon should be visible
    cy.get(`#${AVATAR_UPLOAD_ICON_ID}`).should('be.visible');
    // image display element should not exist
    cy.get(`#${MEMBER_AVATAR_IMAGE_ID}`).should('not.exist');
  });
});

describe('Check member info', () => {
  const currentMember = {
    ...MemberFactory({
      extra: { lang: 'en', hasAvatar: true },
    }),
    // this only exists for test
    thumbnails: AVATAR_LINK,
  };

  beforeEach(() => {
    cy.setUpApi({
      currentMember,
    });
    cy.visit('/account/settings');
    cy.wait('@getCurrentMember');
  });

  it('displays the correct member info', () => {
    cy.wait('@getCurrentMemberAvatarUrl');
    // displays the correct member avatar
    cy.get(`#${MEMBER_AVATAR_IMAGE_ID}`).should(
      'have.attr',
      'src',
      currentMember.thumbnails,
    );
    // displays the correct member name
    cy.get(`#${MEMBER_USERNAME_DISPLAY_ID}`).should(
      'contain',
      currentMember.name,
    );
    const lang = currentMember.extra.lang ?? 'en';
    // displays the correct creation date
    const formattedDate = formatDistanceToNow(currentMember.createdAt, {
      locale: getLocalForDateFns(lang),
    });
    cy.get(`#${MEMBER_CREATED_AT_ID}`).should('contain', formattedDate);
  });
});

describe('Bookmarked items', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: MemberFactory(),
      items: [targetItem],
      bookmarkedItems: [
        {
          id: shortcutItem.id,
          item: shortcutItem,
          createdAt: shortcutItem.createdAt,
        },
      ],
    });
    cy.visit('/home');
    cy.wait('@getCurrentMember');
  });

  it('Shortcut item in bookmarks links to target item', () => {
    cy.get(`#bookmark-${shortcutItem.id}`).should('be.visible');

    // card action on the shortcut directs to the target item
    cy.get(`a#bookmarkCardAction-${shortcutItem.id}`).click();
    cy.url().should('contain', `/builder/items/${targetItem.id}`);
  });
});
