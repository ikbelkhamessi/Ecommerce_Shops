import { describe, expect, it } from 'vitest';
import { applicationStatus, reviewApplication } from './shopService.js';
describe('shop application transitions', () => { it('requires a rejection reason', async () => { await expect(reviewApplication('missing', { _id: 'x' } as never, 'REJECTED')).rejects.toThrow('required'); }); });
describe('application status', () => { it('preserves approved and suspended shops while allowing new and rejected submissions', () => { expect(applicationStatus()).toBe('PENDING'); expect(applicationStatus('REJECTED')).toBe('PENDING'); expect(applicationStatus('APPROVED')).toBe('APPROVED'); expect(applicationStatus('SUSPENDED')).toBe('SUSPENDED'); }); });
