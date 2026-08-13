import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(100);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
});

export default router;
