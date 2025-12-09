import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    body: { type: String, required: true, maxlength: 2000 },
    room: { type: String, required: true, index: true },
    editedAt: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
