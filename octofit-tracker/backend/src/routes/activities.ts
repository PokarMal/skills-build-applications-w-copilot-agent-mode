import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user')
      .sort({ performedAt: -1 })
      .limit(100);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const createdActivity = await Activity.create(req.body);
    res.status(201).json(createdActivity);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create activity', error });
  }
});

export default router;
