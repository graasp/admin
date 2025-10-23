import { Channel } from '@graasp/sdk';

import { vi } from 'vitest';

export type Handler = { channel: Channel; handler: (event: unknown) => void };

export const MockedWebSocket = (handlers: Handler[]) => ({
  subscribe: vi.fn((channel, handler) => {
    handlers.push({ channel, handler });
  }),
  unsubscribe: vi.fn(),
});

export const getHandlerByChannel = (
  thisHandlers: Handler[],
  thisChannel: Channel,
): Handler | undefined =>
  thisHandlers.find(
    ({ channel: c }) =>
      thisChannel.name === c.name && thisChannel.topic === c.topic,
  );
