import { Navigate, createFileRoute } from '@tanstack/react-router';

import ItemPublishTab from '~builder/components/item/publish/ItemPublishTab';
import { useOutletContext } from '~builder/contexts/OutletContext';

export const Route = createFileRoute(
  '/builder/items/$itemId/_itemPage/publish',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { itemId } = Route.useParams();
  const { canAdmin } = useOutletContext();

  if (canAdmin) {
    return <ItemPublishTab />;
  }

  // redirect the user to the item if he doesn't have the permission to access this page
  return <Navigate to="/builder/items/$itemId" params={{ itemId }} replace />;
}
