import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import Message from '../models/Message.js';

export function attachRealtime(httpServer) {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.use((socket, next) => {
    try {
      socket.user = jwt.verify(socket.handshake.auth?.token, config.jwtSecret);
      next();
    } catch {
      next(new Error('unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('room:join', async (room) => {
      socket.join(room);
      socket.to(room).emit('presence:join', { userId: socket.user.sub });
      socket.emit('message:history', await Message.find({ room }).sort('-createdAt').limit(50));
    });

    socket.on('message:send', async ({ room, body }) => {
      const message = await Message.create({ room, body, owner: socket.user.sub });
      io.to(room).emit('message:new', message);
    });
  });

  return io;
}
