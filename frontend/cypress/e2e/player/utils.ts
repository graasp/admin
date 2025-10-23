import {
  AppItemType,
  CompleteGuest,
  DiscriminatedItem,
  DocumentItemType,
  FileItemType,
  HttpMethod,
  ItemType,
  LinkItemType,
  MimeTypes,
  appendQueryParamToUrl,
  getDocumentExtra,
  getFileExtra,
  getLinkExtra,
  getParentFromPath,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import { DEFAULT_LINK_SHOW_BUTTON } from '../../../src/config/constants';
import {
  MAIN_MENU_ID,
  buildAppId,
  buildDocumentId,
  buildFileId,
  buildLinkItemId,
  buildTreeItemClass,
} from '../../../src/config/selectors';
import { API_ROUTES } from '../../../src/query/routes';
import { API_HOST } from '../../support/env';

export const buildContentPagePath = ({
  rootId = `:rootId`,
  itemId = `:itemId`,
  searchParams = '',
} = {}): string => {
  let url = `/player/${rootId}/${itemId}`;
  // append search parameters if present
  if (searchParams) {
    url = `${url}?${searchParams}`;
  }
  return url;
};

export const buildMainPath = ({ rootId = ':rootId' } = {}): string =>
  `/player/${rootId}/${rootId}`;

export const expectLinkViewScreenLayout = ({
  id,
  extra,
  settings,
}: LinkItemType): void => {
  const { url, html } = getLinkExtra(extra) || {};

  // embedded element
  if (html) {
    cy.get(`#${id}`).then((element) => {
      // transform innerhtml content to match provided html
      const parsedHtml = element.html().replaceAll('=""', '');
      expect(parsedHtml).to.contain(html);
    });
  } else if (settings?.showLinkIframe) {
    cy.get(`iframe#${id}`).should('have.attr', 'src', url);
  }

  if (!html) {
    if (settings?.showLinkButton ?? DEFAULT_LINK_SHOW_BUTTON) {
      cy.get(`#${buildLinkItemId(id)}`).scrollIntoView();
      if (settings?.isCollapsible) {
        cy.get(`#${buildLinkItemId(id)}`).click();
      }
      cy.get('[data-testid="fancy-link-card"]')
        .scrollIntoView()
        .should('be.visible');
    } else {
      // button should not be shown when the setting is false
      cy.get(`#${buildLinkItemId(id)}`).scrollIntoView();
      cy.get(`#${buildLinkItemId(id)} [data-testid="fancy-link-card"]`).should(
        'not.exist',
      );
    }
  }
};

export const expectAppViewScreenLayout = ({ id, extra }: AppItemType): void => {
  const { url } = extra.app;

  const appUrl = appendQueryParamToUrl(url, { itemId: id });

  cy.get(`iframe#${buildAppId(id)}`)
    .invoke('attr', 'src')
    .should('contain', appUrl);
};

export const expectFileViewScreenLayout = ({
  id,
  extra,
}: FileItemType): void => {
  const mimetype = getFileExtra(extra)?.mimetype ?? '';
  // embedded element
  let selector = '';
  if (MimeTypes.isImage(mimetype)) {
    selector = `img#${buildFileId(id)}`;
  } else if (MimeTypes.isVideo(mimetype)) {
    selector = `video#${buildFileId(id)}`;
  } else if (MimeTypes.isPdf(mimetype)) {
    selector = `embed#${buildFileId(id)}`;
  }
  cy.get(selector).should('exist');
};

export const expectDocumentViewScreenLayout = ({
  id,
  extra,
}: DocumentItemType): void => {
  cy.get(`#${buildDocumentId(id)}`).then((editor) => {
    expect(editor.html()).to.contain(getDocumentExtra(extra)?.content);
  });
};

export const expectFolderButtonLayout = ({ name }: { name: string }): void => {
  cy.get(`#${MAIN_MENU_ID}`).contains(name);
};

export const expectFolderLayout = ({
  rootId,
  items,
}: {
  rootId: string;
  items: DiscriminatedItem[];
}): void => {
  const children = items.filter(
    (item) => getParentFromPath(item.path) === rootId,
  );

  children.forEach((item) => {
    switch (item.type) {
      case ItemType.FOLDER:
        expectFolderButtonLayout(item);
        break;
      case ItemType.FILE:
        expectFileViewScreenLayout(item);
        break;
      case ItemType.LINK:
        expectLinkViewScreenLayout(item);
        break;
      case ItemType.DOCUMENT:
        expectDocumentViewScreenLayout(item);
        break;
      case ItemType.APP:
        expectAppViewScreenLayout(item);
        break;
      default:
        throw new Error(`No defined case for item of type ${item.type}`);
    }
  });

  children
    .filter(({ type }) => type === ItemType.FOLDER)
    .forEach(({ id }) => {
      // click in mainmenu
      // there are two because of th two menus
      cy.get(`.${buildTreeItemClass(id)}:visible`).click();

      expectFolderLayout({ rootId: id, items });
    });
};

const {
  buildPostItemLoginSignInRoute,
  buildGetItemLoginSchemaTypeRoute,
  buildGetCurrentMemberRoute,
  buildGetItemRoute,
} = API_ROUTES;

export class TestHelper {
  private isLoggedIn: boolean = false;
  private readonly hasAccessToItem: boolean = true;
  private readonly pseudoMember: CompleteGuest;
  private readonly item: DiscriminatedItem;
  private readonly returnItemLoginSchemaType: boolean = true;

  constructor(args: {
    pseudoMember: CompleteGuest;
    item: DiscriminatedItem;
    initiallyIsLoggedIn?: boolean;
    returnItemLoginSchemaType?: boolean;
    hasAccessToItem?: boolean;
  }) {
    this.pseudoMember = structuredClone(args.pseudoMember);
    this.item = structuredClone(args.item);
    if (args.initiallyIsLoggedIn) {
      this.isLoggedIn = true;
    }
    if (args.returnItemLoginSchemaType === false) {
      this.returnItemLoginSchemaType = false;
    }
    this.hasAccessToItem = args.hasAccessToItem ?? true;
  }

  setupServer() {
    // current member call
    cy.intercept(
      {
        method: HttpMethod.Get,
        url: `${API_HOST}/${buildGetCurrentMemberRoute()}`,
      },
      ({ reply }) => {
        if (this.isLoggedIn) {
          return reply({
            statusCode: StatusCodes.OK,
            body: this.pseudoMember,
          });
        }
        return reply({ statusCode: StatusCodes.UNAUTHORIZED });
      },
    ).as('getCurrentMember');
    // allow to login
    cy.intercept(
      {
        method: HttpMethod.Post,
        url: `${API_HOST}/${buildPostItemLoginSignInRoute(this.item.id)}`,
      },
      ({ reply }) => {
        if (this.returnItemLoginSchemaType) {
          // save that the user is now logged in
          this.isLoggedIn = true;
          return reply({ statusCode: StatusCodes.NO_CONTENT });
        }
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      },
    ).as('postItemLoginSchemaType');
    cy.intercept(
      {
        method: HttpMethod.Get,
        url: `${API_HOST}/${buildGetItemLoginSchemaTypeRoute(this.item.id)}`,
      },
      ({ reply }) => {
        if (this.returnItemLoginSchemaType) {
          return reply(this.pseudoMember.itemLoginSchema.type);
        }
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      },
    ).as('getItemLoginSchemaType');

    cy.intercept(
      {
        method: HttpMethod.Get,
        url: new RegExp(`${API_HOST}/${buildGetItemRoute(this.item.id)}$`),
      },
      ({ reply }) => {
        if (this.hasAccessToItem) {
          if (this.isLoggedIn) {
            reply(this.item);
          }
        }
      },
    ).as('getItem');

    cy.intercept(
      {
        method: HttpMethod.Post,
        url: '/logout',
      },
      ({ reply }) => {
        this.isLoggedIn = false;

        reply({ statusCode: StatusCodes.OK });
      },
    ).as('signOut');
  }
}
