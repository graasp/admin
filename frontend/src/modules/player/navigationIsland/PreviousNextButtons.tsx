import type { JSX } from 'react';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { useParams, useSearch } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import { hooks } from '@/config/queryClient';
import {
  NEXT_ITEM_NAV_BUTTON_ID,
  PREVIOUS_ITEM_NAV_BUTTON_ID,
} from '@/config/selectors';

import {
  combineUuids,
  shuffleAllButLastItemInArray,
} from '~player/utils/shuffle';

import { LoadingButton, NavigationButton } from './customButtons';

function getPrevious(
  itemId: string,
  // includes the rootItem
  folderHierarchy: DiscriminatedItem[],
): DiscriminatedItem | null {
  const idx = folderHierarchy.findIndex(({ id }) => id === itemId);
  if (idx < 0) {
    return null;
  }
  return folderHierarchy[idx - 1];
}

function getNext(
  itemId: string,
  folderHierarchy: DiscriminatedItem[],
): DiscriminatedItem | null {
  const idx = folderHierarchy.findIndex(({ id }) => id === itemId);
  if (idx < 0 || idx + 1 > folderHierarchy.length) {
    return null;
  }
  return folderHierarchy[idx + 1];
}

export function usePreviousNextButtons(): {
  previousButton: JSX.Element | null;
  nextButton: JSX.Element | null;
} {
  const { rootId, itemId } = useParams({ from: '/player/$rootId/$itemId/' });
  const search = useSearch({ from: '/player/$rootId/$itemId/' });
  const { user } = useAuth();
  const { data: rootItem } = hooks.useItem(rootId);

  const { shuffle } = search;

  const { data: descendants, isLoading } = hooks.useDescendants({
    id: rootId,
    types: [ItemType.FOLDER],
    showHidden: false,
    enabled: Boolean(rootId),
  });

  if (isLoading) {
    return {
      previousButton: (
        <LoadingButton disabled>
          <ChevronLeft />
        </LoadingButton>
      ),
      nextButton: (
        <LoadingButton disabled>
          <ChevronRight />
        </LoadingButton>
      ),
    };
  }

  // if there are no descendants then there is no need to navigate
  if (!Array.isArray(descendants) || !rootItem) {
    return { previousButton: null, nextButton: null };
  }

  const folderHierarchy = shuffle
    ? // seed for shuffling is consistent for member + root (base) item combination
      shuffleAllButLastItemInArray(descendants, combineUuids(rootId, user?.id))
    : descendants;
  const folderHierarchyIncludingRoot = [rootItem, ...folderHierarchy];

  const prev = getPrevious(itemId, folderHierarchyIncludingRoot);
  const next = getNext(itemId, folderHierarchyIncludingRoot);

  // should we display both buttons if they are disabled ?
  if (!prev && !next) {
    return { previousButton: null, nextButton: null };
  }

  return {
    previousButton: (
      <NavigationButton
        id={PREVIOUS_ITEM_NAV_BUTTON_ID}
        disabled={!prev}
        key="previousButton"
        to="/player/$rootId/$itemId"
        params={{ rootId, itemId: prev?.id ?? '' }}
        search={search}
      >
        <ChevronLeft />
      </NavigationButton>
    ),

    nextButton: (
      <NavigationButton
        id={NEXT_ITEM_NAV_BUTTON_ID}
        disabled={!next}
        key="nextButton"
        to="/player/$rootId/$itemId"
        params={{ rootId, itemId: next?.id ?? '' }}
        search={search}
      >
        <ChevronRight />
      </NavigationButton>
    ),
  };
}
