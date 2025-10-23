import { LIBRARY_HOST } from './env';

export const buildGraaspPlayerView = (id: string): string =>
  `/player/${id}/${id}`;
export const buildGraaspBuilderView = (id: string): string =>
  `/builder/items/${id}`;
export const buildGraaspLibraryLink = (id: string): string =>
  `${LIBRARY_HOST}/collections/${id}`;
