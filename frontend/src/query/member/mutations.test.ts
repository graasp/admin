import { HttpMethod, MemberFactory, ThumbnailSize } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { memberKeys } from '../keys.js';
import { UNAUTHORIZED_RESPONSE } from '../test/constants.js';
import { mockMutation, setUpTest } from '../test/utils.js';
import { buildUploadAvatarRoute } from './routes.js';
import { uploadAvatarRoutine } from './routines.js';

const mockedNotifier = vi.fn();
const { wrapper, queryClient, mutations } = setUpTest({
  notifier: mockedNotifier,
});
describe('Member Mutations', () => {
  afterEach(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    nock.cleanAll();
  });

  describe('useUploadAvatar', () => {
    const mutation = mutations.useUploadAvatar;
    const member = MemberFactory();
    const replyUrl = true;
    const { id } = member;
    const file = new Blob();

    it('Upload avatar', async () => {
      const route = `/${buildUploadAvatarRoute()}`;

      // set data in cache for current member (necessary for query invalidation)
      queryClient.setQueryData(memberKeys.current().content, member);
      // set query in cache for thumbnail from currentMember
      Object.values(ThumbnailSize).forEach((size) => {
        const key = memberKeys.single(id).avatar({ size, replyUrl });
        queryClient.setQueryData(key, 'thumbnail');
      });

      const endpoints = [
        {
          statusCode: StatusCodes.NO_CONTENT,
          method: HttpMethod.Post,
          route,
          response: {},
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await mockedMutation.mutateAsync({ file });

      for (const size of Object.values(ThumbnailSize)) {
        const key = memberKeys.single(id).avatar({ size, replyUrl: true });
        const state = queryClient.getQueryState(key);
        expect(state?.isInvalidated).toBeTruthy();
      }
      expect(mockedNotifier).toHaveBeenCalledWith({
        type: uploadAvatarRoutine.SUCCESS,
        payload: { message: 'UPLOAD_AVATAR' },
      });
    });

    it('Unauthorized to upload an avatar', async () => {
      const route = `/${buildUploadAvatarRoute()}`;
      // set data in cache for current member (necessary for query invalidation)
      queryClient.setQueryData(memberKeys.current().content, member);
      Object.values(ThumbnailSize).forEach((size) => {
        const key = memberKeys.single(id).avatar({ size, replyUrl });
        queryClient.setQueryData(key, 'thumbnail');
      });

      const response = UNAUTHORIZED_RESPONSE;

      const endpoints = [
        {
          response,
          statusCode: StatusCodes.UNAUTHORIZED,
          method: HttpMethod.Post,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await expect(mockedMutation.mutateAsync({ file })).rejects.toThrow();

      for (const size of Object.values(ThumbnailSize)) {
        const key = memberKeys.single(id).avatar({ size, replyUrl });
        const state = queryClient.getQueryState(key);
        expect(state?.isInvalidated).toBeFalsy();
      }

      expect(mockedNotifier).toHaveBeenCalledWith(
        expect.objectContaining({ type: uploadAvatarRoutine.FAILURE }),
      );
    });
  });
});
