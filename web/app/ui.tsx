'use client';
import { useEffect, useState } from 'react';

export function Notice({ children }: { children: React.ReactNode }) {
  return <p className="notice">{children}</p>;
}

export function ResourcePage({ title, endpoint, collection, variant = 'json', action }: { title: string; endpoint: string; collection: string; variant?: 'json' | 'favorite' | 'section' | 'product' | 'application' | 'shop' | 'user' | 'audit'; action?: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState('');
  const load = () => fetch(endpoint, { credentials: 'include' }).then(async (r) => { const data = await r.json(); if (!r.ok) throw new Error(data.error); const value = data[collection]; setItems(Array.isArray(value) ? value : value ? [value] : []); }).catch((e) => setError(e.message));
  useEffect(() => { load(); }, [endpoint, collection]); // eslint-disable-line react-hooks/exhaustive-deps
  const render = (item: Record<string, unknown>) => { if (variant === 'favorite') return <><h2>{String((item.productId as Record<string, unknown> | undefined)?.name ?? (item.shopId as Record<string, unknown> | undefined)?.name ?? 'Favori')}</h2><p className="muted">Votre sélection personnelle.</p></>; if (variant === 'section') return <h2>{String(item.name)}</h2>; if (variant === 'product') return <><h2>{String(item.name)}</h2><p className="price">{String(item.price)} TND</p><p>Stock: {String(item.stock)}</p></>; if (variant === 'application') return <><h2>{String(item.name ?? 'Aucune demande')}</h2><p>Statut: <strong>{String(item.status ?? 'Nouveau')}</strong></p>{item.rejectionReason && <p>Motif: {String(item.rejectionReason)}</p>}</>; if (variant === 'shop') return <><h2>{String(item.name)}</h2><p>Statut: {String(item.status)}</p><p>Propriétaire: {String((item.ownerId as Record<string, unknown> | undefined)?.email ?? '—')}</p></>; if (variant === 'user') return <><h2>{String(item.fullName)}</h2><p>{String(item.email)}</p><p>{Array.isArray(item.roles) ? item.roles.join(', ') : ''} · {String(item.status)}</p></>; if (variant === 'audit') return <><h2>{String(item.action)}</h2><p>{String(item.entity)} · {String(item.createdAt)}</p></>; return <pre>{JSON.stringify(item, null, 2)}</pre>; };
  return <><div className="page-heading"><h1>{title}</h1>{action}</div>{error ? <Notice>{error}</Notice> : <div className="stack">{items.map((item, index) => <article className="card" key={String(item._id ?? index)}>{render(item)}</article>)}</div>}</>;
}

export function PartnerForm({ endpoint = '/api/partner/application' }: { endpoint?: string }) {
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);
    const response = await fetch(endpoint, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, openingHours: [], role: undefined }) });
    const data = await response.json();
    if (response.ok && formData.getAll('documents').some((file) => file instanceof File && file.size > 0)) {
      const uploadData = new FormData();
      formData.getAll('documents').forEach((file) => uploadData.append('documents', file));
      const uploadResponse = await fetch('/api/partner/application/documents', { method: 'POST', credentials: 'include', body: uploadData });
      if (!uploadResponse.ok) { setMessage((await uploadResponse.json()).error); return; }
    }
    setMessage(response.ok ? 'Enregistré. Votre dossier est en attente de validation.' : data.error);
  }
  return <form className="form" onSubmit={submit}><input name="name" placeholder="Nom de la boutique" required/><textarea name="description" placeholder="Description" required/><input name="address" placeholder="Adresse" required/><select name="zone" defaultValue="Souk"><option>Bab Bhar</option><option>Bab Jdid</option><option>Souk</option><option>Other</option></select><input name="phone" placeholder="Téléphone" required/><input name="nationalIdNumber" placeholder="Numéro CIN" required/><input name="commercialRegisterNumber" placeholder="Registre de commerce" required/><input name="documents" type="file" accept="image/jpeg,image/png,image/webp" multiple/><button>Enregistrer la demande</button>{message && <Notice>{message}</Notice>}</form>;
}
