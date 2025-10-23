import { describe, expect, it, vi } from 'vitest';

import { splitRequestByIds } from './axios.js';

describe('splitRequestByIds', () => {
  it('Does not send request for empty arrays', async () => {
    const mockBuildRequests = vi.fn().mockResolvedValue('ok');
    await splitRequestByIds([], 1, mockBuildRequests);
    expect(mockBuildRequests).toBeCalledTimes(0);
  });
});
