import { CurrentAccount, MAX_THUMBNAIL_SIZE } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosProgressEvent } from 'axios';

import { memberKeys } from '../keys.js';
import { QueryClientConfig } from '../types.js';
import * as Api from './api.js';
import { updateEmailRoutine, uploadAvatarRoutine } from './routines.js';

export default (queryConfig: QueryClientConfig) => {
  const { notifier } = queryConfig;

  /**
   * Uploads the member profile picture
   */
  const useUploadAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (args: {
        file: Blob;
        onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
      }) => {
        if (args.file.size > MAX_THUMBNAIL_SIZE) {
          throw new Error('UPLOAD_BIG_FILES');
        }

        return Api.uploadAvatar(args);
      },
      onSuccess: () => {
        // get memberId from query data
        const memberId = queryClient.getQueryData<CurrentAccount>(
          memberKeys.current().content,
        )?.id;
        if (memberId) {
          // if we know the memberId we invalidate the avatars to refresh the queries
          queryClient.invalidateQueries({
            queryKey: memberKeys.single(memberId).allAvatars,
          });
        }
        notifier?.({
          type: uploadAvatarRoutine.SUCCESS,
          payload: { message: 'UPLOAD_AVATAR' },
        });
      },
      onError: (error) => {
        notifier?.({ type: uploadAvatarRoutine.FAILURE, payload: { error } });
      },
    });
  };

  const useUpdateMemberEmail = () =>
    useMutation({
      mutationFn: (newEmail: string) => Api.updateEmail(newEmail),
      onSuccess: () => {
        notifier?.({
          type: updateEmailRoutine.SUCCESS,
          payload: { message: 'UPDATE_EMAIL' },
        });
      },
      onError: (error: Error) => {
        notifier?.({
          type: updateEmailRoutine.FAILURE,
          payload: { error },
        });
      },
    });

  const useValidateEmailUpdate = () =>
    useMutation({
      mutationFn: (token: string) => Api.validateEmailUpdate(token),
      onError: (error: Error) => {
        notifier?.({
          type: updateEmailRoutine.FAILURE,
          payload: { error },
        });
      },
    });

  return {
    useUploadAvatar,
    useUpdateMemberEmail,
    useValidateEmailUpdate,
  };
};
