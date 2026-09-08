# Chatter Live

Realtime chat rooms with Socket.IO, presence tracking and message history.

## Stack
- Node.js + Express REST API
- MongoDB + Mongoose
- React 18 + Vite client
- JWT auth, Zod validation, Jest + Supertest

## Getting started

```bash
npm install
cp .env.example .env
npm run seed
npm run dev        # API on :4000
npm run dev:client # client on :5173
```

## API

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/auth/signup | Create an account |
| POST | /api/auth/login | Exchange credentials for a JWT |
| GET | /api/messages | List messages (paginated, searchable) |
| POST | /api/messages | Create a message |
| PATCH | /api/messages/:id | Update a message |
| DELETE | /api/messages/:id | Delete a message |
| WS | /socket.io | Realtime channel for messages and presence |

## Testing

```bash
npm test
```

## License

MIT
