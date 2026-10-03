'use client';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
  const [error, setError] = useState('');
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(body) });
    const data = await response.json().catch(() => ({ error: 'Le serveur API est indisponible. Lancez le backend sur le port 4000.' }));
    if (response.ok) window.location.href = '/'; else setError(data.error ?? 'Inscription impossible');
  };
  const googleSuccess = async (credential?: string) => {
    if (!credential) return;
    const response = await fetch('/api/auth/google', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ credential, role: 'client' }) });
    if (response.ok) window.location.href = '/'; else setError((await response.json()).error ?? 'Connexion Google impossible');
  };
  return <><h1>Créer un compte</h1><form className="form" onSubmit={submit}><input name="fullName" placeholder="Nom complet" required/><input name="email" type="email" placeholder="Email (ou utilisez votre téléphone)" /><input name="phone" type="tel" placeholder="Téléphone (optionnel si email fourni)" /><input name="password" type="password" minLength={8} placeholder="Mot de passe" required/><select name="role" defaultValue="client"><option value="client">Client</option><option value="partner">Propriétaire de boutique</option></select><button>S&apos;inscrire</button>{error && <p className="notice" role="alert">{error}</p>}</form><div className="mt-6"><p>Ou continuer avec Gmail</p><GoogleLogin onSuccess={(result) => googleSuccess(result.credential)} onError={() => setError('Connexion Google impossible')} /></div></>;
}
