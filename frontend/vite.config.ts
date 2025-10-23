/// <reference types="./src/vite-env.d.ts"/>
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { type UserConfig, defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsConfigPaths from 'vite-tsconfig-paths';

import { umamiPlugin } from './umami.plugin';

// https://vitejs.dev/config/
const config = ({ mode }: { mode: string }): UserConfig => {
  process.env = {
    VITE_VERSION: 'default',
    VITE_BUILD_TIMESTAMP: new Date().toISOString(),
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  const {
    VITE_PORT,
    BROWSER,
    VITE_UMAMI_WEBSITE_ID,
    VITE_UMAMI_HOST,
    VITE_GRAASP_API_HOST,
  } = process.env;

  // ensure required variables are present
  if (mode === 'production') {
    requireEnvVariable('VITE_GRAASP_H5P_INTEGRATION_URL');
    requireEnvVariable('VITE_GRAASP_REDIRECTION_HOST');
  }

  // compute the port to use
  const PORT = parseInt(VITE_PORT ?? '3114', 10);
  // compute whether we should open the browser
  // this defines if we should automatically open the browser
  const shouldOpen = BROWSER && BROWSER !== 'none';

  return defineConfig({
    base: '/',
    server: {
      port: PORT,
      // whether we should open the url on start
      open: shouldOpen,
      watch: {
        ignored: ['**/coverage/**', '**/cypress/downloads/**'],
      },
      proxy: {
        // send requests made to `/api` to the backend running on a different port
        // this allows to how have to specify a different host on the requests
        // in production the load balancer will play this role.
        '/api': {
          target: VITE_GRAASP_API_HOST ?? 'http://localhost:3000',
          changeOrigin: true,
          // remove the "api" part
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      port: PORT,
      // forces to use the specified port
      strictPort: true,
    },

    plugins: [
      TanStackRouterVite(),
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      // the checker plugin is disabled when running the tests
      mode !== 'test'
        ? checker({
            typescript: true,
            eslint: {
              lintCommand: 'eslint "./**/*.{ts,tsx}"',
              useFlatConfig: true,
            },
            overlay: { initialIsOpen: false, position: 'br' },
          })
        : undefined,
      react(),
      umamiPlugin({
        websiteId: VITE_UMAMI_WEBSITE_ID,
        host: VITE_UMAMI_HOST,
        enableInDevMode: true,
        requireInProduction: false,
      }),
      viteStaticCopy({
        targets: [{ src: 'src/locales', dest: '' }],
      }),
    ],
  });
};
export default config;

function requireEnvVariable(varName: string) {
  if (!process.env[varName]) {
    const message = `Missing required env variable for production build: '${varName}'`;
    const messageLength = message.length;
    const straightSection = Array(messageLength + 4)
      .fill('═')
      .join('');
    const pad = '   ';
    const borderedMessage = `\n\n${pad}╔${straightSection}╗\n${pad}║  ${message}  ║\n${pad}╚${straightSection}╝\n`;
    throw new Error(borderedMessage);
  }
}
