import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const seniorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessType: {
      type: String,
      default: 'senior',
    },
    isProjectLead: {
      type: Boolean,
      default: false,
    },
    team: {
      type: String,
      required: false,
    },
    skills: {
      type: [String],
      required: true,
    },
    projectIdea: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically.
  }
);

// Hash password before its saved in the DB.
seniorSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new).
  if (!this.isModified('password')) {
    next();
  }

  // Hash the password.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password entered to hashed password in DB.
seniorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Senior = mongoose.model('Senior', seniorSchema);