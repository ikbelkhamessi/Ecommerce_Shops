/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { User } from './models.js';
import { can, type Permission } from './config/permissions.js';
declare global { namespace Express { interface Request { user?: any } } }
export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? 'development-secret') as { sub: string };
    req.user = await User.findById(payload.sub);
    if (!req.user) return res.status(401).json({ error: 'Authentication required' });
    next();
  } catch { res.status(401).json({ error: 'Invalid session' }); }
};
export const requirePermission = (permission: Permission): RequestHandler => (req, res, next) => req.user && can(req.user, permission) ? next() : res.status(403).json({ error: 'Forbidden' });
