const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    legacyId: {
      type: Number,
      sparse: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      trim: true,
      default: null
    },
    enquiryType: {
      type: String,
      enum: ['general', 'admission', 'career', 'other'],
      default: 'general'
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters']
    },
    status: {
      type: String,
      enum: ['new', 'read', 'in_progress', 'resolved'],
      default: 'new'
    },
    ipAddress: {
      type: String,
      default: null
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

enquirySchema.index({ status: 1, submittedAt: -1 });
enquirySchema.index({ enquiryType: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
