import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function MessageList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/messages').then((data) => setItems(data.items ?? data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading messages…</p>;
  if (!items.length) return <p>No messages yet.</p>;

  return (
    <ul className="message-list">
      {items.map((item) => (
        <li key={item._id}>
          <strong>{item.body}</strong>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
}
