import { type JSX, type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Badge, Box, Stack, Tab, Tabs, Typography } from '@mui/material';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  MEMBERSHIPS_TAB_SELECTOR,
  MEMBERSHIP_REQUESTS_TAB_SELECTOR,
} from '@/config/selectors';

import { useOutletContext } from '~builder/contexts/OutletContext';

import { BUILDER } from '../../../../langs';
import ShareButton from '../shareButton/ShareButton';
import ItemMembershipsTable from './ItemMembershipsTable';
import MembershipRequestTable from './MembershipRequestTable';

type TabPanelProps = {
  children?: ReactNode;
  value: number;
  selectedTabId: number;
};
const CustomTabPanel = ({ children, value, selectedTabId }: TabPanelProps) => (
  <Box
    role="tabpanel"
    hidden={value !== selectedTabId}
    aria-labelledby={`simple-tab-${value}`}
    mt={1}
  >
    {children}
  </Box>
);

const MembershipTabs = (): JSX.Element | null => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { item, canAdmin } = useOutletContext();
  const [selectedTabId, setSelectedTabId] = useState(0);

  const { data: requests } = hooks.useMembershipRequests(item.id);

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">
          {translateBuilder(BUILDER.ACCESS_MANAGEMENT_TITLE)}
        </Typography>
        {canAdmin && <ShareButton item={item} />}
      </Stack>
      <Box borderBottom={1} borderColor="divider">
        <Tabs
          value={selectedTabId}
          onChange={(_, newValue: number) => {
            setSelectedTabId(newValue);
          }}
          aria-label={translateBuilder(BUILDER.ACCESS_MANAGEMENT_TITLE)}
          data-cy={MEMBERSHIPS_TAB_SELECTOR}
        >
          <Tab label={translateBuilder(BUILDER.USER_MANAGEMENT_MEMBERS_TAB)} />
          {canAdmin && (
            <Tab
              data-cy={MEMBERSHIP_REQUESTS_TAB_SELECTOR}
              label={
                requests?.length ? (
                  <Badge badgeContent={requests?.length} color="primary">
                    {translateBuilder(BUILDER.USER_MANAGEMENT_REQUESTS_TAB)}
                  </Badge>
                ) : (
                  translateBuilder(BUILDER.USER_MANAGEMENT_REQUESTS_TAB)
                )
              }
            />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel selectedTabId={selectedTabId} value={0}>
        <ItemMembershipsTable />
      </CustomTabPanel>
      {canAdmin && (
        <CustomTabPanel selectedTabId={selectedTabId} value={1}>
          <MembershipRequestTable />
        </CustomTabPanel>
      )}
    </Stack>
  );
};

export default MembershipTabs;
