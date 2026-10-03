'use client';
import { useEffect } from 'react';
export function AuthRefresh() { useEffect(() => { const refresh = () => fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' }).catch(() => undefined); const interval = window.setInterval(refresh, 14 * 60 * 1000); return () => window.clearInterval(interval); }, []); return null; }
