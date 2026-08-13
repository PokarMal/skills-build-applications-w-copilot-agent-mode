import mongoose from 'mongoose';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Reynolds',
        email: 'ava@octofit.dev',
        fitnessLevel: 'beginner',
      },
      {
        name: 'Noah Kim',
        email: 'noah@octofit.dev',
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Mia Patel',
        email: 'mia@octofit.dev',
        fitnessLevel: 'advanced',
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan@octofit.dev',
        fitnessLevel: 'intermediate',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Pulse Pioneers',
        members: [users[0]._id, users[1]._id],
        points: 180,
      },
      {
        name: 'Cardio Crew',
        members: [users[2]._id, users[3]._id],
        points: 225,
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 30,
        caloriesBurned: 280,
        performedAt: new Date('2026-08-10T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 45,
        caloriesBurned: 410,
        performedAt: new Date('2026-08-10T18:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Strength Training',
        durationMinutes: 50,
        caloriesBurned: 390,
        performedAt: new Date('2026-08-11T06:45:00Z'),
      },
      {
        user: users[3]._id,
        type: 'Yoga',
        durationMinutes: 40,
        caloriesBurned: 180,
        performedAt: new Date('2026-08-11T19:15:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        user: users[2]._id,
        score: 980,
        period: 'weekly',
      },
      {
        user: users[1]._id,
        score: 860,
        period: 'weekly',
      },
      {
        user: users[3]._id,
        score: 810,
        period: 'weekly',
      },
      {
        user: users[0]._id,
        score: 640,
        period: 'weekly',
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Starter Full Body',
        difficulty: 'beginner',
        durationMinutes: 25,
        targetMuscleGroups: ['legs', 'core', 'back'],
        description: 'Low-impact circuit to build consistency and movement quality.',
      },
      {
        title: 'Tempo Endurance Ride',
        difficulty: 'intermediate',
        durationMinutes: 40,
        targetMuscleGroups: ['legs', 'cardio'],
        description: 'Steady-state cycling blocks for aerobic capacity.',
      },
      {
        title: 'Power Strength Split',
        difficulty: 'advanced',
        durationMinutes: 55,
        targetMuscleGroups: ['chest', 'back', 'shoulders', 'core'],
        description: 'Compound lift sequence focused on power and volume.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
