import { ItemType } from '@graasp/sdk';

import nock from 'nock';
import { v4 } from 'uuid';
import { describe, it } from 'vitest';

import { API_HOST } from '@/config/env.js';

import { getDescendants } from './api.js';

describe('getDescendants', () => {
  it('without parameters', async () => {
    const itemId = v4();
    const scope = nock(API_HOST)
      .get(`/items/${itemId}/descendants`)
      .reply(200, { data: { value: 'hello' } });
    await getDescendants({ id: itemId });
    // ensure the request was made
    scope.done();
  });

  it.each([
    { inputs: { showHidden: true }, query: 'showHidden=true' },
    { inputs: { showHidden: false }, query: 'showHidden=false' },
    {
      inputs: { types: [ItemType.FOLDER], showHidden: false },
      query: 'types=folder&showHidden=false',
    },
    {
      inputs: { types: [ItemType.FOLDER], showHidden: true },
      query: 'types=folder&showHidden=true',
    },
    {
      inputs: { types: [ItemType.FOLDER, ItemType.APP], showHidden: false },
      query: 'types=folder&types=app&showHidden=false',
    },
    {
      inputs: { types: [ItemType.FOLDER, ItemType.APP], showHidden: true },
      query: 'types=folder&types=app&showHidden=true',
    },
  ])('With parameters: $inputs', async ({ inputs, query }) => {
    const id = v4();
    const scope = nock(API_HOST)
      .get(`/items/${id}/descendants?${query}`)
      .reply(200, { data: { value: 'hello' } });
    await getDescendants({ id, ...inputs });
    // ensure the request was made
    scope.done();
  });
});
