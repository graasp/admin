import { describe, expect, it } from 'vitest';

import { UndefinedArgument } from './errors.js';

describe('Errors', () => {
  it('Undefined Argument error', () => {
    const error = new UndefinedArgument();
    expect(error).toBeTruthy();
  });
});
