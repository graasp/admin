import { Context } from '@graasp/sdk';

import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { ClientManager } from './ClientManager.js';

// TODO: add more tests
describe('Client Host Manager', () => {
  it('Created the Host manager instance', () => {
    expect(ClientManager.getInstance()).toBeTruthy();
  });

  it('Add query strings for context', () => {
    const manager = ClientManager.getInstance();
    manager.setHost(new URL('http://localhost.com'));
    manager.addPrefix(Context.Builder, '');
    expect(
      manager.getItemLink(Context.Builder, v4(), { mode: 'grid' }),
    ).toContain('grid');
  });
});
