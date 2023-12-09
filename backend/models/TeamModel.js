import mongoose from 'mongoose';

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
      unique: true,
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Senior',
    }],
    advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Advisor',
    },
    codingLanguages: [{
      type: String,
      required: true,
    }],
    frameworks: [{
      type: String,
      required: true,
    }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically.
  }
);

export const Team = mongoose.model('Team', teamSchema);