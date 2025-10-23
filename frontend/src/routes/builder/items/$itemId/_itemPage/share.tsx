import { useTranslation } from 'react-i18next';

import { Alert, Box, Divider, Stack, Typography } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { VISIBILITY_HIDDEN_ALERT_ID } from '@/config/selectors';

import DeleteItemLoginSchemaButton from '~builder/components/item/sharing/DeleteItemLoginSchemaButton';
import HideSettingCheckbox from '~builder/components/item/sharing/HideSettingCheckbox';
import VisibilitySelect from '~builder/components/item/sharing/VisibilitySelect';
import MembershipTabs from '~builder/components/item/sharing/membershipTable/MembershipTabs';
import ShortLinksRenderer from '~builder/components/item/sharing/shortLink/ShortLinksRenderer';
import { useOutletContext } from '~builder/contexts/OutletContext';

export const Route = createFileRoute('/builder/items/$itemId/_itemPage/share')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const { itemId } = Route.useParams();
  const { item, canAdmin } = useOutletContext();

  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { data: memberships } = hooks.useItemMemberships(itemId);

  return (
    <Stack gap={2} mb={5}>
      <Box>
        <Typography variant="h5">
          {translateBuilder('SHARING_TITLE')}
        </Typography>
        <ShortLinksRenderer
          itemId={itemId}
          canAdminShortLink={Boolean(memberships && canAdmin)}
        />
      </Box>
      <Divider />
      {user?.type === AccountType.Individual && canAdmin ? (
        <>
          <Stack gap={2}>
            <Typography variant="h6">
              {translateBuilder('ITEM_SETTINGS_VISIBILITY_TITLE')}
            </Typography>
            <DeleteItemLoginSchemaButton itemId={itemId} />
            {item?.hidden ? (
              <Alert
                id={VISIBILITY_HIDDEN_ALERT_ID}
                sx={{ my: 1 }}
                severity="info"
              >
                {translateBuilder(
                  'ITEM_SETTINGS_VISIBILITY_HIDDEN_INFORMATION',
                )}
              </Alert>
            ) : (
              <VisibilitySelect item={item} edit={canAdmin} />
            )}
            <HideSettingCheckbox item={item} />
          </Stack>
          <Divider />
        </>
      ) : null}
      <MembershipTabs />
    </Stack>
  );
}
