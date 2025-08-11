import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalTasks: { type: Number, default: 0 },
  completedTasks: { type: Number, default: 0 },
  totalPomodoroTime: { type: Number, default: 0 }, // minutos
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Stats', statsSchema);
