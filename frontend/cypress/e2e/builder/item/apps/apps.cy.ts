import { ItemType, PackedAppItemFactory } from '@graasp/sdk';

import { buildAppItemLinkForTest } from '../../fixtures/apps';
import { buildItemPath } from '../../utils';

const clickElementInIframe = (
  iframeSelector: string,
  elementSelector: string,
) => {
  cy.iframe(iframeSelector).find(elementSelector).should('be.visible').click();
};
const checkContentInElementInIframe = (
  iframeSelector: string,
  elementSelector: string,
  content: string,
) => {
  cy.iframe(iframeSelector).find(elementSelector).should('contain', content);
};

const APP = PackedAppItemFactory({
  extra: {
    [ItemType.APP]: {
      url: `${Cypress.env('VITE_GRAASP_API_HOST')}/${buildAppItemLinkForTest(
        'app.html',
      )}`,
    },
  },
});

describe('Apps', () => {
  it('App should request context', () => {
    const { id, name } = APP;
    cy.setUpApi({ items: [APP] });
    cy.visit(buildItemPath(id));

    cy.wait(2000);

    const iframeSelector = `iframe[title="${name}"]`;

    // check app receives successfully the context
    clickElementInIframe(iframeSelector, '#requestContext');
    checkContentInElementInIframe(
      iframeSelector,
      '#requestContext-message',
      id,
    );

    // check app receives successfully the token
    clickElementInIframe(iframeSelector, '#requestToken');
    checkContentInElementInIframe(
      iframeSelector,
      'ul',
      `GET_AUTH_TOKEN_SUCCESS_${id}`,
    );

    // check app can get app-data
    clickElementInIframe(iframeSelector, '#createAppData');
    checkContentInElementInIframe(iframeSelector, 'ul', 'get app data');
    // check app can post app-data
    clickElementInIframe(iframeSelector, '#postAppData');
    checkContentInElementInIframe(iframeSelector, 'ul', 'post app data');
    // check app can delete app-data
    clickElementInIframe(iframeSelector, '#deleteAppData');
    checkContentInElementInIframe(iframeSelector, 'ul', 'delete app data');
    // check app can patch app-data
    clickElementInIframe(iframeSelector, '#patchAppData');
    checkContentInElementInIframe(iframeSelector, 'ul', 'patch app data');
  });
});
