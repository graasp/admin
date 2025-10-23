import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { LOG_IN_PAGE_PATH } from '@/config/paths';

export const Route = createFileRoute('/analytics')({
  beforeLoad: ({ context }) => {
    // check if the user is authenticated.
    // if not, redirect to `/auth/login` so the user can log in their account
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: LOG_IN_PAGE_PATH,
        search: {
          url: window.location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
