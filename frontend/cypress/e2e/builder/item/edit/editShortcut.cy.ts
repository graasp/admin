import { PackedShortcutItemFactory } from '@graasp/sdk';

import {
  buildDataCyWrapper,
  buildItemMenuDataCy,
} from '../../../../../src/config/selectors';
import { EDIT_ITEM_PAUSE } from '../../../../support/constants';
import { editItem } from '../../../../support/editUtils';
import { HOME_PATH } from '../../utils';

const EDITED_FIELDS = {
  name: 'new name',
};

const SHORTCUT = PackedShortcutItemFactory();

describe('Edit Shortcut', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [SHORTCUT] });
  });

  it('edit shortcut on Home', () => {
    cy.visit(HOME_PATH);

    const itemToEdit = SHORTCUT;

    // edit
    cy.get(buildDataCyWrapper(buildItemMenuDataCy(itemToEdit.id))).click();
    editItem({
      ...itemToEdit,
      ...EDITED_FIELDS,
    });

    cy.wait('@editItem').then(
      ({
        response: {
          body: { id, name },
        },
      }) => {
        // check item is edited and updated
        cy.wait(EDIT_ITEM_PAUSE);
        cy.get('@getAccessibleItems');
        expect(id).to.equal(itemToEdit.id);
        expect(name).to.equal(EDITED_FIELDS.name);
      },
    );
  });
});
