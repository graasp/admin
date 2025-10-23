import { RECAPTCHA_SITE_KEY } from '@/config/env';

const MOCK_RECAPTCHA_TOKEN = 'development-token';

declare global {
  interface Window {
    grecaptcha: {
      ready?: (callback: () => void) => void;
      execute: (
        siteKey: string,
        { action }: { action: string },
      ) => Promise<string>;
    };
  }
}

export function executeCaptcha(action: string): Promise<string> {
  return new Promise<string>((resolve) => {
    if (!window.grecaptcha) {
      if (import.meta.env.DEV) {
        // in dev we resolve to a mock string
        console.debug('No recaptcha key set-up, using mock value');
        resolve(MOCK_RECAPTCHA_TOKEN);
      }
      resolve('error-recaptcha-not-present');
    } else {
      window.grecaptcha.ready?.(async () => {
        try {
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
            action,
          });
          resolve(token);
        } catch (err) {
          // if we are in dev and the error is that the client id is not set, we resolve to a mock value
          if (
            err instanceof Error &&
            (err.toString().includes('Invalid reCAPTCHA client id') ||
              err.toString().includes('No reCAPTCHA clients exist')) &&
            (import.meta.env.DEV || import.meta.env.MODE === 'test')
          ) {
            console.debug('No recaptcha key set-up, using mock value');
            resolve(MOCK_RECAPTCHA_TOKEN);
          }
          console.error(err);
        }
      });
    }
  });
}
