import {
  FolderItemFactory,
  GuestFactory,
  ItemLoginSchemaFactory,
  ItemLoginSchemaType,
} from '@graasp/sdk';

import {
  AUTO_LOGIN_CONTAINER_ID,
  AUTO_LOGIN_ERROR_CONTAINER_ID,
  AUTO_LOGIN_NO_ITEM_LOGIN_ERROR_ID,
} from '../../../src/config/selectors';
import { TestHelper, buildContentPagePath, expectFolderLayout } from './utils';

const buildAutoLoginPath = ({
  rootId = `:rootId`,
  itemId = `:itemId`,
  searchParams = '',
} = {}): string => {
  let url = `/player/${rootId}/${itemId}/autoLogin`;
  // append search parameters if present
  if (searchParams) {
    url = `${url}?${searchParams}`;
  }
  return url;
};

const pseudonimizedItem = FolderItemFactory({ name: 'Pseudo Item' });
const pseudoMember = GuestFactory({
  name: 'bob-guest',
  itemLoginSchema: ItemLoginSchemaFactory({
    type: ItemLoginSchemaType.Username,
    item: pseudonimizedItem,
  }),
});

describe('Auto Login on pseudonimized item', () => {
  beforeEach(() => {
    const helper = new TestHelper({ item: pseudonimizedItem, pseudoMember });
    helper.setupServer();
  });
  ['1234', '"1234"', 'bobichette'].forEach((username) =>
    it(`Allows auto login for ${username} on item with item login`, () => {
      const search = new URLSearchParams({
        fullscreen: 'true',
      });
      const keepSearchString = search.toString();
      search.set('username', username);
      const routeArgs = {
        rootId: pseudonimizedItem.id,
        itemId: pseudonimizedItem.id,
        searchParams: search.toString(),
      };
      cy.visit(buildAutoLoginPath(routeArgs));
      cy.get(`#${AUTO_LOGIN_CONTAINER_ID}`).should('be.visible');
      cy.get(`#${AUTO_LOGIN_CONTAINER_ID} button`).click();

      // checks that the user was correctly redirected to the item page
      const { searchParams: _, ...pathArgs } = routeArgs;
      cy.location('pathname').should('equal', buildContentPagePath(pathArgs));
      // keep the search params
      cy.location('search').should('equal', `?${keepSearchString}`);
    }),
  );
  it('Missing username triggers error', () => {
    const routeArgs = {
      rootId: pseudonimizedItem.id,
      itemId: pseudonimizedItem.id,
    };
    cy.visit(buildAutoLoginPath(routeArgs));
    cy.get(`#${AUTO_LOGIN_ERROR_CONTAINER_ID}`).should('be.visible');
    cy.get(`#${AUTO_LOGIN_ERROR_CONTAINER_ID} a`).click();

    cy.location('pathname').should('equal', '/');
  });
});

describe('Auto Login on private item', () => {
  beforeEach(() => {
    const helper = new TestHelper({
      item: pseudonimizedItem,
      pseudoMember,
      returnItemLoginSchemaType: false,
    });
    helper.setupServer();
  });
  it('Fails if itemLogin is not enabled', () => {
    const search = new URLSearchParams({
      username: '1234',
      fullscreen: 'true',
    });
    const routeArgs = {
      rootId: pseudonimizedItem.id,
      itemId: pseudonimizedItem.id,
      searchParams: search.toString(),
    };
    cy.visit(buildAutoLoginPath(routeArgs));
    cy.get(`#${AUTO_LOGIN_NO_ITEM_LOGIN_ERROR_ID}`).should('be.visible');
  });
});

describe('Auto Login with logged in user', () => {
  beforeEach(() => {
    const helper = new TestHelper({
      item: pseudonimizedItem,
      pseudoMember,
      initiallyIsLoggedIn: true,
    });
    helper.setupServer();
  });
  it('Redirects to item page', () => {
    const search = new URLSearchParams({
      username: '1234',
      fullscreen: 'true',
    });
    const routeArgs = {
      rootId: pseudonimizedItem.id,
      itemId: pseudonimizedItem.id,
      searchParams: search.toString(),
    };
    cy.visit(buildAutoLoginPath(routeArgs));
    expectFolderLayout({
      rootId: pseudonimizedItem.id,
      items: [pseudonimizedItem],
    });
  });
});
