import { type ReactNode, StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import {
  CssBaseline,
  Direction,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';

import { Context } from '@graasp/sdk';
import rtlPlugin from '@graasp/stylis-plugin-rtl';

import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  init as SentryInit,
  browserTracingIntegration,
  replayIntegration,
} from '@sentry/react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { prefixer } from 'stylis';

import '@/config/i18n';
import { theme } from '@/ui/theme';

import { AuthProvider, useAuth } from './AuthContext';
import './app.css';
import {
  APP_VERSION,
  GRAASP_LIBRARY_HOST,
  SENTRY_DSN,
  SENTRY_ENV,
} from './config/env';
import { QueryClientProvider, queryClient } from './config/queryClient';
import { ClientManager } from './lib/ClientManager';
import { routeTree } from './routeTree.gen';

SentryInit({
  dsn: SENTRY_DSN,
  integrations: [
    browserTracingIntegration(),
    replayIntegration({
      maskAllText: false,
      maskAllInputs: true,
    }),
  ],
  release: APP_VERSION,
  environment: SENTRY_ENV,
  tracesSampleRate: 0.5,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 0.5,
});

const clientManager = ClientManager.getInstance();
clientManager.addPrefix(Context.Builder, '/builder/items');
clientManager.addPrefix(Context.Analytics, '/analytics/items');
clientManager.addPrefix(Context.Player, '/player');
clientManager.addHost(Context.Library, new URL(GRAASP_LIBRARY_HOST));
clientManager.addPrefix(Context.Library, '/collections');

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollToTopSelectors: ['#main'],
  scrollRestoration: true,
  context: {
    // at this stage, we set it to `undefined`. A more appropriate value will be set later in AuthProvider when we wrap the app.
    auth: undefined!,
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

type ThemeWrapperProps = {
  children: ReactNode;
};

const getCacheForDirection = (direction?: Direction): EmotionCache =>
  createCache({
    key: `mui-dir-${direction}`,
    stylisPlugins: [prefixer, ...(direction === 'rtl' ? [rtlPlugin] : [])],
  });

function ThemeWrapper({ children }: Readonly<ThemeWrapperProps>) {
  // use the hook as it allows to use the correct instance of i18n
  const { i18n: i18nInstance } = useTranslation();
  const direction = i18nInstance.dir(i18nInstance.language);

  // needed to set the right attribute on the HTML
  useEffect(
    () => {
      const dir = i18nInstance.dir(i18nInstance.language);
      console.debug(
        `Language changed to ${i18nInstance.language}, updating direction to ${dir}`,
      );
      document.documentElement.setAttribute('dir', dir);
    },
    // here we need to react to the change of the language, the instance does not change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18nInstance.language],
  );

  return (
    <MuiThemeProvider theme={{ ...theme, direction }}>
      <CacheProvider value={getCacheForDirection(direction)}>
        {children}
      </CacheProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <CssBaseline />
          <AuthProvider>
            <ToastContainer stacked position="bottom-left" />
            <InnerApp />
          </AuthProvider>
        </ThemeWrapper>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // we disable strict mode because the map component (leaflet) can not handle it.
    // ideally we would like to be able to enable strict mode to have a better DX and find bugs.
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
