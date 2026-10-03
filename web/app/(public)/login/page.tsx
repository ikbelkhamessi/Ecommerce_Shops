'use client';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [error, setError] = useState('');
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(body) });
    const data = await response.json().catch(() => ({ error: 'Le serveur API est indisponible. Lancez le backend sur le port 4000.' }));
    if (response.ok) window.location.href = '/'; else setError(data.error ?? 'Connexion impossible');
  };
  const googleSuccess = async (credential?: string) => { if (!credential) return; const response = await fetch('/api/auth/google', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ credential }) }); if (response.ok) window.location.href = '/'; else setError((await response.json()).error ?? 'Connexion Google impossible'); };
  return <><h1>Connexion</h1><form className="form" onSubmit={submit}><input name="email" placeholder="Email ou téléphone" required/><input name="password" type="password" placeholder="Mot de passe" required/><button>Se connecter</button>{error && <p className="notice" role="alert">{error}</p>}</form><p><a href="/forgot-password">Mot de passe oublié ?</a></p><div className="mt-6"><p>Ou continuer avec Gmail</p><GoogleLogin onSuccess={(result) => googleSuccess(result.credential)} onError={() => setError('Connexion Google impossible')} /></div></>;
}
