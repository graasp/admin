import { HttpMethod, PackedFolderItemFactory } from '@graasp/sdk';

import {
  CREATE_ITEM_BUTTON_ID,
  CREATE_ITEM_LINK_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
  ITEM_FORM_LINK_INPUT_ID,
  ITEM_FORM_NAME_INPUT_ID,
} from '../../../../../src/config/selectors';
import { buildItemPath } from '../../utils';

const openLinkModal = () => {
  cy.get(`#${CREATE_ITEM_BUTTON_ID}`).click();
  cy.get(`#${CREATE_ITEM_LINK_ID}`).click();
};

const createLink = ({ url }: { url: string }): void => {
  openLinkModal();

  cy.get(`#${ITEM_FORM_LINK_INPUT_ID}`).clear().type(url);
  // wait for iframely to fill fields
  cy.get(`[role=dialog]`).should('contain', 'Page title');
};

describe('Create Link', () => {
  beforeEach(() => {
    cy.intercept({
      method: HttpMethod.Post,
      url: /\/items\/embedded-links\//,
    }).as('postItemLink');
  });

  it('create link in item', () => {
    const FOLDER = PackedFolderItemFactory();
    const CHILD = PackedFolderItemFactory({ parentItem: FOLDER });

    cy.setUpApi({ items: [FOLDER, CHILD] });
    const { id } = FOLDER;

    // go to children item
    cy.visit(buildItemPath(id));

    // create
    createLink({ url: 'https://graasp.org' });
    cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();

    cy.wait('@postItemLink').then(({ request: { url } }) => {
      expect(url).to.contain(FOLDER.id);
      // add after child
      expect(url).to.contain(CHILD.id);

      // expect update
      cy.wait('@getItem').its('response.url').should('contain', id);
    });
  });

  it('create link without protocol on Home', () => {
    const FOLDER = PackedFolderItemFactory();
    const CHILD = PackedFolderItemFactory({ parentItem: FOLDER });

    cy.setUpApi({ items: [FOLDER, CHILD] });
    const { id } = FOLDER;

    // go to child item
    cy.visit(buildItemPath(id));

    // create
    createLink({ url: 'graasp.org' });
    cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();

    cy.wait('@postItemLink').then(({ request: { body } }) => {
      expect(body.url).to.contain('http');
      // expect update
      cy.wait('@getItem').its('response.url').should('contain', id);
    });
  });

  it('enter valid link, then reset link', () => {
    const FOLDER = PackedFolderItemFactory();
    const CHILD = PackedFolderItemFactory({ parentItem: FOLDER });

    cy.setUpApi({ items: [FOLDER, CHILD] });
    const { id } = FOLDER;
    // go to child item
    cy.visit(buildItemPath(id));

    // enter valid data
    createLink({ url: 'graasp.org' });
    cy.get(`#${ITEM_FORM_NAME_INPUT_ID} input`).should('not.be.empty');

    // type a wrong link and cannot save
    cy.get(`#${ITEM_FORM_LINK_INPUT_ID}`).clear().type('something');
    cy.get(`#${ITEM_FORM_NAME_INPUT_ID} input`).should('not.be.empty');
    cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();
    cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).should('be.disabled');
  });

  describe('Error handling', () => {
    it('cannot add an invalid link', () => {
      const FOLDER = PackedFolderItemFactory();
      const CHILD = PackedFolderItemFactory({ parentItem: FOLDER });

      cy.setUpApi({ items: [FOLDER, CHILD] });
      const { id } = FOLDER;
      // go to child item
      cy.visit(buildItemPath(id));

      // fill link and name
      openLinkModal();
      cy.get(`#${ITEM_FORM_LINK_INPUT_ID}`).type('invalid');
      cy.get(`#${ITEM_FORM_NAME_INPUT_ID}`).type('name');
      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();

      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).should(
        'have.prop',
        'disabled',
        true,
      );
    });

    it('cannot have an empty name', () => {
      const FOLDER = PackedFolderItemFactory();
      const CHILD = PackedFolderItemFactory({ parentItem: FOLDER });

      cy.setUpApi({ items: [FOLDER, CHILD] });
      const { id } = FOLDER;
      // go to child item
      cy.visit(buildItemPath(id));

      // fill link and clear name
      createLink({ url: 'https://graasp.org' });
      cy.get(`#${ITEM_FORM_NAME_INPUT_ID}`).clear();
      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();

      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).should(
        'have.prop',
        'disabled',
        true,
      );
    });
  });
});
