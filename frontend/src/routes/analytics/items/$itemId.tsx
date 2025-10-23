import { Stack } from '@mui/material';

import { Outlet, createFileRoute } from '@tanstack/react-router';

import { Navigator } from '~analytics/Navigator';
import { PageWrapper } from '~analytics/PageWrapper';
import DataProvider from '~analytics/context/DataProvider';
import ViewDataProvider from '~analytics/context/ViewDataProvider';

export const Route = createFileRoute('/analytics/items/$itemId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { itemId } = Route.useParams();

  return (
    <DataProvider itemId={itemId}>
      <PageWrapper>
        <Navigator itemId={itemId} />

        <ViewDataProvider>
          <Stack direction="column" p={2} alignItems="center" width="100%">
            <Outlet />
          </Stack>
        </ViewDataProvider>
      </PageWrapper>
    </DataProvider>
  );
}
