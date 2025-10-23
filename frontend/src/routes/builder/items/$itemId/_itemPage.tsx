import { useTranslation } from 'react-i18next';

import { Box, IconButton, Tooltip } from '@mui/material';

import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { ArrowLeftCircle } from 'lucide-react';

import { NS } from '@/config/constants';

import ErrorAlert from '~builder/components/common/ErrorAlert';
import Navigation from '~builder/components/layout/Navigation';
import { useOutletContext } from '~builder/contexts/OutletContext';

export const Route = createFileRoute('/builder/items/$itemId/_itemPage')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(NS.Builder);
  const { itemId } = Route.useParams();
  const outletContext = useOutletContext();

  if (outletContext.item) {
    return (
      <Box py={1} px={2}>
        <Box display="flex" alignItems="center">
          <Tooltip title={t('BACK')}>
            <Link
              to="/builder/items/$itemId"
              params={{ itemId }}
              search={(prev) => ({ ...prev })}
            >
              <IconButton>
                <ArrowLeftCircle />
              </IconButton>
            </Link>
          </Tooltip>
          <Navigation />
        </Box>
        <Box px={2}>
          <Outlet />
        </Box>
      </Box>
    );
  }

  return <ErrorAlert />;
}
