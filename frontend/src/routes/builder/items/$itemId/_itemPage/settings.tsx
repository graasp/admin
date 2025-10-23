import { Stack } from '@mui/material';

import { Navigate, createFileRoute } from '@tanstack/react-router';

import AdminChatSettings from '~builder/components/item/settings/AdminChatSettings';
import CustomizedTagsSettings from '~builder/components/item/settings/CustomizedTagsSettings';
import GeolocationPicker from '~builder/components/item/settings/GeolocationPicker';
import ItemLicenseSettings from '~builder/components/item/settings/ItemLicenseSettings';
import ItemMetadataContent from '~builder/components/item/settings/ItemMetadataContent';
import ItemSettingsProperties from '~builder/components/item/settings/ItemSettingsProperties';
import ThumbnailSetting from '~builder/components/item/settings/ThumbnailSetting';
import { useOutletContext } from '~builder/contexts/OutletContext';

export const Route = createFileRoute(
  '/builder/items/$itemId/_itemPage/settings',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { itemId } = Route.useParams();
  const { canWrite, item } = useOutletContext();

  if (canWrite) {
    return (
      <Stack gap={4} mb={4}>
        <ThumbnailSetting item={item} />
        <ItemMetadataContent />
        <CustomizedTagsSettings item={item} />
        <ItemSettingsProperties item={item} />
        <AdminChatSettings item={item} />
        <ItemLicenseSettings />
        <GeolocationPicker item={item} />
      </Stack>
    );
  }

  // redirect the user to the item if he doesn't have the permission to access this page
  return <Navigate to="/builder/items/$itemId" params={{ itemId }} replace />;
}
