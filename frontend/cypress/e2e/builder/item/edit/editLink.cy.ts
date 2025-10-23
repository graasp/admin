import { HttpMethod, PackedLinkItemFactory, buildLinkExtra } from '@graasp/sdk';

import {
  ACCESSIBLE_ITEMS_TABLE_ID,
  EDIT_ITEM_BUTTON_CLASS,
  EDIT_ITEM_MODAL_CANCEL_BUTTON_ID,
  EDIT_MODAL_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
  ITEM_FORM_LINK_INPUT_ID,
  ITEM_FORM_NAME_INPUT_ID,
  ITEM_MAIN_CLASS,
  TEXT_EDITOR_CLASS,
  buildDataCyWrapper,
  buildEditButtonId,
  buildItemMenuDataCy,
} from '../../../../../src/config/selectors';
import { CURRENT_MEMBER } from '../../../../fixtures/members';
import { EDIT_ITEM_PAUSE } from '../../../../support/constants';
import { editCaptionFromViewPage } from '../../../../support/editUtils';
import { ID_FORMAT } from '../../../../support/utils';
import { HOME_PATH, buildItemPath } from '../../utils';

const editItemLink = (payload: { name?: string; url?: string }) => {
  cy.get(`.${EDIT_ITEM_BUTTON_CLASS}`).click();
  if (payload.name) {
    cy.get(`#${ITEM_FORM_NAME_INPUT_ID}`).clear().type(payload.name);
  }
  if (payload.url) {
    cy.get(`#${ITEM_FORM_LINK_INPUT_ID}`).clear().type(payload.url);
  }
  cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();
};

const GRAASP_LINK_ITEM = PackedLinkItemFactory({
  creator: CURRENT_MEMBER,
  description: 'my link',
  extra: buildLinkExtra({
    url: 'https://graasp.eu',
    html: '',
    thumbnails: ['https://graasp.eu/img/epfl/logo-tile.png'],
    icons: [
      'https://graasp.eu/cdn/img/epfl/favicons/favicon-32x32.png?v=yyxJ380oWY',
    ],
  }),
});

describe('Edit Link', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [GRAASP_LINK_ITEM] });

    cy.intercept({
      method: HttpMethod.Patch,
      url: new RegExp(`/items/embedded-links/${ID_FORMAT}`),
    }).as('editItemLink');
  });

  it('edit caption', () => {
    const { id } = GRAASP_LINK_ITEM;
    cy.visit(buildItemPath(id));
    const caption = 'new caption';
    editCaptionFromViewPage({ id, caption });
    cy.wait(`@editItemLink`).then(({ request: { url, body } }) => {
      expect(url).to.contain(id);
      // caption content might be wrapped with html tags
      expect(body?.description).to.contain(caption);
    });
  });

  it('cancel caption', () => {
    const { id, description } = GRAASP_LINK_ITEM;
    cy.visit(buildItemPath(id));
    cy.get(`#${buildEditButtonId(id)}`).click();
    cy.get(`#${EDIT_MODAL_ID} .${TEXT_EDITOR_CLASS}`).type(
      `{selectall}{backspace}`,
    );
    cy.get(`#${EDIT_ITEM_MODAL_CANCEL_BUTTON_ID}`).click();
    cy.get(`.${ITEM_MAIN_CLASS} .${TEXT_EDITOR_CLASS}`)
      .should('exist')
      .and('contain.text', description);
    cy.get(`#${EDIT_ITEM_MODAL_CANCEL_BUTTON_ID}`).should('not.exist');
  });

  it('edit link on Home', () => {
    cy.visit(HOME_PATH);

    const itemToEdit = GRAASP_LINK_ITEM;
    const newName = 'new name';

    // edit
    cy.get(buildDataCyWrapper(buildItemMenuDataCy(itemToEdit.id))).click();
    editItemLink({
      ...itemToEdit,
      name: newName,
    });

    cy.get(buildDataCyWrapper(buildItemMenuDataCy(itemToEdit.id))).click();
    cy.wait('@editItemLink').then(
      ({
        request: {
          url,
          body: { name },
        },
      }) => {
        // check item is edited and updated
        cy.wait(EDIT_ITEM_PAUSE);
        cy.get('@getAccessibleItems');
        expect(url).to.contain(itemToEdit.id);
        expect(name).to.equal(newName);
      },
    );
  });

  it.only('update name and link', () => {
    cy.visit(HOME_PATH);

    const itemToEdit = GRAASP_LINK_ITEM;
    const newUrl = 'http://example.org';
    const newName = 'newName';

    cy.get(`#${ACCESSIBLE_ITEMS_TABLE_ID}`).should('be.visible');

    // edit

    cy.get(buildDataCyWrapper(buildItemMenuDataCy(itemToEdit.id))).click();
    editItemLink({
      ...itemToEdit,
      ...{ name: newName, url: newUrl },
    });

    cy.wait('@editItemLink').then(
      ({
        request: {
          url,
          body: { name, url: sentUrl },
        },
      }) => {
        // check item is edited and updated
        cy.wait(EDIT_ITEM_PAUSE);
        cy.get('@getAccessibleItems');
        expect(url).to.contain(itemToEdit.id);
        expect(name).to.equal(newName);
        expect(sentUrl).to.equal(newUrl);
      },
    );
  });

  it('replace name on link change', () => {
    cy.visit(HOME_PATH);

    const itemToEdit = GRAASP_LINK_ITEM;
    const newUrl = 'http://example.org';

    cy.get(buildDataCyWrapper(buildItemMenuDataCy(itemToEdit.id))).click();
    cy.get(`.${EDIT_ITEM_BUTTON_CLASS}`).click();

    // clear name input
    cy.get(`#${ITEM_FORM_NAME_INPUT_ID}`).clear();

    // edit url field, this should update the name input
    cy.get(`#${ITEM_FORM_LINK_INPUT_ID}`).clear().type(newUrl);

    // save
    cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();

    cy.wait('@editItemLink').then(
      ({
        request: {
          url,
          body: { name, url: sentUrl },
        },
      }) => {
        // check item is edited and updated
        cy.wait(EDIT_ITEM_PAUSE);
        cy.get('@getAccessibleItems');
        expect(url).to.contain(itemToEdit.id);
        expect(name).to.equal('Page title'); // equal to mocked data for link metadata endpoint
        expect(sentUrl).to.equal(newUrl);
      },
    );
  });
});
