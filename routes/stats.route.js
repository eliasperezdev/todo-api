import express from 'express';
import {
  createOrUpdateStats,
  getStatsByUser,
  getStatsById,
  updateStats,
  deleteStats
} from '../controllers/stats.controller.js';

const router = express.Router();

router.post('/', createOrUpdateStats);
router.get('/user/:userId', getStatsByUser);
router.get('/:id', getStatsById);
router.put('/:id', updateStats);
router.delete('/:id', deleteStats);

export default router;
