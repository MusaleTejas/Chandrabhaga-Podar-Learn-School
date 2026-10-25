const Event = require('../models/Event');
const EventMedia = require('../models/EventMedia');
const fs = require('fs');
const path = require('path');

// @desc    Get Public Published Events (paginated)
// @route   GET /api/events
// @access  Public
exports.getPublishedEvents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const skip = (page - 1) * limit;

    const query = { status: 'published' };

    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ eventDate: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Populate media count for each event
    const eventIds = events.map(e => e._id);
    const mediaCounts = await EventMedia.aggregate([
      { $match: { eventId: { $in: eventIds } } },
      { $group: { _id: '$eventId', count: { $sum: 1 } } }
    ]);

    const countMap = {};
    mediaCounts.forEach(mc => {
      countMap[mc._id.toString()] = mc.count;
    });

    const enrichedEvents = events.map(ev => ({
      ...ev,
      mediaCount: countMap[ev._id.toString()] || 0
    }));

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      events: enrichedEvents
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Event Details (with attached photos and videos)
// @route   GET /api/events/:id
// @access  Public (drafts restricted to admin)
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.'
      });
    }

    // If draft, require admin
    if (event.status !== 'published' && (!req.admin || req.admin.status !== 'active')) {
      return res.status(403).json({
        success: false,
        message: 'This event is currently a private draft and has not been published yet.'
      });
    }

    const media = await EventMedia.find({ eventId: event._id }).sort({ sortOrder: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      event: {
        ...event.toObject(),
        media
      }
    });
  } catch (error) {
    next(error);
  }
};
