import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, default: '#000000' }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
