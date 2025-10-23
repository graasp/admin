import type { JSX } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Alert, Container, Skeleton, Stack, styled } from '@mui/material';

import {
  AppItemType,
  Context,
  DocumentItemType,
  EtherpadItemType,
  FileItemType,
  H5PItemType,
  ItemType,
  LinkItemType,
  PackedItem,
  PageItemType,
  PermissionLevel,
  PermissionLevelOptions,
  ShortcutItemType,
  buildPdfViewerLink,
  getH5PExtra,
  getLinkThumbnailUrl,
  getShortcutExtra,
} from '@graasp/sdk';

import { type AuthenticatedUser, useAuth } from '@/AuthContext';
import { Editor } from '@/components/page/Editor';
import { PageReader } from '@/components/page/PageReader';
import { DEFAULT_LANG, NS } from '@/config/constants';
import { API_HOST, GRAASP_ASSETS_URL, H5P_INTEGRATION_URL } from '@/config/env';
import { hooks } from '@/config/queryClient';
import {
  DOCUMENT_ITEM_TEXT_EDITOR_ID,
  ITEM_SCREEN_ERROR_ALERT_ID,
  buildFileItemId,
} from '@/config/selectors';
import { Api } from '@/query';
import Loader from '@/ui/Loader/Loader';
import AppItem from '@/ui/items/AppItem';
import DocumentItem from '@/ui/items/DocumentItem';
import EtherpadItem from '@/ui/items/EtherpadItem';
import FileItem from '@/ui/items/FileItem';
import H5PItem from '@/ui/items/H5PItem';
import LinkItem from '@/ui/items/LinkItem';

import { useOutletContext } from '~builder/contexts/OutletContext';

import ErrorAlert from '../common/ErrorAlert';
import FolderContent from './FolderContent';
import FileAlignmentSetting from './settings/file/FileAlignmentSetting';
import FileMaxWidthSetting from './settings/file/FileMaxWidthSetting';
import { SettingVariant } from './settings/settingTypes';

const ITEM_DEFAULT_HEIGHT = '70vh';

const { useFileContentUrl, useEtherpad } = hooks;

const StyledContainer = styled(Container)(() => ({
  flexGrow: 1,
}));

/**
 * Helper component to render typed file items
 */
const FileContent = ({ item }: { item: FileItemType }): JSX.Element | null => {
  const { data: fileUrl, isLoading, isError } = useFileContentUrl(item.id);

  if (fileUrl) {
    return (
      <StyledContainer>
        <Stack direction="column" alignItems="center" gap={2} width="100%">
          <Stack direction="row" gap={1}>
            <FileMaxWidthSetting item={item} variant={SettingVariant.Button} />
            <FileAlignmentSetting item={item} variant={SettingVariant.Button} />
          </Stack>
          <FileItem
            fileUrl={fileUrl}
            id={buildFileItemId(item.id)}
            item={item}
            pdfViewerLink={buildPdfViewerLink(GRAASP_ASSETS_URL)}
          />
        </Stack>
      </StyledContainer>
    );
  }

  if (isLoading) {
    return <Skeleton height="50vh" />;
  }

  if (isError) {
    return <ErrorAlert id={ITEM_SCREEN_ERROR_ALERT_ID} />;
  }

  return null;
};

/**
 * Helper component to render typed link items
 */
const LinkContent = ({
  item,
  member,
}: {
  item: LinkItemType;
  member?: { id: string } | null;
}): JSX.Element => (
  <LinkItem
    id={item.id}
    memberId={member?.id}
    isResizable
    item={item}
    thumbnail={getLinkThumbnailUrl(item.extra)}
    height={ITEM_DEFAULT_HEIGHT}
    showButton={Boolean(item.settings?.showLinkButton)}
    showIframe={Boolean(item.settings?.showLinkIframe)}
  />
);

/**
 * Helper component to render typed document items
 */
const DocumentContent = ({ item }: { item: DocumentItemType }): JSX.Element => (
  <StyledContainer>
    <DocumentItem id={DOCUMENT_ITEM_TEXT_EDITOR_ID} item={item} />
  </StyledContainer>
);

/**
 * Helper component to render typed app items
 */
const AppContent = ({
  item,
  member,
  permission,
}: {
  item: AppItemType;
  member?: AuthenticatedUser | null;
  permission?: PermissionLevelOptions | null;
}): JSX.Element => (
  <AppItem
    isResizable={false}
    item={item}
    height="100%"
    requestApiAccessToken={(payload: {
      id: string;
      key: string;
      origin: string;
    }) => Api.requestApiAccessToken(payload)}
    contextPayload={{
      apiHost: API_HOST,
      itemId: item.id,
      accountId: member?.id,
      permission: permission ?? PermissionLevel.Read,
      settings: item.settings,
      lang: item.lang || member?.lang || DEFAULT_LANG,
      context: Context.Builder,
    }}
  />
);

/**
 * Helper component to render typed H5P items
 */
const H5PContent = ({ item }: { item: H5PItemType }): JSX.Element => {
  const extra = getH5PExtra(item?.extra);

  if (!extra?.contentId) {
    return <ErrorAlert id={ITEM_SCREEN_ERROR_ALERT_ID} />;
  }

  return (
    <H5PItem
      itemId={item.id}
      itemName={item.name}
      contentId={extra.contentId}
      integrationUrl={H5P_INTEGRATION_URL}
    />
  );
};

/**
 * Helper component to render typed Shortcut items
 */
const ShortcutContent = ({ item }: { item: ShortcutItemType }): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const extra = getShortcutExtra(item?.extra);
  const { data: targetItem, isFetching } = hooks.useItem(extra.target);

  if (targetItem) {
    return <ItemContent item={targetItem} />;
  }

  if (isFetching) {
    return <Skeleton width="100%" height="200px" />;
  }

  return <Alert severity="error">{t('SHORTCUT_FETCHING_ISSUE')}</Alert>;
};

/**
 * Helper component to render typed Etherpad items
 */
const EtherpadContent = ({ item }: { item: EtherpadItemType }): JSX.Element => {
  const {
    data: etherpad,
    isLoading,
    isError,
  } = useEtherpad(
    item,
    'write', // server will return read view if no write access allowed
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!etherpad?.padUrl || isError) {
    return <ErrorAlert id={ITEM_SCREEN_ERROR_ALERT_ID} />;
  }

  return (
    <EtherpadItem
      itemId={item.id}
      padUrl={etherpad.padUrl}
      options={{ showChat: false }}
    />
  );
};

/**
 * Helper component to render typed Page items
 */
const PageContent = ({
  item,
  currentAccount,
}: {
  item: PageItemType;
  currentAccount: AuthenticatedUser | null;
}): JSX.Element => {
  const { t } = useTranslation(NS.PageEditor);
  const { canWrite } = useOutletContext();

  if (currentAccount && canWrite) {
    return (
      <>
        <Alert severity="warning">
          <Trans
            t={t}
            i18nKey={'WARNINGS.BETA'}
            components={{
              1: (
                <a
                  target="_blank"
                  href="https://graasp.github.io/docs/blog/unlisted/pages/"
                >
                  link
                </a>
              ),
              bold: <strong />,
            }}
          />
          <br />
          <Trans
            t={t}
            i18nKey={'WARNINGS.FEEDBACK'}
            components={{
              1: (
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe79M8aXDYkS2Rjz7xZg0Ns8hjDY6YvaVEpjqVfb3dXQW48cg/viewform?usp=dialog"
                >
                  link
                </a>
              ),
            }}
          />
        </Alert>
        <Editor item={item} currentAccount={currentAccount} />
      </>
    );
  }

  return <PageReader item={item} />;
};

/**
 * Main item renderer component
 */
export function ItemContent({ item }: Readonly<{ item: PackedItem }>) {
  const { t } = useTranslation(NS.Builder);
  const { user: member } = useAuth();

  switch (item.type) {
    case ItemType.FILE: {
      return <FileContent item={item} />;
    }
    case ItemType.LINK:
      return <LinkContent item={item} member={member} />;
    case ItemType.DOCUMENT:
      return <DocumentContent item={item} />;
    case ItemType.APP:
      return (
        <AppContent item={item} member={member} permission={item?.permission} />
      );
    case ItemType.FOLDER:
      return <FolderContent item={item} />;
    case ItemType.H5P: {
      return <H5PContent item={item} />;
    }
    case ItemType.ETHERPAD: {
      return <EtherpadContent item={item} />;
    }
    case ItemType.SHORTCUT: {
      return <ShortcutContent item={item} />;
    }
    case ItemType.PAGE: {
      return <PageContent item={item} currentAccount={member} />;
    }

    default:
      return (
        <Alert id={ITEM_SCREEN_ERROR_ALERT_ID} severity="error">
          {t('ITEM_TYPE_COULD_NOT_BE_HANDLED', {
            type: item['type'],
          })}
        </Alert>
      );
  }
}
