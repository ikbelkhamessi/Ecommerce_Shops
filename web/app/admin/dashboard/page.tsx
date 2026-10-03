'use client';
import { useEffect, useState } from 'react';
export default function Dashboard() { const [data, setData] = useState<Record<string, number>>({}); useEffect(() => { fetch('/api/admin/dashboard', { credentials: 'include' }).then((r) => r.json()).then(setData); }, []); return <><h1>Tableau de bord</h1><div className="grid">{[['Demandes en attente', 'pendingApplications'], ['Boutiques actives', 'activeShops'], ['Utilisateurs', 'totalUsers']].map(([label, key]) => <article className="card" key={key}><h2>{label}</h2><p className="price">{data[key] ?? '—'}</p></article>)}</div></>; }
