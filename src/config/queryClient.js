import { configureQueryClient } from "@graasp/query-client";
import notifier from "../middlewares/notifier";
import { API_HOST } from "./constants";

const {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
} = configureQueryClient({
  API_HOST,
  notifier,
});
export {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
};
