import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function Room({ room }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io({ auth: { token: localStorage.getItem('token') } });
    socketRef.current = socket;
    socket.emit('room:join', room);
    socket.on('message:history', (history) => setMessages(history.reverse()));
    socket.on('message:new', (msg) => setMessages((cur) => [...cur, msg]));
    return () => socket.disconnect();
  }, [room]);

  function send(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    socketRef.current.emit('message:send', { room, body: draft });
    setDraft('');
  }

  return (
    <section className="room">
      <ul>{messages.map((m) => <li key={m._id}>{m.body}</li>)}</ul>
      <form onSubmit={send}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Message #${room}`} />
        <button>Send</button>
      </form>
    </section>
  );
}
