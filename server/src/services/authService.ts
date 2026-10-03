import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../models.js';
import { OAuth2Client } from 'google-auth-library';
const secret = (name: string) => process.env[name] ?? 'development-secret';
export function issueTokens(user: { id?: string; roles: string[] }) {
  return {
    access: jwt.sign({ sub: String(user.id), roles: user.roles }, secret('JWT_ACCESS_SECRET'), { expiresIn: '15m' }),
    refresh: jwt.sign({ sub: String(user.id) }, secret('JWT_REFRESH_SECRET'), { expiresIn: '7d' }),
  };
}
export async function register(input: { email?: string; phone?: string; password: string; fullName: string; role: 'client' | 'partner' }) {
  if (!input.email && !input.phone) throw new Error('Email or phone is required');
  const passwordHash = await argon2.hash(input.password);
  return User.create({ ...input, roles: [input.role], passwordHash });
}
export async function login(identifier: string, password: string) {
  const user = await User.findOne({ $or: [{ email: identifier.toLowerCase() }, { phone: identifier }] });
  if (!user || user.status !== 'active' || !user.passwordHash || !(await argon2.verify(user.passwordHash, password))) throw new Error('Invalid credentials');
  return { user, ...issueTokens(user) };
}
export async function loginWithGoogle(idToken: string, role: 'client' | 'partner' = 'client') {
  if (!process.env.GOOGLE_CLIENT_ID) throw new Error('Google sign-in is not configured');
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email || payload.email_verified !== true) throw new Error('Google account email is not verified');
  let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email: payload.email.toLowerCase() }] });
  if (!user) user = await User.create({ googleId: payload.sub, email: payload.email.toLowerCase(), emailVerifiedAt: new Date(), fullName: payload.name ?? payload.email, roles: [role] });
  else if (!user.googleId) { user.googleId = payload.sub; user.emailVerifiedAt = new Date(); await user.save(); }
  if (user.status !== 'active') throw new Error('Account is suspended');
  return { user, ...issueTokens(user) };
}
export async function refresh(refreshToken: string) {
  const payload = jwt.verify(refreshToken, secret('JWT_REFRESH_SECRET')) as { sub: string };
  const user = await User.findById(payload.sub);
  if (!user || user.status !== 'active') throw new Error('Invalid refresh token');
  return { user, ...issueTokens(user) };
}
