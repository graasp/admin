import React, { JSX } from 'react';

import { Channel, WebsocketClient } from '@graasp/sdk';

import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { API_HOST } from '@/config/env.js';

import { axiosClient } from '../api/axios.js';
import configureQueryClient from '../queryClient.js';
import { Notifier, QueryClientConfig } from '../types.js';

export type Handler = { channel: Channel; handler: (event: unknown) => void };

const MockedWebsocket = (handlers: Handler[]) => ({
  subscribe: vi.fn((channel, handler) => {
    handlers.push({ channel, handler });
  }),
  unsubscribe: vi.fn(),
});

export const setUpWsTest = <T extends object>(args: {
  enableWebsocket?: boolean;
  notifier?: Notifier;
  configureWsHooks: (wsClient: WebsocketClient) => T;
}) => {
  const {
    notifier = () => {
      // do nothing
    },
    configureWsHooks,
  } = args ?? {};

  const handlers: Handler[] = [];
  const websocketClient = MockedWebsocket(handlers);

  const queryConfig: QueryClientConfig = {
    API_HOST,
    axios: axiosClient,
    defaultQueryOptions: {
      retry: 0,
      gcTime: 0,
      staleTime: 0,
    },
    SHOW_NOTIFICATIONS: false,
    notifier,
    enableWebsocket: true,
    wsClient: websocketClient,
  };

  const { QueryClientProvider, useMutation, queryClient } =
    configureQueryClient(queryConfig);

  // configure hooks
  const hooks = configureWsHooks?.(websocketClient);

  const wrapper = ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { hooks, wrapper, queryClient, useMutation, handlers };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockWsHook = async ({ hook, wrapper, enabled }: any) => {
  // wait for rendering hook
  const {
    result,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any;
  } = renderHook(hook, { wrapper });

  // this hook is disabled, it will never fetch
  if (enabled === false) {
    return result.current;
  }

  // return hook data
  return result.current;
};

export const getHandlerByChannel = (
  handlers: Handler[],
  channel: Channel,
): Handler | undefined =>
  handlers.find(
    ({ channel: thisChannel }) =>
      channel.name === thisChannel.name && channel.topic === thisChannel.topic,
  );
