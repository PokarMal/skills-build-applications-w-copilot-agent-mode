import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'all-time'],
      default: 'weekly',
    },
  },
  {
    timestamps: true,
  },
);

const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
