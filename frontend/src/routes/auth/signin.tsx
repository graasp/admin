import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * Legacy redirection for routes using the old `signin` route.
 *
 * This should be removed 6 months after the push of the new client interface in production,
 * approximately around July 2025.
 */
export const Route = createFileRoute('/auth/signin')({
  beforeLoad: (ctx) => {
    throw redirect({ to: '/auth/login', search: ctx.search });
  },
});
