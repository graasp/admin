import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography } from '@mui/material';

import { DiscriminatedItem, MAX_NUMBER_OF_FILES_UPLOAD } from '@graasp/sdk';

import { useParams } from '@tanstack/react-router';
import { AxiosProgressEvent } from 'axios';
import { HelpCircleIcon } from 'lucide-react';

import { CustomLink } from '@/components/ui/CustomLink';
import { NS } from '@/config/constants';
import { getErrorMessage } from '@/config/notifier';
import { mutations } from '@/config/queryClient';
import { useButtonColor } from '@/ui/buttons/hooks';
import FileDropper from '@/ui/upload/FileDropper/FileDropper';

type Props = {
  onComplete?: () => void;
  onUpdate?: (e: AxiosProgressEvent) => void;
  onError?: (e: Error) => void;
  buttons?: JSX.Element;
  onStart?: () => void;
  /** id of the component */
  id?: string;
  previousItemId?: DiscriminatedItem['id'];
};

export function FileUploader({
  onError,
  onUpdate,
  onComplete,
  onStart,
  buttons,
  id,
  previousItemId,
}: Readonly<Props>): JSX.Element | null {
  const { t } = useTranslation(NS.Builder);
  const { t: translateMessage } = useTranslation(NS.Messages);
  const { itemId: parentItemId } = useParams({ strict: false });
  const [error, setError] = useState<string>();

  const { mutateAsync: uploadFiles, isPending } = mutations.useUploadFiles();
  const { color } = useButtonColor('primary');
  const [totalProgress, setTotalProgress] = useState(0);

  const onDrop = async (files: File[]): Promise<void> => {
    // update progress callback function scaled over the number of files sent
    const updateForManyFiles = () => (e: AxiosProgressEvent) => {
      const progress = (e.progress ?? 0) / files.length;
      setTotalProgress(progress);
      onUpdate?.({ ...e, progress });
    };

    if (files.length > MAX_NUMBER_OF_FILES_UPLOAD) {
      setError(
        t('CANNOT_UPLOAD_MORE_FILES', {
          count: MAX_NUMBER_OF_FILES_UPLOAD,
        }),
      );
      onError?.({
        message: t('CANNOT_UPLOAD_MORE_FILES', {
          count: MAX_NUMBER_OF_FILES_UPLOAD,
        }),
      } as Error);
      return;
    }
    setError(undefined);

    onStart?.();

    try {
      await uploadFiles({
        files,
        id: parentItemId,
        previousItemId,
        onUploadProgress: updateForManyFiles(),
      });
      onComplete?.();
    } catch (e) {
      const message = getErrorMessage(e);
      setError(
        translateMessage(message) ??
          translateMessage('UPLOAD_FILES_UNEXPECTED_ERROR'),
      );

      if (e instanceof Error) {
        onError?.(e);
      }
      console.error(e);
    }
  };

  const hints = (
    <Stack gap={2}>
      <Typography variant="subtitle2" textAlign="center">
        {t('DROPZONE_HELPER_LIMIT_REMINDER_TEXT', {
          max: MAX_NUMBER_OF_FILES_UPLOAD,
        })}
      </Typography>
      <Stack direction="row" alignItems="center" gap={1}>
        <HelpCircleIcon size={20} color={color} />
        <CustomLink variant="subtitle2" to="/support">
          {t('DROPZONE_HELPER_TUTORIALS')}
        </CustomLink>
      </Stack>
    </Stack>
  );

  return (
    <Box width="100%" id={id} height="100%">
      <FileDropper
        message={t('DROPZONE_HELPER_TEXT')}
        onChange={(e) => {
          if (e.target.files) {
            // transform from filelist to file array
            onDrop([...e.target.files]);
          }
        }}
        isLoading={isPending}
        uploadProgress={Math.ceil(totalProgress * 100)}
        multiple
        onDrop={onDrop}
        error={
          error ? (
            <>
              {error}
              <br />
              {t('FILE_UPLOADER.GENERAL_ERROR')}
            </>
          ) : undefined
        }
        buttonText={t('DROPZONE_HELPER_ACTION')}
        hints={hints}
        buttons={buttons}
      />
    </Box>
  );
}
