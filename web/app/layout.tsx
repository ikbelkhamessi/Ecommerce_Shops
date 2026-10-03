import './globals.css';
export const metadata = { title: '7wenet west l bled', description: 'Les boutiques de Wist El Bled' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fr"><body><header><a href="/">7wenet <span>west l bled</span></a><nav><a href="/favorites">Favoris</a><a href="/profile">Profil</a><a href="/login">Connexion</a><a href="/register">Inscription</a></nav></header><main>{children}</main></body></html>; }
