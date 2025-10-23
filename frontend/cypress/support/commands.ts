import {
  AppItemExtra,
  CookieKeys,
  DiscriminatedItem,
  DocumentItemExtra,
  Member,
  PermissionLevelOptions,
  PublicationStatus,
  getAppExtra,
  getDocumentExtra,
  getIdsFromPath,
} from '@graasp/sdk';

import {
  CUSTOM_APP_CYPRESS_ID,
  CUSTOM_APP_URL_ID,
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_UP_FIELD_ID,
  FLAVOR_SELECT_ID,
  FOLDER_FORM_DESCRIPTION_ID,
  HOME_MODAL_ITEM_ID,
  ITEM_FORM_APP_URL_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
  ITEM_FORM_DOCUMENT_TEXT_SELECTOR,
  ITEM_FORM_NAME_INPUT_ID,
  ITEM_MEMBERSHIP_PERMISSION_SELECT_CLASS,
  LAYOUT_MODE_BUTTON_ID,
  MAGIC_LINK_EMAIL_FIELD_ID,
  MY_GRAASP_ITEM_PATH,
  NAME_SIGN_UP_FIELD_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  REGISTER_AGREEMENTS_CHECKBOX_ID,
  SHARE_BUTTON_SELECTOR,
  SHARE_ITEM_EMAIL_INPUT_ID,
  SHARE_ITEM_SHARE_BUTTON_ID,
  TREE_MODAL_CONFIRM_BUTTON_ID,
  buildDataCyWrapper,
  buildFolderItemCardThumbnail,
  buildItemCard,
  buildItemRowArrowId,
  buildNavigationModalItemId,
  buildPermissionOptionId,
  buildTreeItemId,
} from '../../src/config/selectors';
import { ItemLayoutMode } from '../../src/modules/builder/enums';
import {
  fillPasswordSignInLayout,
  fillSignInByMailLayout,
  fillSignUpLayout,
  submitPasswordSignIn,
  submitRegister,
  submitSignIn,
} from '../e2e/auth/util';
import { SAMPLE_MENTIONS } from '../e2e/builder/fixtures/chatbox';
import { buildItemPath } from '../e2e/builder/utils';
import {
  APPS_LIST,
  APP_NAME,
  CUSTOM_APP_URL,
  NEW_APP_NAME,
} from '../fixtures/apps/apps';
import {
  CURRENT_MEMBER,
  MEMBERS,
  MEMBER_PUBLIC_PROFILE,
} from '../fixtures/members';
import { MEMBER_STORAGE_ITEM_RESPONSE } from '../fixtures/storage';
import {
  mockAddBookmark,
  mockAddTag,
  mockAppApiAccessToken,
  mockCheckShortLink,
  mockClearItemChat,
  mockCopyItems,
  mockCreatePassword,
  mockDefaultDownloadFile,
  mockDeleteAppData,
  mockDeleteBookmark,
  mockDeleteCurrentMember,
  mockDeleteInvitation,
  mockDeleteItemLoginSchema,
  mockDeleteItemMembershipForItem,
  mockDeleteItemThumbnail,
  mockDeleteItemVisibility,
  mockDeleteItems,
  mockDeleteShortLink,
  mockDownloadItemChat,
  mockEditCurrentMember,
  mockEditItem,
  mockEditItemMembershipForItem,
  mockEditMember,
  mockEditPublicProfile,
  mockEnroll,
  mockExportData,
  mockGetAccessibleItems,
  mockGetAppData,
  mockGetAppLink,
  mockGetAppListRoute,
  mockGetAvatarUrl,
  mockGetChildren,
  mockGetCurrentMember,
  mockGetCurrentMemberAvatar,
  mockGetDescendants,
  mockGetItem,
  mockGetItemBookmarks,
  mockGetItemChat,
  mockGetItemGeolocation,
  mockGetItemInvitations,
  mockGetItemLoginSchema,
  mockGetItemLoginSchemaType,
  mockGetItemMembershipsForItem,
  mockGetItemThumbnailUrl,
  mockGetItemsInMap,
  mockGetLatestValidationGroup,
  mockGetLinkMetadata,
  mockGetMember,
  mockGetMemberMentions,
  mockGetMemberStorageFiles,
  mockGetMembershipRequestsForItem,
  mockGetOwnMembershipRequests,
  mockGetOwnProfile,
  mockGetOwnRecycledItemData,
  mockGetParents,
  mockGetPasswordStatus,
  mockGetPublicationStatus,
  mockGetPublishItemInformations,
  mockGetPublishItemsForMember,
  mockGetShortLinksItem,
  mockGetStatus,
  mockGetStorage,
  mockGetTagsByItem,
  mockImportH5p,
  mockImportZip,
  mockLogin,
  mockMoveItems,
  mockPatchAppData,
  mockPatchInvitation,
  mockPatchShortLink,
  mockPostAppData,
  mockPostAvatar,
  mockPostInvitations,
  mockPostItem,
  mockPostItemChatMessage,
  mockPostItemFlag,
  mockPostItemLogin,
  mockPostItemMembership,
  mockPostItemThumbnail,
  mockPostItemValidation,
  mockPostItemVisibility,
  mockPostShortLink,
  mockPublishItem,
  mockPutItemLoginSchema,
  mockRecycleItems,
  mockRejectMembershipRequest,
  mockRemoveTag,
  mockRequestMembership,
  mockRequestPasswordReset,
  mockResetPassword,
  mockRestoreItems,
  mockSignInRedirection,
  mockSignOut,
  mockUnpublishItem,
  mockUpdateEmail,
  mockUpdatePassword,
  mockUploadInvitationCSV,
  mockUploadInvitationCSVWithTemplate,
  mockUploadItem,
} from './server';
import { ApiConfig } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      iframe(selector: string): Chainable;

      checkErrorTextField(id: string, flag: unknown): Chainable;

      signUpAndCheck(
        member: Member & {
          nameValid?: boolean;
          emailValid?: boolean;
          passwordValid?: boolean;
        },
        acceptAllTerms?: boolean,
      ): Chainable;

      signInByMailAndCheck(
        value: Partial<Member> & {
          nameValid?: boolean;
          emailValid?: boolean;
          passwordValid?: boolean;
        },
      ): Chainable;

      signInPasswordAndCheck(
        member: Member & {
          nameValid?: boolean;
          emailValid?: boolean;
          passwordValid?: boolean;
          password?: string;
        },
      ): Chainable;

      agreeWithAllTerms(): Chainable;

      getIframeDocument(iframeSelector: string): Chainable;
      getIframeBody(iframeSelector: string): Chainable;

      fillShareForm(args: {
        email: string;
        permission: PermissionLevelOptions;
        submit?: boolean;
        selector?: string;
      }): void;

      clickElementInIframe(
        iframeSelector: string,
        elementSelector: string,
      ): void;

      checkContentInElementInIframe(
        iframeSelector: string,
        elementSelector: string,
        text: string,
      ): void;

      attachFile(selector: Chainable, file: string, options?: object): void;
      attachFiles(
        selector: Chainable,
        filenames: string[],
        options?: object,
      ): void;

      clickTreeMenuItem(value: string): void;
      handleTreeMenu(path: string, rootId?: string): void;
      switchMode(mode: string): void;
      goToItemInCard(path: string): void;

      fillDocumentModal(
        payload: {
          name: string;
          extra?: DocumentItemExtra;
        },
        options?: { confirm?: boolean },
      ): void;
      fillAppModal(
        payload: { name: string; extra?: AppItemExtra },
        options?: {
          type?: boolean;
          id?: string;
          confirm?: boolean;
          custom?: boolean;
        },
      ): void;
      fillFolderModal(
        arg1: { name?: string; description?: string },
        arg2?: { confirm?: boolean },
      ): void;

      dragAndDrop(subject: string, x: number, y: number): void;

      selectItem(id: DiscriminatedItem['id']): void;

      setUpApi(args?: ApiConfig): void;

      fillBaseItemModal(
        item: { name?: string },
        options?: { confirm?: boolean },
      ): void;

      disableLocalStorage(): void;
    }
  }
}

Cypress.Commands.add(
  'setUpApi',
  ({
    currentMember = CURRENT_MEMBER,
    currentGuest = null,
    currentProfile = MEMBER_PUBLIC_PROFILE,
    storageAmountInBytes = 10000,
    files = MEMBER_STORAGE_ITEM_RESPONSE,
    items = [],
    shortLinks = [],
    recycledItemData = [],
    bookmarkedItems = [],
    publishedItemData = [],
    members = Object.values(MEMBERS),
    mentions = SAMPLE_MENTIONS,
    itemValidationGroups = [],
    itemPublicationStatus = PublicationStatus.Unpublished,
    membershipRequests = [],
    getMemberStorageFilesError = false,
    shouldFailRequestPasswordReset = false,
    shouldFailResetPassword = false,
    shouldFailLogin = false,
    getCurrentProfileError = false,
    editPublicProfileError = false,
    exportDataError = false,
    hasPassword = false,
    updateEmailError = false,
    createPasswordError = false,
    deleteItemsError = false,
    postItemError = false,
    moveItemsError = false,
    copyItemsError = false,
    getItemError = false,
    editItemError = false,
    shareItemError = false,
    defaultUploadError = false,
    getCurrentMemberError = false,
    postItemVisibilityError = false,
    postItemLoginError = false,
    putItemLoginError = false,
    editMemberError = false,
    postItemFlagError = false,
    getItemChatError = false,
    recycleItemsError = false,
    deleteItemVisibilityError = false,
    restoreItemsError = false,
    getItemThumbnailError = false,
    getAvatarUrlError = false,
    postItemThumbnailError = false,
    postAvatarError = false,
    importZipError = false,
    postInvitationsError = false,
    getItemInvitationsError = false,
    patchInvitationError = false,
    deleteInvitationError = false,
    updatePasswordError = false,
    postItemChatMessageError = false,
    clearItemChatError = false,
    getMemberMentionsError = false,
    getAppLinkError = false,
    getBookmarkError = false,
    addBookmarkError = false,
    deleteBookmarkError = false,
    getShortLinksItemError = false,
    getShortLinkAvailable = true,
    postShortLinkError = false,
    patchShortLinkError = false,
    deleteShortLinkError = false,
    importH5pError = false,
    getRecycledItemsError = false,
    getPublishedItemsError = false,
  } = {}) => {
    const cachedItems = structuredClone(items);
    const cachedMembers = structuredClone(members);
    const cachedCurrentMember = structuredClone(currentMember);
    const cachedCurrentProfile = structuredClone(currentProfile);
    const cachedCurrentStorageFiles = structuredClone(files);
    const cachedShortLinks = structuredClone(shortLinks);

    const allItems = [...cachedItems];

    // hide cookie banner by default
    cy.setCookie(CookieKeys.AcceptCookies, 'true');

    mockGetOwnProfile(cachedCurrentProfile, getCurrentProfileError);

    mockSignInRedirection();

    mockSignOut();

    mockEditCurrentMember(cachedCurrentMember, editMemberError);
    mockEditPublicProfile(cachedCurrentProfile, editPublicProfileError);
    mockGetCurrentMemberAvatar(currentMember, getAvatarUrlError);

    mockPostAvatar(postAvatarError);

    mockUpdatePassword(updatePasswordError);
    mockUpdateEmail(updateEmailError);

    mockGetStorage(storageAmountInBytes);
    mockGetMemberStorageFiles(
      cachedCurrentStorageFiles,
      getMemberStorageFilesError,
    );
    mockExportData(exportDataError);
    mockDeleteCurrentMember();

    mockGetPasswordStatus(hasPassword);
    mockCreatePassword(createPasswordError);

    mockGetStatus();
    mockRequestPasswordReset(shouldFailRequestPasswordReset);
    mockResetPassword(shouldFailResetPassword);
    mockLogin(shouldFailLogin);

    mockGetAccessibleItems(cachedItems);
    mockGetItem(
      { items: cachedItems, currentMember },
      getItemError || getCurrentMemberError,
    );
    mockPostItem(cachedItems, postItemError);
    mockEditItem(cachedItems, editItemError);
    mockCopyItems(cachedItems, copyItemsError);
    mockDeleteItems(allItems, deleteItemsError);

    mockGetDescendants(items, currentMember);

    mockDefaultDownloadFile({ items, currentMember });

    mockGetAppLink(getAppLinkError);
    mockAppApiAccessToken(getAppLinkError);
    mockGetAppData(getAppLinkError);
    mockPostAppData(getAppLinkError);
    mockPatchAppData(getAppLinkError);
    mockDeleteAppData(getAppLinkError);

    mockGetItemGeolocation(items);
    mockGetItemsInMap(items, currentMember);

    mockGetAppListRoute(APPS_LIST);

    mockGetParents({ items });
    mockGetChildren({ items: cachedItems });

    mockMoveItems(cachedItems, moveItemsError);

    mockPostItemMembership(cachedItems, shareItemError);

    mockGetMember(cachedMembers);

    mockUploadItem(cachedItems, defaultUploadError);

    mockGetCurrentMember(currentMember, currentGuest, getCurrentMemberError);

    mockGetItemLoginSchema(items);

    mockGetItemLoginSchemaType(items);

    mockPostItemLogin(cachedItems, postItemLoginError);

    mockPutItemLoginSchema(cachedItems, putItemLoginError);

    mockDeleteItemLoginSchema();

    mockGetItemMembershipsForItem(items, currentMember);

    mockPostItemVisibility(cachedItems, postItemVisibilityError);

    mockDeleteItemVisibility(deleteItemVisibilityError);

    mockEditMember(members, editMemberError);

    mockEditItemMembershipForItem();

    mockDeleteItemMembershipForItem();

    mockPostItemFlag(cachedItems, postItemFlagError);

    mockGetItemChat({ items }, getItemChatError);

    mockDownloadItemChat({ items }, getItemChatError);

    mockPostItemChatMessage(postItemChatMessageError);

    mockClearItemChat({ items }, clearItemChatError);

    mockGetMemberMentions({ mentions }, getMemberMentionsError);

    mockRecycleItems(items, recycleItemsError);

    mockGetOwnRecycledItemData(recycledItemData, getRecycledItemsError);

    mockRestoreItems(items, restoreItemsError);

    mockGetItemThumbnailUrl(items, getItemThumbnailError);

    mockDeleteItemThumbnail(items, getItemThumbnailError);

    mockGetAvatarUrl(members, getAvatarUrlError);

    mockPostItemThumbnail(items, postItemThumbnailError);

    mockImportZip(importZipError);

    mockGetTagsByItem(items);

    mockRemoveTag();
    mockAddTag();

    mockPostItemValidation();

    mockPostInvitations(items, postInvitationsError);

    mockGetItemInvitations(items, getItemInvitationsError);

    mockPatchInvitation(items, patchInvitationError);

    mockDeleteInvitation(items, deleteInvitationError);

    mockUploadInvitationCSV(items, false);

    mockUploadInvitationCSVWithTemplate(false);

    mockGetPublicationStatus(itemPublicationStatus);
    mockPublishItem(items);
    mockUnpublishItem(items);

    mockGetPublishItemInformations(items);

    mockGetLatestValidationGroup(items, itemValidationGroups);

    mockGetItemBookmarks(bookmarkedItems, getBookmarkError);

    mockAddBookmark(cachedItems, addBookmarkError);

    mockDeleteBookmark(deleteBookmarkError);

    mockGetShortLinksItem(cachedShortLinks, getShortLinksItemError);

    mockCheckShortLink(getShortLinkAvailable);

    mockPostShortLink(cachedShortLinks, postShortLinkError);

    mockPatchShortLink(cachedShortLinks, patchShortLinkError);

    mockDeleteShortLink(cachedShortLinks, deleteShortLinkError);

    mockGetLinkMetadata();

    mockImportH5p(importH5pError);

    mockGetPublishItemsForMember(publishedItemData, getPublishedItemsError);

    mockGetOwnMembershipRequests(currentMember, membershipRequests);

    mockRequestMembership();

    mockGetMembershipRequestsForItem(membershipRequests);

    mockRejectMembershipRequest();

    mockEnroll();
  },
);

Cypress.Commands.add('checkErrorTextField', (id, flag) => {
  const existence = flag ? 'not.exist' : 'exist';
  cy.get(`#${id}-helper-text`).should(existence);
});

Cypress.Commands.add('agreeWithAllTerms', () => {
  cy.get(`[data-cy="${REGISTER_AGREEMENTS_CHECKBOX_ID}"] input`)
    .check()
    .should('be.checked');
});

Cypress.Commands.add('signUpAndCheck', (user, acceptAllTerms) => {
  fillSignUpLayout(user);
  if (acceptAllTerms) {
    cy.agreeWithAllTerms();
  }
  submitRegister();

  cy.checkErrorTextField(NAME_SIGN_UP_FIELD_ID, user.nameValid);
  cy.checkErrorTextField(EMAIL_SIGN_UP_FIELD_ID, user.emailValid);
});

Cypress.Commands.add('signInByMailAndCheck', (user) => {
  fillSignInByMailLayout(user);
  submitSignIn();
  cy.checkErrorTextField(MAGIC_LINK_EMAIL_FIELD_ID, user.emailValid);
});

Cypress.Commands.add('signInPasswordAndCheck', (user) => {
  fillPasswordSignInLayout(user);
  if (user.password) {
    submitPasswordSignIn();
  }
  if (!user.passwordValid) {
    cy.get(`#${PASSWORD_SIGN_IN_FIELD_ID}`).clear();
  }
  cy.checkErrorTextField(EMAIL_SIGN_IN_FIELD_ID, user.emailValid);
  cy.checkErrorTextField(PASSWORD_SIGN_IN_FIELD_ID, user.passwordValid);
});

Cypress.Commands.add('getIframeDocument', (iframeSelector) =>
  cy.get(iframeSelector).its('0.contentDocument').should('exist').then(cy.wrap),
);

Cypress.Commands.add('getIframeBody', (iframeSelector) =>
  // retry to get the body until the iframe is loaded
  cy
    .getIframeDocument(iframeSelector)
    .its('body')
    .should('not.be.undefined')
    .then(cy.wrap),
);

Cypress.Commands.add(
  'fillBaseItemModal',
  ({ name = '' }, { confirm = true } = {}) => {
    // first select all the text and then remove it to have a clear field, then type new text
    cy.get(`#${ITEM_FORM_NAME_INPUT_ID}`).type(`{selectall}{backspace}${name}`);

    if (confirm) {
      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();
    }
  },
);

Cypress.Commands.add(
  'fillFolderModal',
  ({ name = '', description = '' }, { confirm = true } = {}) => {
    cy.fillBaseItemModal({ name }, { confirm: false });
    // first select all the text and then remove it to have a clear field, then type new description
    cy.get(`#${FOLDER_FORM_DESCRIPTION_ID}`).type(
      `{selectall}{backspace}${description}`,
    );

    if (confirm) {
      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();
    }
  },
);

Cypress.Commands.add(
  'fillDocumentModal',
  ({ name = '', extra }, { confirm = true } = {}) => {
    cy.fillBaseItemModal({ name }, { confirm: false });

    if (extra.document.flavor) {
      cy.get(`#${FLAVOR_SELECT_ID} div`).click();
      cy.get(`li[data-value="${extra.document.flavor}"]`).click();
    }

    const content =
      // first select all the text and then remove it to have a clear field, then type new text
      `{selectall}{backspace}${getDocumentExtra(extra)?.content}`;

    if (extra.document.isRaw) {
      cy.get(`[role="tab"]:contains("HTML")`).click();
      cy.get('[role="tabpanel"] textarea[name="content"]').type(content);
    } else {
      cy.get(ITEM_FORM_DOCUMENT_TEXT_SELECTOR).type(content);
    }

    if (confirm) {
      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).scrollIntoView().click();
    }
  },
);

Cypress.Commands.add(
  'fillAppModal',
  (
    { name = '', extra },
    { confirm = true, id, type = false, custom = false } = {},
  ) => {
    cy.fillBaseItemModal({ name }, { confirm: false });

    if (type) {
      cy.get(`#${ITEM_FORM_APP_URL_ID}`).type(getAppExtra(extra)?.url);
    } else if (custom) {
      cy.get(`[data-test-id="${CUSTOM_APP_CYPRESS_ID}"]`).click();
      // check name get added automatically
      cy.fillBaseItemModal({ name }, { confirm: false });
      cy.get(`#${CUSTOM_APP_URL_ID}`).type(CUSTOM_APP_URL);
    } else {
      cy.get(`[data-test-id="${id}"]`).click();
      // check name get added automatically
      cy.get(`#${ITEM_FORM_NAME_INPUT_ID}`).should('have.value', APP_NAME);
      // edit the app name
      cy.get(`#${ITEM_FORM_NAME_INPUT_ID}`)
        .type(`{selectall}{backspace}${NEW_APP_NAME}`)
        .should('have.value', NEW_APP_NAME);
    }

    if (confirm) {
      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();
    }
  },
);

// This command was based on a solution found on github
// https://github.com/cypress-io/cypress/issues/3942#issuecomment-485648100
Cypress.Commands.add('dragAndDrop', (subject, x, y) => {
  cy.get(subject)
    .first()
    .then((target) => {
      const coordsDrag = target[0].getBoundingClientRect();
      cy.wrap(target)
        .trigger('mousedown', {
          button: 0,
          clientX: coordsDrag.x,
          clientY: coordsDrag.y,
          force: true,
        })
        .trigger('mousemove', {
          button: 0,
          clientX: coordsDrag.x + 10,
          clientY: coordsDrag.y,
          force: true,
        });
      cy.get('body')
        .trigger('mousemove', {
          button: 0,
          clientX: coordsDrag.x + x,
          clientY: coordsDrag.y + y,
          force: true,
        })
        .trigger('mouseup');
    });
});

Cypress.Commands.add('selectItem', (id: DiscriminatedItem['id']) => {
  cy.get(buildFolderItemCardThumbnail(id)).click();
});

Cypress.Commands.add(
  'fillShareForm',
  ({ email, permission, submit = true, selector = '' }) => {
    cy.get(buildDataCyWrapper(SHARE_BUTTON_SELECTOR)).click();

    // select permission
    cy.get(`${selector} .${ITEM_MEMBERSHIP_PERMISSION_SELECT_CLASS}`).click();
    cy.get(`#${buildPermissionOptionId(permission)}`).click();

    // input mail
    cy.get(`#${SHARE_ITEM_EMAIL_INPUT_ID}`).type(email);

    if (submit) {
      cy.get(`#${SHARE_ITEM_SHARE_BUTTON_ID}`).click();
    }
  },
);

Cypress.Commands.add(
  'clickElementInIframe',
  (iframeSelector, elementSelector) =>
    cy
      .get(iframeSelector)
      .then(($iframe) =>
        cy.wrap($iframe.contents().find(elementSelector)).click(),
      ),
);

Cypress.Commands.add(
  'checkContentInElementInIframe',
  (iframeSelector, elementSelector, text) =>
    cy
      .get(iframeSelector)
      .then(($iframe) =>
        cy
          .wrap($iframe.contents().find(elementSelector))
          .should('contain', text),
      ),
);

Cypress.Commands.add(
  'handleTreeMenu',
  (toItemPath, treeRootId = HOME_MODAL_ITEM_ID) => {
    const ids =
      toItemPath === MY_GRAASP_ITEM_PATH ? [] : getIdsFromPath(toItemPath);

    [MY_GRAASP_ITEM_PATH, ...ids].forEach((value, idx, array) => {
      cy.get(`#${treeRootId}`).then(($tree) => {
        // click on the element
        if (idx === array.length - 1) {
          cy.wrap($tree)
            .get(`#${buildNavigationModalItemId(value)}`)
            .first()
            .click();
        }
        // if can't find children click on parent (current value)
        if (
          idx !== array.length - 1 &&
          !$tree.find(`#${buildTreeItemId(array[idx + 1], treeRootId)}`).length
        ) {
          cy.get(`#${buildNavigationModalItemId(value)}`)
            .get(`#${buildItemRowArrowId(value)}`)
            .first()
            // hack to show button - cannot trigger with cypress
            .invoke('attr', 'style', 'visibility: visible')
            .click();
        }
      });
    });

    cy.get(`#${TREE_MODAL_CONFIRM_BUTTON_ID}`).click();
  },
);

Cypress.Commands.add('attachFile', (selector, file, options = {}) => {
  selector.selectFile(`cypress/fixtures/${file}`, options);
});

Cypress.Commands.add('attachFiles', (selector, filenames, options = {}) => {
  const correctFilenames = filenames.map(
    (filename) => `cypress/fixtures/${filename}`,
  );
  selector.selectFile(correctFilenames, options);
});

Cypress.Commands.add('goToItemInCard', (id: string) => {
  // card component might have many click zone
  cy.get(`#${buildItemCard(id)} a[href^="${buildItemPath(id)}"]`)
    .first()
    .click();
});

Cypress.Commands.add('switchMode', (mode) => {
  cy.get(`#${LAYOUT_MODE_BUTTON_ID}`).click({ force: true });
  switch (mode) {
    case ItemLayoutMode.Grid:
      cy.get(`a[value="${ItemLayoutMode.Grid}"]`).click({ force: true });
      break;
    case ItemLayoutMode.List:
      cy.get(`a[value="${ItemLayoutMode.List}"]`).click({ force: true });
      break;
    case ItemLayoutMode.Map:
      cy.get(`a[value="${ItemLayoutMode.Map}"]`).click({ force: true });
      break;
    default:
      throw new Error(`invalid mode ${mode} provided`);
  }
});

const LOCAL_STORAGE_METHODS = ['setItem', 'removeItem', 'clear'];
Cypress.Commands.add('disableLocalStorage', () => {
  cy.on('window:before:load', (win) => {
    if (
      win.localStorage &&
      !win.localStorage[LOCAL_STORAGE_METHODS[0]].wrappedMethod &&
      !localStorage[LOCAL_STORAGE_METHODS[0]].wrappedMethod
    ) {
      LOCAL_STORAGE_METHODS.forEach((localStorageMethod) => {
        cy.stub(win.localStorage, localStorageMethod).throws(
          new Error(`${localStorageMethod} throws!`),
        );
      });
    }
  });
});

const waitForIframe = (selector: string) => {
  cy.get(selector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
};
Cypress.Commands.add('iframe', waitForIframe);
