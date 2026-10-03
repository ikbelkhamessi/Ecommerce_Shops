'use client';
import { useEffect, useState } from 'react';
export default function ProfilePage() { const [user, setUser] = useState<Record<string, unknown> | null>(null); useEffect(() => { fetch('/api/auth/me', { credentials: 'include' }).then((r) => r.json()).then((d) => setUser(d.user ?? null)); }, []); return <><h1>Mon profil</h1>{user ? <article className="card"><h2>{String(user.fullName)}</h2><p>{String(user.email ?? user.phone)}</p><p>Rôles: {Array.isArray(user.roles) ? user.roles.join(', ') : ''}</p></article> : <p>Connectez-vous pour voir votre profil.</p>}</>; }
