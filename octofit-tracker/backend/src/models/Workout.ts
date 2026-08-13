import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    targetMuscleGroups: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Workout = model('Workout', workoutSchema);

export default Workout;