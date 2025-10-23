import {
  EtherpadPermission,
  PackedEtherpadItemFactory,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import {
  EDIT_ITEM_BUTTON_CLASS,
  ETHERPAD_ALLOW_READER_TO_WRITE_SETTING_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
  ITEM_FORM_NAME_INPUT_ID,
  buildDataCyWrapper,
  buildItemMenuDataCy,
} from '../../../../../src/config/selectors';
import { HOME_PATH, buildItemPath } from '../../utils';

const editEtherpad = (
  {
    name,
    toggleAllowReadersToWrite,
  }: {
    name?: string;
    toggleAllowReadersToWrite?: boolean;
  },
  { confirm = true }: { confirm?: boolean } = {},
) => {
  cy.get(`.${EDIT_ITEM_BUTTON_CLASS}`).click();

  if (name) {
    cy.get(`#${ITEM_FORM_NAME_INPUT_ID}`).type(`{selectall}{backspace}${name}`);
  }

  if (toggleAllowReadersToWrite) {
    cy.get(`#${ETHERPAD_ALLOW_READER_TO_WRITE_SETTING_ID}`).click();
  }

  if (confirm) {
    cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();
  }
};

describe('Edit Etherpad', () => {
  it('edit etherpad on Home', () => {
    const itemToEdit = PackedEtherpadItemFactory({
      extra: {
        etherpad: {
          padID: 'padId',
          groupID: 'groupId',
          readerPermission: EtherpadPermission.Read,
        },
      },
    });
    cy.setUpApi({ items: [itemToEdit] });
    cy.visit(HOME_PATH);

    cy.intercept(`/items/etherpad/${itemToEdit.id}`, (request) => {
      request.reply(itemToEdit);
    }).as('editEtherpad');

    // edit
    cy.get(buildDataCyWrapper(buildItemMenuDataCy(itemToEdit.id))).click();
    editEtherpad({
      name: 'newName',
      toggleAllowReadersToWrite: true,
    });

    cy.wait('@editEtherpad').then(
      ({
        request: {
          body: { name, readerPermission },
        },
      }) => {
        // check item is edited
        cy.get('@getAccessibleItems');
        expect(name).to.equal('newName');
        expect(readerPermission).to.eq('write');
      },
    );
  });

  it('edit reader permission of etherpad', () => {
    const parentItem = PackedFolderItemFactory();
    const itemToEdit = PackedEtherpadItemFactory({
      parentItem,
      extra: {
        etherpad: {
          padID: 'padId',
          groupID: 'groupId',
          readerPermission: EtherpadPermission.Read,
        },
      },
    });
    cy.setUpApi({ items: [parentItem, itemToEdit] });
    cy.intercept(`/items/etherpad/${itemToEdit.id}`, (request) => {
      request.reply(itemToEdit);
    }).as('editEtherpad');

    // go in child item
    cy.visit(buildItemPath(itemToEdit.id));

    // edit reader permission
    // cy.get(buildDataCyWrapper(buildItemMenuDataCy(itemToEdit.id))).click();
    editEtherpad({ toggleAllowReadersToWrite: true });

    cy.wait('@editEtherpad').then(({ request: { body } }) => {
      // check item is edited
      cy.get('@getAccessibleItems');
      expect(body.readerPermission).to.equal('write');
    });
  });
});
