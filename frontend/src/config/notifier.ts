import { toast } from 'react-toastify';

import { AxiosError, isAxiosError } from 'axios';

import { MessageKeys } from '@/@types/i18next';
import { Notifier, routines } from '@/query';

import { NS } from './constants';
import { SHOW_NOTIFICATIONS } from './env';

const { updateEmailRoutine, getInvitationRoutine } = routines;

// todo: find a way to use the i18n instance instead
const translate = (str: string, _options: { ns: string }) => str;

export const getErrorMessageFromPayload = (
  payload?: Parameters<Notifier>[0]['payload'],
): keyof MessageKeys => {
  if (payload?.error && isAxiosError(payload.error)) {
    return ((payload.error.response?.data as { message: string } | undefined)
      ?.message ?? 'UNEXPECTED_ERROR') as keyof MessageKeys;
  }
  return (payload?.message ?? 'UNEXPECTED_ERROR') as keyof MessageKeys;
};

type ErrorPayload = Parameters<Notifier>[0]['payload'] & {
  failure?: unknown[];
};

type SuccessPayload = {
  message?: string;
};

type Payload = ErrorPayload & SuccessPayload;

const getSuccessMessageFromPayload = (payload?: SuccessPayload) =>
  (payload?.message ?? 'DEFAULT_SUCCESS') as keyof MessageKeys;

export default ({
  type,
  payload,
}: {
  type: string;
  payload?: Payload;
}): void => {
  if (!SHOW_NOTIFICATIONS) {
    return;
  }

  let message: keyof MessageKeys | undefined = undefined;

  switch (type) {
    // error messages
    // auth
    case getInvitationRoutine.FAILURE:
    case updateEmailRoutine.FAILURE: {
      message = getErrorMessageFromPayload(payload);
      break;
    }

    // success messages
    // auth
    case updateEmailRoutine.SUCCESS: {
      message = getSuccessMessageFromPayload(payload);
      break;
    }
    default:
  }

  // error notification
  if (payload?.error && message) {
    toast.error(translate(message, { ns: NS.Messages }));
  }
  // success notification
  else if (message) {
    toast.success(translate(message, { ns: NS.Messages }));
  }
};

export const getErrorMessage = (e: unknown) => {
  if (e instanceof AxiosError) {
    return e.response?.data?.message;
  } else if (e instanceof Error) {
    return e.message;
  }

  return null;
};
