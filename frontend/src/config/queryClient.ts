import { configureWebsocketClient } from '@graasp/sdk';

import { configureQueryClient } from '@/query';

import { API_HOST, SHOW_NOTIFICATIONS } from './env';
import notifier from './notifier';

export const WS_CLIENT = configureWebsocketClient(
  `${API_HOST.replace('http', 'ws')}/ws`,
);

const {
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  useMutation,
  useQueryClient,
  ReactQueryDevtools,
  axios,
  useQuery,
} = configureQueryClient({
  API_HOST,
  notifier,
  defaultQueryOptions: {
    keepPreviousData: true,
  },
  SHOW_NOTIFICATIONS,
  wsClient: WS_CLIENT,
});
export {
  useQueryClient,
  mutations,
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  axios,
  useQuery,
};
