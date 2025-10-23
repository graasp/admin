import { PackedFolderItemFactory } from '@graasp/sdk';

import { APPS_LIST } from '../../../../fixtures/apps/apps';
import { createApp } from '../../../../support/createUtils';
import { GRAASP_APP_ITEM, GRAASP_CUSTOM_APP_ITEM } from '../../fixtures/apps';
import { buildItemPath } from '../../utils';

const FOLDER = PackedFolderItemFactory();
const CHILD = PackedFolderItemFactory({ parentItem: FOLDER });

describe('Create App', () => {
  describe('create app in item', () => {
    it('Create app with dropdown', () => {
      cy.setUpApi({ items: [FOLDER, CHILD] });
      const { id } = FOLDER;

      // go to children item
      cy.visit(buildItemPath(id));

      // create
      createApp(GRAASP_APP_ITEM, { id: APPS_LIST[0].name });
      cy.wait('@postItem').then(({ request: { url } }) => {
        expect(url).to.contain(FOLDER.id);
        // add after child
        expect(url).to.contain(CHILD.id);
        // expect update
        cy.wait('@getItem').its('response.url').should('contain', id);
      });
    });

    it('Create a custom app', () => {
      cy.setUpApi({ items: [FOLDER] });
      const { id } = FOLDER;

      // go to children item
      cy.visit(buildItemPath(id));

      // create
      createApp(GRAASP_CUSTOM_APP_ITEM, { custom: true });

      cy.wait('@postItem').then(() => {
        // expect update
        cy.wait('@getItem').its('response.url').should('contain', id);
      });
    });
  });
});
