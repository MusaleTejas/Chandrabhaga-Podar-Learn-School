const mongoose = require('mongoose');

const eventMediaSchema = new mongoose.Schema(
  {
    legacyId: {
      type: Number,
      sparse: true
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required']
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      required: [true, 'Media type must be image or video']
    },
    filePath: {
      type: String,
      required: [true, 'File path is required'],
      trim: true
    },
    originalFilename: {
      type: String,
      default: null,
      trim: true
    },
    caption: {
      type: String,
      default: null,
      trim: true
    },
    sortOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

eventMediaSchema.index({ eventId: 1, sortOrder: 1 });
eventMediaSchema.index({ mediaType: 1 });

module.exports = mongoose.model('EventMedia', eventMediaSchema);
