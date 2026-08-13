import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const period = typeof req.query.period === 'string' ? req.query.period : 'weekly';
    const entries = await LeaderboardEntry.find({ period })
      .populate('user')
      .sort({ score: -1 })
      .limit(100);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const createdEntry = await LeaderboardEntry.create(req.body);
    res.status(201).json(createdEntry);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create leaderboard entry', error });
  }
});

export default router;
