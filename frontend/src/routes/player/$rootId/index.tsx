import { Navigate, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/player/$rootId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { rootId } = Route.useParams();

  return (
    <Navigate
      to="/player/$rootId/$itemId"
      params={{ rootId: rootId, itemId: rootId }}
    />
  );
}
