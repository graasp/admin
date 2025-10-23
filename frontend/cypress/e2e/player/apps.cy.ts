import {
  APP_USING_CONTEXT_ITEM,
  PUBLIC_APP_USING_CONTEXT_ITEM,
} from '../../fixtures/apps';
import { buildContentPagePath } from './utils';

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

describe('Apps', () => {
  it('App should request context', () => {
    const { id, name } = APP_USING_CONTEXT_ITEM;
    cy.setUpApi({ items: [APP_USING_CONTEXT_ITEM] });
    cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

    cy.wait(3000);
    const iframeSelector = `iframe[title="${name}"]`;
    cy.iframe(iframeSelector);

    // check app receives successfully the context
    clickElementInIframe(iframeSelector, '#requestContext');
    checkContentInElementInIframe(
      iframeSelector,
      '#requestContext-message',
      id,
    );

    // check app receives successfully the token
    clickElementInIframe(iframeSelector, '#requestToken');
    cy.wait('@appApiAccessToken');
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

describe('Public Apps', () => {
  const { id, name } = PUBLIC_APP_USING_CONTEXT_ITEM;
  beforeEach(() => {
    cy.setUpApi({
      items: [PUBLIC_APP_USING_CONTEXT_ITEM],
      currentMember: null,
    });

    cy.visit(buildContentPagePath({ rootId: id, itemId: id }));
  });

  it('Public App should request context', () => {
    cy.wait(3000);
    const iframeSelector = `iframe[title="${name}"]`;
    cy.iframe(iframeSelector);

    // check app receives successfully the context
    clickElementInIframe(iframeSelector, '#requestContext');
    checkContentInElementInIframe(
      iframeSelector,
      '#requestContext-message',
      id,
    );

    // check app receives successfully the token
    clickElementInIframe(iframeSelector, '#requestToken');
    cy.wait('@appApiAccessToken');
    checkContentInElementInIframe(
      iframeSelector,
      'ul',
      `GET_AUTH_TOKEN_SUCCESS_${id}`,
    );
  });
});
