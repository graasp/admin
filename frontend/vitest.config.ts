import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { configDefaults, defineConfig } from 'vitest/config';

const queryClientInclude = 'src/query/**/*.test.ts';
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          exclude: [
            ...configDefaults.exclude,
            queryClientInclude,
            'src/**/*.hook.test.ts',
          ],
        },
      },
      {
        // add "extends" to merge two configs together
        extends: './vite.config.js',
        test: {
          name: 'query',
          include: [queryClientInclude, 'src/**/*.hook.test.ts'],
          environment: 'happy-dom',
        },
      },
      {
        extends: 'vite.config.ts',
        plugins: [
          // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
          storybookTest({ configDir: '.storybook' }),
        ],
        optimizeDeps: {
          entries: ['src/**/*.stories.tsx', '.storybook/preview.tsx'],
          include: [
            'react-dom/client',
            'react-helmet-async',
            '@graasp/stylis-plugin-rtl',
            '@emotion/cache',
            '@emotion/react',
            'stylis',
            'i18next-browser-languagedetector',
            'i18next-fetch-backend',
            '@tanstack/zod-adapter',
            'zod',
            'react-hook-form',
            '@tanstack/router-devtools',
            'date-fns/isAfter',
            'jwt-decode',
            'react-i18next',
            'react',
          ],
        },
        test: {
          name: 'storybook',
          retry: 1,
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: 'playwright',
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
    },
  },
});
