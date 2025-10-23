import { buildItemCard } from '../../../../../src/config/selectors';
import { expectFileViewScreenLayout } from '../../../../support/viewUtils';
import {
  IMAGE_ITEM_DEFAULT,
  PDF_ITEM_DEFAULT,
  VIDEO_ITEM_DEFAULT,
} from '../../fixtures/files';
import { HOME_PATH } from '../../utils';

describe('View Files', () => {
  beforeEach(() => {
    cy.setUpApi({
      items: [IMAGE_ITEM_DEFAULT, VIDEO_ITEM_DEFAULT, PDF_ITEM_DEFAULT],
    });
    cy.visit(HOME_PATH);
  });
  it('image', () => {
    // item is displayed in table
    cy.get(`#${buildItemCard(IMAGE_ITEM_DEFAULT.id)}`).should('exist');

    // item metadata
    cy.goToItemInCard(IMAGE_ITEM_DEFAULT.id);
    expectFileViewScreenLayout({ item: IMAGE_ITEM_DEFAULT });
  });

  it('video', () => {
    // item is displayed in table
    cy.get(`#${buildItemCard(VIDEO_ITEM_DEFAULT.id)}`).should('exist');

    // item metadata
    cy.goToItemInCard(VIDEO_ITEM_DEFAULT.id);
    expectFileViewScreenLayout({ item: VIDEO_ITEM_DEFAULT });
  });

  it('pdf', () => {
    // item is displayed in table
    cy.get(`#${buildItemCard(PDF_ITEM_DEFAULT.id)}`).should('exist');

    // item metadata
    cy.goToItemInCard(PDF_ITEM_DEFAULT.id);
    expectFileViewScreenLayout({ item: PDF_ITEM_DEFAULT });
  });
});
