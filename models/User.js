import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  role: { type: String, enum: ['admin', 'member'], default: 'member' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
