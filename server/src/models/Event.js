const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    legacyId: {
      type: Number,
      sparse: true
    },
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required']
    },
    location: {
      type: String,
      trim: true,
      default: null
    },
    coverImagePath: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null
    },
    publishedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for attached media
eventSchema.virtual('media', {
  ref: 'EventMedia',
  localField: '_id',
  foreignField: 'eventId'
});

// Index for status and date
eventSchema.index({ status: 1, eventDate: -1 });

module.exports = mongoose.model('Event', eventSchema);
