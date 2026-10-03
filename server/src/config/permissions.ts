export type Role = 'admin' | 'partner' | 'client';
export type Permission = 'shop:approve' | 'shop:manage' | 'product:manage' | 'user:manage' | 'audit:read';
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['shop:approve', 'shop:manage', 'product:manage', 'user:manage', 'audit:read'],
  partner: ['shop:manage', 'product:manage'],
  client: [],
};
export function can(user: { roles: string[] }, permission: Permission): boolean {
  return user.roles.some((role) => ROLE_PERMISSIONS[role as Role]?.includes(permission));
}
