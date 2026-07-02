import { connectDb } from '../server/db.js';
import User from '../server/models/User.js';
import Message from '../server/models/Message.js';

await connectDb();
await Message.deleteMany({});
await User.deleteMany({});

const user = await User.create({ email: 'demo@chatter-live.dev', name: 'Demo', passwordHash: await User.hash('demo1234') });
await Message.insertMany(["Welcome to the room","Ship it 🚀","Standup in 5"].map((body) => ({ body, owner: user._id })));

console.log('seeded');
process.exit(0);
