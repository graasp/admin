import { Helmet } from 'react-helmet-async';

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { RECAPTCHA_SITE_KEY } from '@/config/env';

/**
 * Parse an object with string values and convert "true" and "false" to boolean
 * @param obj object with string values
 * @returns
 */
function parseBooleanStrings(
  obj: Record<string, unknown>,
): Record<string, unknown | boolean> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value === 'true') return [key, true];
      if (value === 'false') return [key, false];
      return [key, value];
    }),
  );
}

const redirectionSchema = z.object({
  url: z.string().url().optional(),
});

export const Route = createFileRoute('/auth')({
  validateSearch: zodValidator(redirectionSchema),
  beforeLoad: ({ context, search }) => {
    // check if the user is authenticated.
    // if already authenticated, redirect to `/builder`
    if (context.auth.isAuthenticated) {
      let redirectLink = null;
      let searchParams = {};
      try {
        if (search.url) {
          const url = new URL(search.url);
          redirectLink = url.pathname;
          searchParams = Object.fromEntries(
            new URLSearchParams(url.searchParams).entries(),
          );
        }
      } catch (e) {
        // we don't throw, the url might be a wrong url
        console.error(e);
      }

      throw redirect({
        to: redirectLink ?? '/home',
        // reuse search params from the url if any
        // need to parse boolean strings as search params are always strings
        search: parseBooleanStrings(searchParams),
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Helmet>
        {
          // only add these tags if the env var is defined
          RECAPTCHA_SITE_KEY && (
            <>
              <link rel="pre-connect" href="https://www.google.com" />
              <script
                defer
                src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
              />
            </>
          )
        }
      </Helmet>
      <Outlet />
    </>
  );
}
