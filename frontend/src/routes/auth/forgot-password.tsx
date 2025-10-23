import { createFileRoute } from '@tanstack/react-router';

import { RequestPasswordReset } from '~auth/components/requestPasswordReset/RequestPasswordReset';

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RequestPasswordReset />;
}
