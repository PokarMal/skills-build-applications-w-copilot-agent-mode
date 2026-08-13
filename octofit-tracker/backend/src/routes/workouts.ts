import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 }).limit(100);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const createdWorkout = await Workout.create(req.body);
    res.status(201).json(createdWorkout);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create workout', error });
  }
});

export default router;