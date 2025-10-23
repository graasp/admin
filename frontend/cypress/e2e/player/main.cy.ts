import {
  DiscriminatedItem,
  DocumentItemFactory,
  PermissionLevel,
} from '@graasp/sdk';

import {
  FOLDER_NAME_TITLE_CLASS,
  MAIN_MENU_ID,
} from '../../../src/config/selectors';
import { GRAASP_APP_ITEM } from '../../fixtures/apps';
import {
  IMAGE_ITEM_DEFAULT,
  PDF_ITEM_DEFAULT,
  VIDEO_ITEM_DEFAULT,
} from '../../fixtures/files';
import {
  FOLDER_WITHOUT_CHILDREN_ORDER,
  FOLDER_WITH_SUBFOLDER_ITEM,
} from '../../fixtures/items';
import {
  GRAASP_LINK_ITEM,
  GRAASP_LINK_ITEM_IFRAME_ONLY,
  YOUTUBE_LINK_ITEM,
} from '../../fixtures/links';
import { MEMBERS } from '../../fixtures/members';
import {
  PUBLIC_STATIC_ELECTRICITY,
  STATIC_ELECTRICITY,
} from '../../fixtures/useCases/staticElectricity';
import {
  buildContentPagePath,
  expectAppViewScreenLayout,
  expectDocumentViewScreenLayout,
  expectFileViewScreenLayout,
  expectFolderButtonLayout,
  expectFolderLayout,
  expectLinkViewScreenLayout,
} from './utils';

const GRAASP_DOCUMENT_ITEM = DocumentItemFactory();
const items = [
  { ...GRAASP_LINK_ITEM, permission: PermissionLevel.Admin },
  {
    ...GRAASP_LINK_ITEM_IFRAME_ONLY,
    permission: PermissionLevel.Admin,
  },
  { ...YOUTUBE_LINK_ITEM, permission: PermissionLevel.Admin },
  { ...IMAGE_ITEM_DEFAULT, permission: PermissionLevel.Admin },
  { ...VIDEO_ITEM_DEFAULT, permission: PermissionLevel.Admin },
  { ...PDF_ITEM_DEFAULT, permission: PermissionLevel.Admin },
  { ...GRAASP_DOCUMENT_ITEM, permission: PermissionLevel.Admin },
  { ...GRAASP_APP_ITEM, permission: PermissionLevel.Admin },
  ...FOLDER_WITH_SUBFOLDER_ITEM.items,
  ...FOLDER_WITHOUT_CHILDREN_ORDER.items,
];

describe('Main Screen', () => {
  describe('Individual Items', () => {
    beforeEach(() => {
      cy.setUpApi({
        items,
      });
    });

    describe('Links', () => {
      it('Website link', () => {
        const { id } = GRAASP_LINK_ITEM;
        cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

        expectLinkViewScreenLayout(GRAASP_LINK_ITEM);
      });
      it('Website link as iframe', () => {
        const { id } = GRAASP_LINK_ITEM_IFRAME_ONLY;
        cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

        expectLinkViewScreenLayout(GRAASP_LINK_ITEM_IFRAME_ONLY);
      });
      it('Youtube link', () => {
        const { id } = YOUTUBE_LINK_ITEM;
        cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

        expectLinkViewScreenLayout(YOUTUBE_LINK_ITEM);
      });
    });

    describe('Files', () => {
      it('Image', () => {
        const { id } = IMAGE_ITEM_DEFAULT;
        cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

        expectFileViewScreenLayout(IMAGE_ITEM_DEFAULT);
      });
      it('Video', () => {
        const { id } = VIDEO_ITEM_DEFAULT;
        cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

        expectFileViewScreenLayout(VIDEO_ITEM_DEFAULT);
      });
      it('Pdf', () => {
        const { id } = PDF_ITEM_DEFAULT;
        cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

        expectFileViewScreenLayout(PDF_ITEM_DEFAULT);
      });
    });

    describe('Documents', () => {
      it('Graasp Document', () => {
        cy.visit(
          buildContentPagePath({
            rootId: GRAASP_DOCUMENT_ITEM.id,
            itemId: GRAASP_DOCUMENT_ITEM.id,
          }),
        );

        expectDocumentViewScreenLayout(GRAASP_DOCUMENT_ITEM);
      });
    });

    describe('Apps', () => {
      it('App', () => {
        cy.visit(
          buildContentPagePath({
            rootId: GRAASP_APP_ITEM.id,
            itemId: GRAASP_APP_ITEM.id,
          }),
        );

        expectAppViewScreenLayout(GRAASP_APP_ITEM);
      });
    });

    describe('Folders', () => {
      it('Display sub Folder', () => {
        const parent = FOLDER_WITH_SUBFOLDER_ITEM.items[0];
        cy.visit(
          buildContentPagePath({ rootId: parent.id, itemId: parent.id }),
        );

        cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', parent.name);

        expectFolderButtonLayout(FOLDER_WITH_SUBFOLDER_ITEM.items[1]);
      });
      it('Display Folder without childrenOrder', () => {
        const parent = FOLDER_WITHOUT_CHILDREN_ORDER.items[0];
        cy.visit(
          buildContentPagePath({ rootId: parent.id, itemId: parent.id }),
        );

        cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', parent.name);
      });
    });
  });

  describe('Use cases', () => {
    it(`Display ${STATIC_ELECTRICITY.items[0].name}`, () => {
      cy.setUpApi(STATIC_ELECTRICITY);
      const parentFolder = STATIC_ELECTRICITY.items[0];
      const rootId = parentFolder.id;
      cy.visit(buildContentPagePath({ rootId, itemId: rootId }));

      expectFolderLayout({
        rootId,
        items: STATIC_ELECTRICITY.items as DiscriminatedItem[],
      });
    });
    it(`Cannot display ${STATIC_ELECTRICITY.items[0].name} if does not have membership`, () => {
      cy.setUpApi({
        items: STATIC_ELECTRICITY.items.map((i) => {
          const { permission: _permission, ...item } = i;
          return item;
        }),
        currentMember: MEMBERS.BOB,
      });
      const parentFolder = STATIC_ELECTRICITY.items[0];
      const rootId = parentFolder.id;
      cy.visit(buildContentPagePath({ rootId, itemId: rootId }));
      cy.get(`#${MAIN_MENU_ID}`).should('not.exist');
    });
    it(`Display ${PUBLIC_STATIC_ELECTRICITY.items[0].name}`, () => {
      cy.setUpApi({ ...PUBLIC_STATIC_ELECTRICITY, currentMember: MEMBERS.BOB });
      const parentFolder = PUBLIC_STATIC_ELECTRICITY.items[0];
      const rootId = parentFolder.id;
      cy.visit(buildContentPagePath({ rootId, itemId: rootId }));

      expectFolderLayout({
        rootId,
        items: PUBLIC_STATIC_ELECTRICITY.items as DiscriminatedItem[],
      });
    });
  });

  describe('Write access', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: [GRAASP_DOCUMENT_ITEM, ...FOLDER_WITH_SUBFOLDER_ITEM.items],
      });
    });
    // todo: check that the builder can be accessed using the navigation
  });
});
