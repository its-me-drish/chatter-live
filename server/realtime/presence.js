const rooms = new Map();

export function join(room, userId) {
  if (!rooms.has(room)) rooms.set(room, new Set());
  rooms.get(room).add(userId);
  return [...rooms.get(room)];
}

export function leave(room, userId) {
  rooms.get(room)?.delete(userId);
  return [...(rooms.get(room) ?? [])];
}

export const occupants = (room) => [...(rooms.get(room) ?? [])];
