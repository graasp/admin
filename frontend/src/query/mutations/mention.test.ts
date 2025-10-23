import {
  AccountFactory,
  HttpMethod,
  MemberFactory,
  MentionStatus,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { v4 } from 'uuid';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildMentionKey } from '../keys.js';
import { buildGetCurrentMemberRoute } from '../member/routes.js';
import {
  buildClearMentionsRoute,
  buildDeleteMentionRoute,
  buildPatchMentionRoute,
} from '../routes.js';
import {
  clearMentionsRoutine,
  deleteMentionRoutine,
  patchMentionRoutine,
} from '../routines/mentions.js';
import {
  OK_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  buildChatMention,
  buildMemberMentions,
  buildMentionResponse,
} from '../test/constants.js';
import { mockMutation, setUpTest } from '../test/utils.js';

describe('Mention Mutations', () => {
  const mentionId = v4();
  const account = AccountFactory();
  const currentMemberRoute = `/${buildGetCurrentMemberRoute()}`;
  const key = buildMentionKey();
  const MENTIONS = buildMemberMentions();

  describe('enableWebsockets = false', () => {
    const mockedNotifier = vi.fn();
    const { wrapper, queryClient, mutations } = setUpTest({
      notifier: mockedNotifier,
    });

    afterEach(async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      nock.cleanAll();
    });

    describe('usePatchMention', () => {
      const route = `/${buildPatchMentionRoute(mentionId)}`;
      const mutation = mutations.usePatchMention;

      it(`Patch mention status`, async () => {
        const endpoints = [
          // mock currentMember route for the Mention hook to work
          {
            route: currentMemberRoute,
            response: MemberFactory(),
          },
          {
            route,
            response: buildMentionResponse(
              MENTIONS[0],
              HttpMethod.Patch,
              MentionStatus.Read,
            ),
            method: HttpMethod.Patch,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, MENTIONS);

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await mockedMutation.mutateAsync({
          id: mentionId,
          status: MentionStatus.Read,
        });

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      });

      it(`Unauthorized`, async () => {
        const endpoints = [
          {
            route: currentMemberRoute,
            response: MemberFactory(),
          },
          {
            route,
            response: UNAUTHORIZED_RESPONSE,
            method: HttpMethod.Patch,
            statusCode: StatusCodes.UNAUTHORIZED,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, buildChatMention({ account }));

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await expect(
          mockedMutation.mutateAsync({
            id: mentionId,
            status: MentionStatus.Read,
          }),
        ).rejects.toThrow();

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
        expect(mockedNotifier).toHaveBeenCalledWith(
          expect.objectContaining({
            type: patchMentionRoutine.FAILURE,
          }),
        );
      });
    });

    describe('useDeleteMention', () => {
      const route = `/${buildDeleteMentionRoute(mentionId)}`;
      const mutation = mutations.useDeleteMention;

      it(`Delete member mention`, async () => {
        const endpoints = [
          {
            route: currentMemberRoute,
            response: MemberFactory(),
          },
          {
            route,
            response: OK_RESPONSE,
            method: HttpMethod.Delete,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, buildChatMention({ account }));

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await mockedMutation.mutateAsync(mentionId);

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      });

      it(`Unauthorized`, async () => {
        const endpoints = [
          {
            route: currentMemberRoute,
            response: MemberFactory(),
          },
          {
            route,
            response: UNAUTHORIZED_RESPONSE,
            method: HttpMethod.Delete,
            statusCode: StatusCodes.UNAUTHORIZED,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, buildChatMention({ account }));

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await expect(mockedMutation.mutateAsync(mentionId)).rejects.toThrow();

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
        expect(mockedNotifier).toHaveBeenCalledWith(
          expect.objectContaining({
            type: deleteMentionRoutine.FAILURE,
          }),
        );
      });
    });

    describe('useClearMentions', () => {
      const route = `/${buildClearMentionsRoute()}`;
      const mutation = mutations.useClearMentions;

      it(`Clear Member Mentions`, async () => {
        const endpoints = [
          {
            route: currentMemberRoute,
            response: MemberFactory(),
          },
          {
            route,
            response: OK_RESPONSE,
            method: HttpMethod.Delete,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, buildChatMention({ account }));

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await mockedMutation.mutateAsync();

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      });

      it(`Unauthorized`, async () => {
        const endpoints = [
          {
            route,
            response: UNAUTHORIZED_RESPONSE,
            method: HttpMethod.Delete,
            statusCode: StatusCodes.UNAUTHORIZED,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, buildChatMention({ account }));

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await expect(mockedMutation.mutateAsync()).rejects.toThrow();

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
        expect(mockedNotifier).toHaveBeenCalledWith(
          expect.objectContaining({
            type: clearMentionsRoutine.FAILURE,
          }),
        );
      });
    });
  });

  describe('enableWebsockets = true', () => {
    const { wrapper, queryClient, mutations } = setUpTest({
      enableWebsocket: true,
    });

    afterEach(async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      nock.cleanAll();
    });

    describe('usePatchMention', () => {
      const route = `/${buildPatchMentionRoute(mentionId)}`;
      const mutation = mutations.usePatchMention;
      it(`Patch mention status`, async () => {
        const endpoints = [
          {
            route: currentMemberRoute,
            response: MemberFactory(),
          },
          {
            route,
            response: OK_RESPONSE,
            method: HttpMethod.Patch,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, buildChatMention({ account }));

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await mockedMutation.mutateAsync({
          id: mentionId,
          status: MentionStatus.Read,
        });

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeFalsy();
      });
    });

    describe('useDeleteMention', () => {
      const route = `/${buildDeleteMentionRoute(mentionId)}`;
      const mutation = mutations.useDeleteMention;
      it(`Delete member mention`, async () => {
        const endpoints = [
          {
            route: currentMemberRoute,
            response: MemberFactory(),
          },
          {
            route,
            response: OK_RESPONSE,
            method: HttpMethod.Delete,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, buildChatMention({ account }));

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await mockedMutation.mutateAsync(mentionId);

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeFalsy();
      });
    });

    describe('useClearMentions', () => {
      const route = `/${buildClearMentionsRoute()}`;
      const mutation = mutations.useClearMentions;
      it(`Clear chat`, async () => {
        const endpoints = [
          {
            route: currentMemberRoute,
            response: MemberFactory(),
          },
          {
            route,
            response: OK_RESPONSE,
            method: HttpMethod.Delete,
          },
        ];
        // set random data in cache
        queryClient.setQueryData(key, buildChatMention({ account }));

        const mockedMutation = await mockMutation({
          endpoints,
          mutation,
          wrapper,
        });

        await mockedMutation.mutateAsync();

        // verify cache keys
        expect(queryClient.getQueryState(key)?.isInvalidated).toBeFalsy();
      });
    });
  });
});
