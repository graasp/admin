import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Divider, Stack, useTheme } from '@mui/material';

import {
  AccountType,
  Context,
  ItemType,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';

import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import axios from 'axios';
import { HomeIcon } from 'lucide-react';
import { z } from 'zod';

import { useAuth } from '@/AuthContext';
import { EnrollContent } from '@/components/EnrollContent';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { HeaderRightContent } from '@/components/ui/HeaderRightContent';
import { MainMenuItem } from '@/components/ui/MainMenuItem';
import { NS } from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';
import { hooks, mutations } from '@/config/queryClient';
import {
  APP_NAVIGATION_PLATFORM_SWITCH_ID,
  HEADER_APP_BAR_ID,
  ITEM_LOGIN_SCREEN_FORBIDDEN_ID,
  ITEM_LOGIN_SIGN_IN_BUTTON_ID,
  ITEM_LOGIN_SIGN_IN_PASSWORD_ID,
  ITEM_LOGIN_SIGN_IN_USERNAME_ID,
  NAVIGATION_HOME_ID,
} from '@/config/selectors';
import { HomeHeaderLink } from '@/ui/Main/HomeHeaderLink';
import Main from '@/ui/Main/Main';
import PlatformSwitch from '@/ui/PlatformSwitch/PlatformSwitch';
import { Platform } from '@/ui/PlatformSwitch/hooks';
import { useMobileView } from '@/ui/hooks/useMobileView';
import ForbiddenContent from '@/ui/itemLogin/ForbiddenContent';
import ItemLoginWrapper from '@/ui/itemLogin/ItemLoginWrapper';

import { FilterItemsContextProvider } from '~builder/components/context/FilterItemsContext';
import ModalProviders from '~builder/components/context/ModalProviders';
import { OutletContext } from '~builder/contexts/OutletContext';
import { ItemLayoutMode } from '~builder/enums';
import ItemNavigation from '~player/ItemNavigation';
import { RequestAccessContent } from '~player/access/RequestAccessContent';
import { LoadingTree } from '~player/tree/LoadingTree';
import { GRAASP_MENU_ITEMS } from '~player/tree/TreeView';

const schema = z.object({
  chatOpen: z.boolean().optional(),
  copyOpen: z.boolean().optional(),
  mode: z.nativeEnum(ItemLayoutMode).optional(),
});

export const Route = createFileRoute('/builder/items/$itemId')({
  validateSearch: zodValidator(schema),
  component: RouteComponent,
});

const LinkComponent = ({ children }: { children: ReactNode }) => (
  <HomeHeaderLink to="/home">{children}</HomeHeaderLink>
);

function RouteComponent() {
  const { itemId } = Route.useParams();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const { user } = useAuth();
  const { t } = useTranslation(NS.Builder);
  const { t: translateCommon } = useTranslation(NS.Common);
  const theme = useTheme();
  const { isMobile } = useMobileView();
  const {
    data: item,
    isLoading: itemIsLoading,
    error: itemError,
  } = hooks.useItem(itemId);
  const { data: currentMember, isLoading: currentMemberIsLoading } =
    hooks.useCurrentMember();
  const {
    data: itemLoginSchemaType,
    isLoading: itemLoginSchemaTypeIsLoading,
    isError: isItemLoginSchemaTypeError,
  } = hooks.useItemLoginSchemaType({ itemId });
  const { data: parents, isLoading: isParentsLoading } = hooks.useParents({
    id: item?.id,
    enabled: Boolean(item?.id),
  });

  hooks.useItemFeedbackUpdates?.(user?.id);

  const { mutate: itemLoginSignIn } = mutations.usePostItemLogin();
  const canWrite = item?.permission
    ? PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
    : false;

  const canAdmin = item?.permission
    ? PermissionLevelCompare.gte(item.permission, PermissionLevel.Admin)
    : false;

  const errorStatusCode =
    (axios.isAxiosError(itemError) && itemError.status) || null;

  const platformProps = {
    [Platform.Builder]: {
      href: `/builder/items/${itemId}`,
    },
    [Platform.Player]: {
      href: `/player/${itemId}/${itemId}`,
    },
    [Platform.Library]: {
      href: GRAASP_LIBRARY_HOST,
    },
    [Platform.Analytics]: {
      href: `/analytics/items/${itemId}`,
    },
  };

  // warning: since the item data is async, getting parents is also async.
  // we avoid rendering the tree to soon with the current item id and wait for parents to fetch
  const drawerContent = isParentsLoading ? (
    <LoadingTree />
  ) : (
    <Stack height="100%">
      <MainMenuItem
        id={NAVIGATION_HOME_ID}
        text={t('MENU.RETURN_HOME')}
        icon={<HomeIcon />}
        to="/home"
      />
      <Divider />
      <ItemNavigation
        rootId={parents?.[0]?.id ?? itemId}
        itemId={
          // if the current item is not a folder, the item is not displayed in the tree
          // so we highlight the parent (if it has parents)
          item?.type !== ItemType.FOLDER && parents?.length
            ? parents[parents.length - 1].id
            : itemId
        }
        showHidden
        types={GRAASP_MENU_ITEMS}
        handleNavigationOnClick={(newItemId: string) => {
          navigate({
            to: '/builder/items/$itemId',
            params: {
              itemId: newItemId,
            },
            search,
          });
        }}
      />
    </Stack>
  );

  return (
    <ModalProviders>
      <Main
        open={
          /**
           * only override the open prop when user is not logged in
           * we want to keep the default behavior when the user is logged in
           * we close the drawer if the user is a guest
           */
          user?.type === AccountType.Individual ? undefined : false
        }
        context={Context.Builder}
        headerId={HEADER_APP_BAR_ID}
        drawerOpenAriaLabel={t('ARIA_OPEN_DRAWER')}
        headerRightContent={<HeaderRightContent />}
        drawerContent={drawerContent}
        LinkComponent={LinkComponent}
        PlatformComponent={
          <PlatformSwitch
            id={APP_NAVIGATION_PLATFORM_SWITCH_ID}
            selected={Platform.Builder}
            platformsProps={platformProps}
            color={isMobile ? theme.palette.primary.main : 'white'}
            accentColor={isMobile ? 'white' : theme.palette.primary.main}
          />
        }
      >
        <FilterItemsContextProvider>
          <Stack maxWidth="xl" mx="auto" width="100%" height="100%">
            <ItemLoginWrapper
              item={item}
              itemErrorStatusCode={errorStatusCode}
              currentAccount={currentMember}
              enrollContent={<EnrollContent itemId={itemId} />}
              signInButtonId={ITEM_LOGIN_SIGN_IN_BUTTON_ID}
              usernameInputId={ITEM_LOGIN_SIGN_IN_USERNAME_ID}
              passwordInputId={ITEM_LOGIN_SIGN_IN_PASSWORD_ID}
              signIn={itemLoginSignIn}
              itemLoginSchemaType={itemLoginSchemaType}
              itemId={itemId}
              isLoading={
                currentMemberIsLoading ||
                itemLoginSchemaTypeIsLoading ||
                itemIsLoading
              }
              requestAccessContent={
                currentMember?.type === AccountType.Individual &&
                // member can request a membership if the item login type is null and not an error
                // item login schema type can error if the item is hidden
                !isItemLoginSchemaTypeError ? (
                  <RequestAccessContent
                    itemId={itemId}
                    member={currentMember}
                  />
                ) : undefined
              }
              forbiddenContent={
                <Stack
                  id={ITEM_LOGIN_SCREEN_FORBIDDEN_ID}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  flex={1}
                  gap={2}
                >
                  <ForbiddenContent id={ITEM_LOGIN_SCREEN_FORBIDDEN_ID} />
                  <ButtonLink to="/auth/login">
                    {translateCommon('LOG_IN.BUTTON_TEXT')}
                  </ButtonLink>
                </Stack>
              }
            >
              <OutletContext.Provider
                value={{
                  item: item!,
                  permission: item?.permission,
                  canWrite,
                  canAdmin,
                }}
              >
                <Outlet />
              </OutletContext.Provider>
            </ItemLoginWrapper>
          </Stack>
        </FilterItemsContextProvider>
      </Main>
    </ModalProviders>
  );
}
