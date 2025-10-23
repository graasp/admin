/**
 * Graasp websocket client
 * React effect hooks to subscribe to real-time updates and mutate query client
 */
import { useEffect } from 'react';

import {
  Channel,
  DiscriminatedItem,
  FeedBackOperation,
  FeedBackOperationType,
  ItemOpFeedbackEvent as OpFeedbackEvent,
  UUID,
  WebsocketClient,
  getIdsFromPath,
  getParentFromPath,
  isOperationEvent,
} from '@graasp/sdk';

import { QueryClient, useQueryClient } from '@tanstack/react-query';

import { getKeyForParentId, itemKeys, memberKeys } from '../../keys.js';
import {
  copyItemsRoutine,
  deleteItemsRoutine,
  editItemRoutine,
  moveItemsRoutine,
  postItemValidationRoutine,
  recycleItemsRoutine,
  restoreItemsRoutine,
} from '../../routines/index.js';
import createRoutine from '../../routines/utils.js';
import { Notifier } from '../../types.js';
import { KINDS, TOPICS } from '../constants.js';

const invalidateRootDescendants = (
  queryClient: QueryClient,
  itemPath: string,
) => {
  // invalidate descendants
  const rootId = getIdsFromPath(itemPath)[0];
  queryClient.invalidateQueries({
    queryKey: itemKeys.single(rootId).descendants(),
  });
};

/**
 * Events from asynchronous background operations on given items
 */
type ItemOpFeedbackEvent<
  T extends FeedBackOperationType = FeedBackOperationType,
> = OpFeedbackEvent<DiscriminatedItem, T>;

const InvalidateItemOpFeedback = (queryClient: QueryClient) => ({
  [FeedBackOperation.DELETE]: () => {
    // invalidate data displayed in the Trash screen
    queryClient.invalidateQueries({
      queryKey: memberKeys.current().allRecycled,
    });
  },
  [FeedBackOperation.MOVE]: (
    event: ItemOpFeedbackEvent<typeof FeedBackOperation.MOVE>,
  ) => {
    if (event.result) {
      const { items, moved } = event.result;
      const oldParentKey = getKeyForParentId(getParentFromPath(items[0].path));
      const newParentKey = getKeyForParentId(getParentFromPath(moved[0].path));
      // invalidate queries for the source and destination
      queryClient.invalidateQueries({ queryKey: oldParentKey });
      queryClient.invalidateQueries({ queryKey: newParentKey });
    }
  },
  [FeedBackOperation.COPY]: (
    event: ItemOpFeedbackEvent<typeof FeedBackOperation.COPY>,
  ) => {
    if (event.result) {
      const { copies } = event.result;

      const firstItemPath = copies[0].path;
      const newParentKey = getKeyForParentId(getParentFromPath(firstItemPath));
      // invalidate queries for the destination
      queryClient.invalidateQueries({ queryKey: newParentKey });

      invalidateRootDescendants(queryClient, firstItemPath);
    }
  },
  [FeedBackOperation.RECYCLE]: (
    event: ItemOpFeedbackEvent<typeof FeedBackOperation.RECYCLE>,
  ) => {
    if (event.result) {
      const items = event.result;
      const firstPath = items[0].path;
      const parentKey = getKeyForParentId(getParentFromPath(firstPath));
      // invalidate queries for the parent
      queryClient.invalidateQueries({ queryKey: parentKey });

      invalidateRootDescendants(queryClient, firstPath);

      queryClient.resetQueries({
        queryKey: memberKeys.current().allRecycled,
      });
    }
  },
  [FeedBackOperation.RESTORE]: () => {
    queryClient.invalidateQueries({
      queryKey: memberKeys.current().allRecycled,
    });
  },
  [FeedBackOperation.VALIDATE]: (itemIds: string[]) => {
    itemIds.forEach((itemId) => {
      // Invalidates the publication status to get the new status after the validation.
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).publicationStatus,
      });
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).validation,
      });
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).publishedInformation,
      });
    });
  },
});

export const configureWsItemHooks = (
  websocketClient: WebsocketClient,
  notifier?: Notifier,
) => ({
  /**
   * React hook to subscribe to the feedback of async operations performed by the given user ID
   * @param userId The ID of the user on which to observe item feedback updates
   */
  useItemFeedbackUpdates: (userId?: UUID | null) => {
    const queryClient = useQueryClient();
    useEffect(
      () => {
        if (!userId) {
          return () => {
            // do nothing
          };
        }

        const channel: Channel = { name: userId, topic: TOPICS.ITEM_MEMBER };

        const handler = (event: ItemOpFeedbackEvent) => {
          if (event.kind === KINDS.FEEDBACK) {
            const invalidateFeedback = InvalidateItemOpFeedback(queryClient);
            let routine: ReturnType<typeof createRoutine> | undefined;
            let message: string | undefined;
            const itemIds = event.resource;

            switch (true) {
              // TODO: still used ?
              case isOperationEvent(event, FeedBackOperation.UPDATE):
                routine = editItemRoutine;
                message = 'EDIT_ITEM';
                // todo: add invalidations for queries related to an update of the itemIds specified
                break;
              case isOperationEvent(event, FeedBackOperation.DELETE):
                routine = deleteItemsRoutine;
                message = 'DELETE_ITEMS';
                invalidateFeedback[event.op]();
                break;
              case isOperationEvent(event, FeedBackOperation.MOVE): {
                routine = moveItemsRoutine;
                message = 'MOVE_ITEMS';
                invalidateFeedback[event.op](event);
                break;
              }
              case isOperationEvent(event, FeedBackOperation.COPY):
                routine = copyItemsRoutine;
                message = 'COPY_ITEMS';
                invalidateFeedback[event.op](event);
                break;
              case isOperationEvent(event, FeedBackOperation.RECYCLE):
                routine = recycleItemsRoutine;
                message = 'RECYCLE_ITEMS';
                invalidateFeedback[event.op](event);
                break;
              case isOperationEvent(event, FeedBackOperation.RESTORE):
                routine = restoreItemsRoutine;
                message = 'RESTORE_ITEMS';
                invalidateFeedback[event.op]();
                break;
              case isOperationEvent(event, FeedBackOperation.VALIDATE):
                routine = postItemValidationRoutine;
                message = 'DEFAULT_SUCCESS';
                invalidateFeedback[event.op](itemIds);
                break;
              default: {
                console.error('unhandled event for useItemFeedbackUpdates');
                break;
              }
            }
            if (routine && message) {
              if (event.errors.length > 0) {
                notifier?.({
                  type: routine.FAILURE,
                  payload: {
                    error: event.errors[0], // TODO: check what to send if multiple errors
                  },
                });
              } else {
                notifier?.({
                  type: routine.SUCCESS,
                  payload: { message },
                });
              }
            }
          }
        };

        websocketClient.subscribe(channel, handler);

        return function cleanup() {
          websocketClient.unsubscribe(channel, handler);
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [userId],
    );
  },
});
