import './globals.css';
import { AuthRefresh } from './auth-refresh';
import { GoogleOAuthProvider } from '@react-oauth/google';
export const metadata = { title: '7wenet west l bled', description: 'Les boutiques de Wist El Bled' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fr"><body><GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}><AuthRefresh /><header className="site-header"><a href="/">7wenet <span>west l bled</span></a><nav className="site-nav"><a href="/favorites">Favoris</a><a href="/profile">Profil</a><a href="/login">Connexion</a><a href="/register">Inscription</a></nav></header><main className="page-main">{children}</main></GoogleOAuthProvider></body></html>; }
