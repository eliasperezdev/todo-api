import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false }
});

const historySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  action: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  priority: { type: String, enum: ['fácil', 'media', 'difícil'], default: 'media' },
  dueDate: Date,
  assignedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subtasks: [subtaskSchema],
  status: { type: String, enum: ['pendiente', 'en progreso', 'completada'], default: 'pendiente' },
  pomodoro: {
    sessions: { type: Number, default: 0 },
    sessionLength: { type: Number, default: 25 },
    breakLength: { type: Number, default: 5 }
  },
  history: [historySchema],
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
