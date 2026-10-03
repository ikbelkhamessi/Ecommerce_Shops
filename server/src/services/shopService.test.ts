import { describe, expect, it } from 'vitest';
import { reviewApplication } from './shopService.js';
describe('shop application transitions', () => { it('requires a rejection reason', async () => { await expect(reviewApplication('missing', { _id: 'x' } as never, 'REJECTED')).rejects.toThrow('required'); }); });
