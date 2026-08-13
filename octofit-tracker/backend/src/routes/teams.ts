import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members').sort({ points: -1 }).limit(100);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const createdTeam = await Team.create(req.body);
    res.status(201).json(createdTeam);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create team', error });
  }
});

export default router;
