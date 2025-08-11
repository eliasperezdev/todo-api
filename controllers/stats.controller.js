import Stats from '../models/Stats.js';
import User from '../models/User.js';


export const createOrUpdateStats = async (req, res) => {
  try {
    const { userId, date } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: 'Usuario no existe' });

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let stats = await Stats.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (stats) {
      stats.totalTasks = req.body.totalTasks ?? stats.totalTasks;
      stats.completedTasks = req.body.completedTasks ?? stats.completedTasks;
      stats.totalPomodoroTime = req.body.totalPomodoroTime ?? stats.totalPomodoroTime;
      await stats.save();
      return res.json(stats);
    }

    stats = new Stats(req.body);
    await stats.save();
    res.status(201).json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getStatsByUser = async (req, res) => {
  try {
    const stats = await Stats.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStatsById = async (req, res) => {
  try {
    const stats = await Stats.findById(req.params.id);
    if (!stats) return res.status(404).json({ error: 'Estadísticas no encontradas' });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStats = async (req, res) => {
  try {
    const stats = await Stats.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stats) return res.status(404).json({ error: 'Estadísticas no encontradas' });
    res.json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStats = async (req, res) => {
  try {
    const stats = await Stats.findByIdAndDelete(req.params.id);
    if (!stats) return res.status(404).json({ error: 'Estadísticas no encontradas' });
    res.json({ message: 'Estadísticas eliminadas' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
