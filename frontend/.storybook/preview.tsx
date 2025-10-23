import * as React from 'react';
import { I18nextProvider } from 'react-i18next';

import { CssBaseline, ThemeProvider } from '@mui/material';

import type { Preview, StoryContext } from '@storybook/react';
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import type { PartialStoryFn } from 'storybook/internal/types';

import '../src/app.css';
import { theme } from '../src/ui/theme';
import i18n from './i18nTestInstance';

// All stories will be decorated with a fake router instance that supports dynamic routes
// as well as translations pulled from the filesystem
// and a theme provider
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    direction: {
      name: 'Direction',
      description: 'Direction for the components',
      defaultValue: 'ltr',
      toolbar: {
        items: [
          { value: 'ltr', title: 'left-to-right' },
          { value: 'rtl', title: 'right-to-left' },
        ],
        // Property that specifies if the name of the item will be displayed
        showName: true,
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  tags: [
    // enable autodocs by default
    'autodocs',
  ],
  decorators: [
    // some components use tanstack router functions
    // so we need to provide a router when displaying stories.
    (Story: PartialStoryFn, { parameters }: StoryContext) => {
      const {
        initialEntries = ['/'],
        initialIndex,
        routes = ['/'],
        routeParams = {},
      } = parameters?.router || {};

      const rootRoute = createRootRoute();

      const children = routes.map((path: string) =>
        createRoute({
          path,
          getParentRoute: () => rootRoute,
          component: Story,
        }),
      );

      rootRoute.addChildren(children);

      // Ensure initialEntries are strings
      const formattedInitialEntries = initialEntries.map((entry: string) => {
        // If the entry includes parameters, replace them with the provided values
        return Object.keys(routeParams).reduce((acc, key) => {
          return acc.replace(`:${key}`, routeParams[key]);
        }, entry);
      });

      const router = createRouter({
        history: createMemoryHistory({
          initialEntries: formattedInitialEntries,
          initialIndex,
        }),
        routeTree: rootRoute,
        context: routeParams,
      });

      return <RouterProvider router={router} />;
    },
    // provide the MUI theme to the stories
    (Story, { globals }) => {
      return (
        <ThemeProvider
          theme={{
            ...theme,
            direction: globals.direction,
            palette: {
              ...theme.palette,
              mode: globals.theme,
            },
          }}
        >
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
    // wrap the stories with a translations provider
    // the instance is different from the one used in production
    // we directly load the files from the file system instead of using the fetch backend
    (Story) => {
      return (
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      );
    },
  ],
};

export default preview;
