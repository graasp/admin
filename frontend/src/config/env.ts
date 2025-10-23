export const API_HOST =
  import.meta.env.VITE_GRAASP_API_HOST ?? 'http://localhost:3000';

export const WS_HOST =
  import.meta.env.VITE_GRAASP_WS_HOST ?? 'ws://localhost:3000';

export const SHOW_NOTIFICATIONS =
  (import.meta.env.VITE_SHOW_NOTIFICATIONS ?? 'true') === 'true';

export const APP_VERSION = import.meta.env.VITE_VERSION;

export const GRAASP_LIBRARY_HOST =
  import.meta.env.VITE_GRAASP_LIBRARY_HOST ?? 'http://localhost:3005';

export const SENTRY_ENV = import.meta.env.VITE_SENTRY_ENV;
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
export const GRAASP_REDIRECTION_HOST = import.meta.env
  .VITE_GRAASP_REDIRECTION_HOST;
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA;

/**
 * The integration url needed to display H5P content
 *
 * It's value is required in production since it is not recommended to use the fallback backend endpoint.
 * The backend endpoint is considered in-secure when the app and the backend are hosted on a domain where cookies are shared.
 */
export const H5P_INTEGRATION_URL =
  import.meta.env.VITE_GRAASP_H5P_INTEGRATION_URL ??
  `${API_HOST}/items/h5p-assets/integration.html`;

// Question: should we host the pdf player assets inside the public directory here instead of at another bucket ?
// Are there any security implications if it is hosted on the same domain as the app code ?
export const GRAASP_ASSETS_URL = import.meta.env.VITE_GRAASP_ASSETS_URL;
