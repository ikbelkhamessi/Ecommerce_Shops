import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../models.js';
const secret = (name: string) => process.env[name] ?? 'development-secret';
export async function register(input: { email?: string; phone?: string; password: string; fullName: string; role: 'client' | 'partner' }) {
  const passwordHash = await argon2.hash(input.password);
  return User.create({ ...input, roles: [input.role], passwordHash });
}
export async function login(email: string, password: string) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || user.status !== 'active' || !(await argon2.verify(user.passwordHash, password))) throw new Error('Invalid credentials');
  return { user, access: jwt.sign({ sub: user.id, roles: user.roles }, secret('JWT_ACCESS_SECRET'), { expiresIn: '15m' }), refresh: jwt.sign({ sub: user.id }, secret('JWT_REFRESH_SECRET'), { expiresIn: '7d' }) };
}
