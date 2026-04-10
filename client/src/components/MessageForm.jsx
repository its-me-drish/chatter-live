import { useState } from 'react';
import { api } from '../api.js';

export default function MessageForm({ onCreated }) {
  const [body, setMessageTitle] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const created = await api.post('/messages', { body });
      onCreated?.(created);
      setMessageTitle('');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="message-form">
      <input value={body} onChange={(e) => setMessageTitle(e.target.value)} placeholder="New message" />
      <button disabled={busy || !body.trim()}>Add</button>
    </form>
  );
}
