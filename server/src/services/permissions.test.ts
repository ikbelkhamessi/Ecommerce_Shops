import { describe, expect, it } from 'vitest';
import { can } from '../config/permissions.js';
describe('permissions', () => { it('allows admins and denies clients', () => { expect(can({ roles: ['admin'] }, 'shop:approve')).toBe(true); expect(can({ roles: ['client'] }, 'shop:approve')).toBe(false); }); });
