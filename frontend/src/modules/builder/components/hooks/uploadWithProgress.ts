import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';

import { AxiosProgressEvent } from 'axios';

import { NS } from '@/config/constants';
import { getErrorMessage } from '@/config/notifier';

export const useUploadWithProgress = (): {
  update: (p: AxiosProgressEvent) => void;
  close: (e?: unknown) => void;
  show: (p?: number) => void;
} => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateMessage } = useTranslation(NS.Messages);

  // we need to keep a reference of the toastId to be able to update it
  const toastId = useRef<Id | null>(null);

  const show = (progress = 0) => {
    toastId.current = toast.info(translateBuilder('UPLOADING'), {
      progress,
      position: 'bottom-left',
    });
  };

  const update = ({ progress }: AxiosProgressEvent) => {
    // check if we already displayed a toast
    if (toastId.current === null && progress && progress < 1) {
      show(progress);
    }
    if (toastId.current) {
      toast.update(toastId.current, { progress });
    }
  };

  const close = (error?: unknown) => {
    // show correct feedback message
    if (error) {
      console.error(error);
      toast.error(
        translateMessage(getErrorMessage(error)) ??
          translateMessage('UPLOAD_FILES_UNEXPECTED_ERROR'),
      );
    } else if (toastId.current) {
      toast.done(toastId.current);
    }
    // delete reference
    if (toastId.current) {
      toastId.current = null;
    }
  };

  return { show, update, close };
};
