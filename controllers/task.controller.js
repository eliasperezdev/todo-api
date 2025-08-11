import Task from '../models/Task.js';
import User from '../models/User.js';
import Category from '../models/Category.js';

// create task
export const createTask = async (req, res) => {
  try {
    const { assignedUserId, categoryId } = req.body;

    // Validar usuario y categoría si existen
    if (assignedUserId) {
      const user = await User.findById(assignedUserId);
      if (!user) return res.status(400).json({ error: 'Usuario asignado no existe' });
    }
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) return res.status(400).json({ error: 'Categoría no existe' });
    }

    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all tasks from user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedUserId', 'name email')
      .populate('categoryId', 'name color');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get task by id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedUserId', 'name email')
      .populate('categoryId', 'name color');
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// put task
export const updateTask = async (req, res) => {
  try {
    const { assignedUserId, categoryId } = req.body;

    if (assignedUserId) {
      const user = await User.findById(assignedUserId);
      if (!user) return res.status(400).json({ error: 'Usuario asignado no existe' });
    }
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) return res.status(400).json({ error: 'Categoría no existe' });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
