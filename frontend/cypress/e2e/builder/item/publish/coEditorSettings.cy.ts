import { PackedFolderItemFactory } from '@graasp/sdk';

import {
  CO_EDITOR_SETTINGS_CHECKBOX_ID,
  CO_EDITOR_SETTINGS_RADIO_GROUP_ID,
  ITEM_HEADER_ID,
  buildDataCyWrapper,
  buildPublishButtonId,
} from '../../../../../src/config/selectors';
import { DISPLAY_CO_EDITORS_OPTIONS } from '../../../../../src/modules/builder/constants';
import { MEMBERS } from '../../../../fixtures/members';
import { EDIT_TAG_REQUEST_TIMEOUT } from '../../../../support/constants';
import { ITEM_WITH_TAGS_CONTEXT } from '../../fixtures/tags';
import { buildItemPath } from '../../utils';

const openPublishItemTab = (id: string) => {
  cy.get(`#${buildPublishButtonId(id)}`).click();
};
const visitItemPage = () => {
  cy.setUpApi(ITEM_WITH_TAGS_CONTEXT);
  const item = ITEM_WITH_TAGS_CONTEXT.items[0];
  cy.visit(buildItemPath(item.id));
  openPublishItemTab(item.id);
};

describe('Co-editor Setting', () => {
  it('Display choices', () => {
    visitItemPage();

    cy.get(buildDataCyWrapper(CO_EDITOR_SETTINGS_CHECKBOX_ID)).should(
      'be.visible',
    );
  });
});

it('Change choice', () => {
  visitItemPage();
  const item = ITEM_WITH_TAGS_CONTEXT.items[0];
  const newOptionValue = DISPLAY_CO_EDITORS_OPTIONS.NO.value;

  cy.wait('@getPublicationStatus').then(() => {
    cy.get(buildDataCyWrapper(CO_EDITOR_SETTINGS_CHECKBOX_ID)).click();
  });

  cy.wait('@editItem', { timeout: EDIT_TAG_REQUEST_TIMEOUT }).then((data) => {
    const {
      request: { url, body },
    } = data;
    expect(url.split('/')).contains(item.id);
    expect(body.settings.displayCoEditors).equals(newOptionValue);
  });
});

const item = PackedFolderItemFactory(
  {},
  { permission: null, publicVisibility: { type: 'public' } },
);

describe('Co-editor setting permissions', () => {
  it('User signed out cannot edit co-editor setting', () => {
    cy.setUpApi({
      items: [item],
      currentMember: null,
    });
    cy.visit(buildItemPath(item.id));

    cy.get(`#${ITEM_HEADER_ID}`).should('be.visible');
    // signed-out user should not see publish button on public item
    cy.get(`#${buildPublishButtonId(item.id)}`).should('not.exist');
    cy.get(`#${CO_EDITOR_SETTINGS_RADIO_GROUP_ID}`).should('not.exist');
  });

  it('Read-only user cannot edit co-editor setting', () => {
    cy.setUpApi({
      items: [item],
      currentMember: MEMBERS.BOB,
    });
    cy.visit(buildItemPath(item.id));

    cy.get(`#${ITEM_HEADER_ID}`).should('be.visible');
    cy.get(`#${buildPublishButtonId(item.id)}`).should('not.exist');
  });
});
