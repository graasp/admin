import {
  ExportActionsFormatting,
  HttpMethod,
  MemberFactory,
} from '@graasp/sdk';

import {
  EXPORT_ACTIONS_BUTTON_ID,
  buildSelectExportFormatID,
} from '../../../src/modules/analytics/config/selectors';
import { ITEM_TO_EXPORT } from '../../fixtures/analytics/items';
import { API_HOST } from '../../support/env';

describe('Check exporting analytics for allowed formats', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [ITEM_TO_EXPORT], currentMember: MemberFactory() });
  });

  [ExportActionsFormatting.CSV, ExportActionsFormatting.JSON].forEach(
    (format) => {
      it(`Check export to ${format} button disabled after first export`, () => {
        cy.intercept(
          {
            method: HttpMethod.Post,
            url: `${API_HOST}/items/${ITEM_TO_EXPORT.id}/actions/export?format=${format}`,
          },
          ({ reply }) => {
            return reply({});
          },
        ).as('export');

        cy.visit(`/analytics/items/${ITEM_TO_EXPORT.id}/export`);
        cy.get(`#${buildSelectExportFormatID(format)}`).click({
          force: true,
        });
        cy.get(`#${EXPORT_ACTIONS_BUTTON_ID}`).click();
        cy.get(`#${EXPORT_ACTIONS_BUTTON_ID}`).should('be.disabled');
      });
    },
  );
});
