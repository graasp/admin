import {
  MemberFactory,
  PackedFileItemFactory,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import {
  COPY_MANY_ITEMS_BUTTON_SELECTOR,
  ITEM_MENU_COPY_BUTTON_CLASS,
  TREE_MODAL_CONFIRM_BUTTON_ID,
  buildDataCyWrapper,
  buildItemCard,
  buildItemMenuDataCy,
} from '../../../../../src/config/selectors';
import {
  fillPasswordSignInLayout,
  submitPasswordSignIn,
} from '../../../auth/util';
import { HOME_PATH, buildItemPath } from '../../utils';

const copyItems = ({
  toItemPath,
  rootId,
}: {
  toItemPath: string;
  rootId?: string;
}) => {
  cy.get(COPY_MANY_ITEMS_BUTTON_SELECTOR).click();
  cy.handleTreeMenu(toItemPath, rootId);
};

const copyItem = ({
  id,
  toItemPath,
  rootId,
}: {
  id: string;
  toItemPath: string;
  rootId?: string;
}) => {
  cy.get(buildDataCyWrapper(buildItemMenuDataCy(id))).click();
  cy.get(`.${ITEM_MENU_COPY_BUTTON_CLASS}`).click();
  cy.handleTreeMenu(toItemPath, rootId);
};

const IMAGE_ITEM = PackedFileItemFactory();
const FOLDER = PackedFolderItemFactory();
const IMAGE_ITEM_CHILD = PackedFileItemFactory({ parentItem: FOLDER });
const FOLDER2 = PackedFolderItemFactory();

const items = [IMAGE_ITEM, FOLDER, FOLDER2, IMAGE_ITEM_CHILD];

describe('Copy Item', () => {
  it('copy item on Home', () => {
    cy.setUpApi({ items });
    cy.visit(HOME_PATH);

    // copy
    const { id: copyItemId } = FOLDER;
    copyItem({ id: copyItemId, toItemPath: '' });

    cy.wait('@copyItems').then(({ request: { url } }) => {
      cy.get(`#${buildItemCard(copyItemId)}`).should('be.visible');
      expect(url).to.contain(copyItemId);
    });
  });

  it('copy item in item', () => {
    cy.setUpApi({ items });
    const { id } = FOLDER;

    // go to children item
    cy.visit(buildItemPath(id));

    // copy
    const { id: copyItemId } = IMAGE_ITEM_CHILD;
    const { id: toItemId, path: toItemPath } = FOLDER2;
    copyItem({ id: copyItemId, toItemPath });

    cy.wait('@copyItems').then(({ request: { url, body } }) => {
      cy.get(`#${buildItemCard(copyItemId)}`).should('exist');
      expect(url).to.contain(copyItemId);
      expect(body.parentId).to.equal(toItemId);
    });
  });

  it('copy item to Home', () => {
    cy.setUpApi({ items });

    // go to children item
    cy.visit(buildItemPath(FOLDER.id));

    // copy
    const { id } = IMAGE_ITEM_CHILD;
    copyItem({ id, toItemPath: '' });

    cy.wait('@copyItems').then(({ request: { url } }) => {
      cy.get(`#${buildItemCard(id)}`).should('exist');
      expect(url).to.contain(id);
    });
  });

  it('copy many items on Home', () => {
    const folders = [
      PackedFolderItemFactory(),
      PackedFolderItemFactory(),
      PackedFolderItemFactory(),
    ];
    cy.setUpApi({
      items: folders,
    });

    // go to children item
    cy.visit('/home');

    folders.forEach((item) => {
      cy.selectItem(item.id);
    });

    // copy on home
    copyItems({ toItemPath: '' });

    cy.wait('@copyItems').then(({ request: { url } }) => {
      folders.forEach((item) => {
        expect(url).to.contain(item.id);
      });
    });
  });

  it('copy many items from Home to folder', () => {
    const folders = [
      PackedFolderItemFactory(),
      PackedFolderItemFactory(),
      PackedFolderItemFactory(),
    ];
    const toItem = PackedFolderItemFactory();
    cy.setUpApi({
      items: [...folders, toItem],
    });

    // go to children item
    cy.visit('/home');

    folders.forEach((item) => {
      cy.selectItem(item.id);
    });
    // copy on home
    copyItems({ toItemPath: toItem.path });

    cy.wait('@copyItems').then(({ request: { url, body } }) => {
      expect(body.parentId).to.eq(toItem.id);
      folders.forEach((item) => {
        expect(url).to.contain(item.id);
      });
    });
  });

  it('copy many items from folder to folder', () => {
    const parentItem = PackedFolderItemFactory();
    const folders = [
      PackedFolderItemFactory({ parentItem }),
      PackedFolderItemFactory({ parentItem }),
      PackedFolderItemFactory({ parentItem }),
    ];
    const toItem = PackedFolderItemFactory();
    cy.setUpApi({
      items: [...folders, parentItem, toItem],
    });

    // go to children item
    cy.visit(buildItemPath(parentItem.id));

    folders.forEach((item) => {
      cy.selectItem(item.id);
    });

    // copy on home
    copyItems({ toItemPath: toItem.path });

    cy.wait('@copyItems').then(({ request: { url, body } }) => {
      expect(body.parentId).to.eq(toItem.id);
      folders.forEach((item) => {
        expect(url).to.contain(item.id);
      });
    });
  });

  it('copy item from item page', () => {
    const parentItem = PackedFolderItemFactory();
    const folders = [
      PackedFolderItemFactory({ parentItem }),
      PackedFolderItemFactory({ parentItem }),
      PackedFolderItemFactory({ parentItem }),
    ];
    const toItem = PackedFolderItemFactory();
    cy.setUpApi({
      items: [...folders, parentItem, toItem],
    });

    // go to item
    cy.visit(buildItemPath(parentItem.id));
    cy.get(`[aria-label="More"]`).click();
    cy.get(`[role="menuitem"][aria-label="Copy"]`).click();
    cy.handleTreeMenu(toItem.path);

    cy.wait('@copyItems').then(({ request: { url, body } }) => {
      expect(body.parentId).to.eq(toItem.id);
      expect(url).to.contain(parentItem.id);
    });
  });

  it('open copy modal for copyOpen=true and logged in', () => {
    const parentItem = PackedFolderItemFactory();
    const folders = [PackedFolderItemFactory({ parentItem })];
    const toItem = PackedFolderItemFactory();
    cy.setUpApi({
      items: [...folders, parentItem, toItem],
    });

    // go to item with modal open
    cy.visit(buildItemPath(parentItem.id) + '?copyOpen=true');
    cy.handleTreeMenu(toItem.path);

    cy.wait('@copyItems').then(({ request: { url, body } }) => {
      expect(body.parentId).to.eq(toItem.id);
      expect(url).to.contain(parentItem.id);
    });
  });

  it('Show copy modal warning for copyOpen=true and logged out, logging in should show copy modal', () => {
    const parentItem = PackedFolderItemFactory();
    const folders = [PackedFolderItemFactory({ parentItem })];
    const toItem = PackedFolderItemFactory();
    cy.setUpApi({
      currentMember: null,
      items: [...folders, parentItem, toItem],
    });

    // go to item with modal open
    cy.visit(buildItemPath(parentItem.id) + '?copyOpen=true');

    // should show warning
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

    // go to login
    cy.get('[role="dialog"] [aria-label="Login"]').click();
    cy.url().should('contain', '/login');

    cy.intercept(
      {
        pathname: '/login-password',
      },
      ({ reply }) => {
        reply({ statusCode: StatusCodes.NO_CONTENT });
      },
    ).as('signInWithPassword');

    // manually set current member
    cy.setUpApi({
      items: [...folders, parentItem, toItem],
    });

    // fake sign in
    fillPasswordSignInLayout({
      ...MemberFactory(),
      password: 'some password',
    });
    submitPasswordSignIn();
    cy.wait('@signInWithPassword');

    // should show copy modal
    cy.get(`#${TREE_MODAL_CONFIRM_BUTTON_ID}`).should('be.visible');
  });
});
