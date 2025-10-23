import { Suspense, lazy } from 'react';

import { Stack } from '@mui/material';

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { AuthContextType } from '@/AuthContext';
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary';
import { NotFoundComponent } from '@/components/NotFoundComponent';
import { ReactQueryDevtools } from '@/config/queryClient';
import common from '@/locales/en/common.json';

import { PreviewContextProvider } from '~landing/preview/PreviewModeContext';

// add a page title to the static data
declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    pageTitle?: keyof (typeof common)['PAGE_TITLES'];
  }
}

export const Route = createRootRouteWithContext<{ auth: AuthContextType }>()({
  component: RootComponent,
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: NotFoundComponent,
});

// this allows to remove the tanstack router dev tools in production
const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

function RootComponent() {
  return (
    <Stack id="__root" minHeight="100vh">
      <PreviewContextProvider>
        <Outlet />
      </PreviewContextProvider>
      {import.meta.env.MODE !== 'test' && <ReactQueryDevtools />}
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </Stack>
  );
}
