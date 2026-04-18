import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import LoginForm from './components/LoginForm.jsx';
import MessageList from './components/MessageList.jsx';
import MessageForm from './components/MessageForm.jsx';

function Shell() {
  const { token, logout } = useAuth();
  const [version, setVersion] = useState(0);

  if (!token) return <LoginForm />;

  return (
    <main className="shell">
      <header>
        <h1>Chatter Live</h1>
        <button onClick={logout}>Sign out</button>
      </header>
      <MessageForm onCreated={() => setVersion((v) => v + 1)} />
      <MessageList key={version} />
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
