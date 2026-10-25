const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    legacyId: {
      type: Number,
      sparse: true
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required']
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    lastLoginAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Method to verify password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Static helper to hash passwords
adminSchema.statics.hashPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(plainPassword, salt);
};

module.exports = mongoose.model('Admin', adminSchema);
