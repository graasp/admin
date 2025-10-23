import React from 'react';

import { Channel, HttpMethod, spliceIntoChunks } from '@graasp/sdk';

import {
  QueryObserverBaseResult,
  UseMutationResult,
} from '@tanstack/react-query';
import { RenderHookOptions, renderHook, waitFor } from '@testing-library/react';
import { StatusCodes } from 'http-status-codes';
import nock, { InterceptFunction, ReplyHeaders, Scope } from 'nock';
import { expect, vi } from 'vitest';

import { API_HOST } from '@/config/env.js';

import { axiosClient } from '../api/axios.js';
import {
  CACHE_TIME_MILLISECONDS,
  STALE_TIME_MILLISECONDS,
} from '../config/constants.js';
import configureQueryClient from '../queryClient.js';
import { Notifier, QueryClientConfig } from '../types.js';

export type Handler = { channel: Channel; handler: (event: unknown) => void };

const MockedWebsocket = (handlers: Handler[]) => ({
  subscribe: vi.fn((channel, handler) => {
    handlers.push({ channel, handler });
  }),
  unsubscribe: vi.fn(),
});
type Args = { enableWebsocket?: boolean; notifier?: Notifier };

export const setUpTest = (args?: Args) => {
  const {
    enableWebsocket = false,
    notifier = () => {
      // do nothing
    },
  } = args ?? {};

  const websocketClient = MockedWebsocket([]);

  const queryConfig: QueryClientConfig = {
    API_HOST,
    axios: axiosClient,
    defaultQueryOptions: {
      retry: 0,
      gcTime: CACHE_TIME_MILLISECONDS,
      staleTime: STALE_TIME_MILLISECONDS,
    },
    SHOW_NOTIFICATIONS: false,
    notifier,
    enableWebsocket,
    wsClient: enableWebsocket ? websocketClient : undefined, // use default
  };

  const { mutations, hooks, QueryClientProvider, queryClient } =
    configureQueryClient(queryConfig);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { hooks, wrapper, queryClient, mutations };
};

export type Endpoint = {
  route: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
  method?: HttpMethod;
  statusCode?: number;
  headers?: ReplyHeaders;
};

interface MockArguments<TProps> {
  endpoints?: Endpoint[];
  wrapper: RenderHookOptions<TProps>['wrapper'];
}

interface MockHookArguments<TProps, TResult extends QueryObserverBaseResult>
  extends MockArguments<TProps> {
  hook: (props: TProps) => TResult;
  enabled?: boolean;
}
interface MockMutationArguments<TProps, TData, TError, TVariables, TContext>
  extends MockArguments<TProps> {
  mutation: () => UseMutationResult<TData, TError, TVariables, TContext>;
}

type NockMethodType = Exclude<
  {
    [MethodName in keyof Scope]: Scope[MethodName] extends InterceptFunction
      ? MethodName
      : never;
  }[keyof Scope],
  // remove undefined
  undefined
>;

export const mockEndpoints = (
  endpoints: Endpoint[],
  persist: boolean = false,
) => {
  // mock endpoint with given response
  const server = nock(API_HOST);
  endpoints.forEach(({ route, method, statusCode, response, headers }) => {
    const mock = server[
      (method || HttpMethod.Get).toLowerCase() as NockMethodType
    ](route).reply(statusCode || StatusCodes.OK, response, headers);

    if (persist) {
      mock.persist();
    }
  });
  return server;
};

export const mockHook = async <
  TProps,
  TResult extends QueryObserverBaseResult,
>({
  endpoints,
  hook,
  wrapper,
  enabled,
}: MockHookArguments<TProps, TResult>): Promise<TResult> => {
  if (endpoints) {
    mockEndpoints(endpoints);
  }
  // wait for rendering hook
  const { result } = renderHook(hook, { wrapper });

  // this hook is disabled, it will never fetch
  if (enabled === false) {
    return result.current;
  }

  await waitFor(() => {
    expect(result.current.isSuccess || result.current.isError).toBe(true);
  });

  // return hook data
  return result.current;
};

export const mockMutation = async <
  TData,
  TError,
  TVariables,
  TContext,
  TProps,
>({
  mutation,
  wrapper,
  endpoints,
}: MockMutationArguments<TProps, TData, TError, TVariables, TContext>) => {
  if (endpoints) {
    mockEndpoints(endpoints);
  }

  // wait for rendering hook
  const { result } = renderHook(mutation, { wrapper });
  await waitFor(() => expect(result.current.isIdle).toBe(true));

  // return mutation data
  return result.current;
};

export const splitEndpointByIds = (
  ids: string[],
  chunkSize: number,
  buildRoute: (ids: string[]) => string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getKey?: (d: any) => string,
  method?: HttpMethod,
) =>
  spliceIntoChunks(ids, chunkSize).map((chunk, idx) => {
    const data = response.slice(idx * chunkSize, (idx + 1) * chunkSize).reduce(
      (prev, d) => ({
        ...prev,
        [getKey?.(d) ?? d.id]: d,
      }),
      {},
    );
    return {
      route: buildRoute(chunk),
      response: {
        data,
        errors: [],
      },
      method,
    };
  });

export const splitEndpointByIdsForErrors = (
  ids: string[],
  chunkSize: number,
  buildRoute: (ids: string[]) => string,
  data: { response: unknown; statusCode: StatusCodes },
  method?: HttpMethod,
) =>
  spliceIntoChunks(ids, chunkSize).map((chunk) => ({
    route: buildRoute(chunk),
    ...data,
    method,
  }));
