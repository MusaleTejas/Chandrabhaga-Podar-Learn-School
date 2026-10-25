const Event = require('../models/Event');
const EventMedia = require('../models/EventMedia');
const Enquiry = require('../models/Enquiry');
const fs = require('fs');
const path = require('path');

// Helper to unlink uploaded files
const unlinkFile = (relativeFilePath) => {
  if (!relativeFilePath) return;
  try {
    // Relative path e.g. "uploads/events/xxx.jpg"
    const fullPath = path.resolve(__dirname, '../../', relativeFilePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error('Failed to unlink file:', relativeFilePath, err.message);
  }
};

// @desc    Dashboard Metrics & Recents
// @route   GET /api/admin/dashboard-stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalEvents = await Event.countDocuments();
    const publishedEvents = await Event.countDocuments({ status: 'published' });
    const draftEvents = await Event.countDocuments({ status: 'draft' });
    const totalMedia = await EventMedia.countDocuments();
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'new' });

    const recentEvents = await Event.find()
      .select('title eventDate status updatedAt')
      .sort({ updatedAt: -1 })
      .limit(5);

    const recentEnquiries = await Enquiry.find()
      .select('name email enquiryType status submittedAt')
      .sort({ submittedAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        total_events: totalEvents,
        published_events: publishedEvents,
        draft_events: draftEvents,
        total_media: totalMedia,
        total_enquiries: totalEnquiries,
        new_enquiries: newEnquiries
      },
      recentEvents,
      recentEnquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Badge Count of New Enquiries
// @route   GET /api/admin/new-enquiries-count
// @access  Private (Admin)
exports.getNewEnquiriesCount = async (req, res, next) => {
  try {
    const count = await Enquiry.countDocuments({ status: 'new' });
    res.status(200).json({ success: true, count });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Events for Admin (with filtering)
// @route   GET /api/admin/events
// @access  Private (Admin)
exports.getAllEvents = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'all' && ['published', 'draft'].includes(status)) {
      filter.status = status;
    }

    const events = await Event.find(filter).sort({ eventDate: -1, _id: -1 }).lean();

    const eventIds = events.map(e => e._id);
    const mediaCounts = await EventMedia.aggregate([
      { $match: { eventId: { $in: eventIds } } },
      { $group: { _id: '$eventId', count: { $sum: 1 } } }
    ]);

    const countMap = {};
    mediaCounts.forEach(mc => {
      countMap[mc._id.toString()] = mc.count;
    });

    const list = events.map(ev => ({
      ...ev,
      media_count: countMap[ev._id.toString()] || 0
    }));

    res.status(200).json({ success: true, events: list });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Event (with cover image and additional media)
// @route   POST /api/admin/events
// @access  Private (Admin)
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, eventDate, location, status } = req.body;

    if (!title || !description || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and event date are required.'
      });
    }

    let coverImagePath = null;
    if (req.files && req.files['coverImage'] && req.files['coverImage'][0]) {
      coverImagePath = `uploads/events/${req.files['coverImage'][0].filename}`;
    }

    const newEvent = await Event.create({
      title: title.trim(),
      description: description.trim(),
      eventDate: new Date(eventDate),
      location: location ? location.trim() : null,
      status: ['published', 'draft'].includes(status) ? status : 'draft',
      coverImagePath,
      createdBy: req.admin._id,
      publishedAt: status === 'published' ? new Date() : null
    });

    // Handle additional photos
    if (req.files && req.files['photos']) {
      for (const photo of req.files['photos']) {
        await EventMedia.create({
          eventId: newEvent._id,
          mediaType: 'image',
          filePath: `uploads/events/${photo.filename}`,
          originalFilename: photo.originalname,
          caption: newEvent.title
        });
      }
    }

    // Handle additional videos
    if (req.files && req.files['videos']) {
      for (const video of req.files['videos']) {
        await EventMedia.create({
          eventId: newEvent._id,
          mediaType: 'video',
          filePath: `uploads/events/${video.filename}`,
          originalFilename: video.originalname,
          caption: newEvent.title
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Event created successfully.',
      event: newEvent
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Event Details & Media
// @route   PUT /api/admin/events/:id
// @access  Private (Admin)
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const { title, description, eventDate, location, status } = req.body;

    if (title) event.title = title.trim();
    if (description) event.description = description.trim();
    if (eventDate) event.eventDate = new Date(eventDate);
    if (location !== undefined) event.location = location ? location.trim() : null;

    if (status && ['published', 'draft'].includes(status)) {
      if (status === 'published' && event.status !== 'published') {
        event.publishedAt = new Date();
      }
      event.status = status;
    }

    if (req.files && req.files['coverImage'] && req.files['coverImage'][0]) {
      if (event.coverImagePath) {
        unlinkFile(event.coverImagePath);
      }
      event.coverImagePath = `uploads/events/${req.files['coverImage'][0].filename}`;
    }

    await event.save();

    // Additional photos
    if (req.files && req.files['photos']) {
      for (const photo of req.files['photos']) {
        await EventMedia.create({
          eventId: event._id,
          mediaType: 'image',
          filePath: `uploads/events/${photo.filename}`,
          originalFilename: photo.originalname,
          caption: event.title
        });
      }
    }

    // Additional videos
    if (req.files && req.files['videos']) {
      for (const video of req.files['videos']) {
        await EventMedia.create({
          eventId: event._id,
          mediaType: 'video',
          filePath: `uploads/events/${video.filename}`,
          originalFilename: video.originalname,
          caption: event.title
        });
      }
    }

    const updatedMedia = await EventMedia.find({ eventId: event._id }).sort({ sortOrder: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      message: 'Event updated successfully.',
      event: {
        ...event.toObject(),
        media: updatedMedia
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle Event Status (draft <-> published)
// @route   PATCH /api/admin/events/:id/status
// @access  Private (Admin)
exports.toggleEventStatus = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const newStatus = event.status === 'published' ? 'draft' : 'published';
    event.status = newStatus;
    if (newStatus === 'published') {
      event.publishedAt = new Date();
    }
    await event.save();

    res.status(200).json({
      success: true,
      message: `Event status updated to ${newStatus}.`,
      status: newStatus
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Event & Cascade Attached Media
// @route   DELETE /api/admin/events/:id
// @access  Private (Admin)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    // Unlink cover
    if (event.coverImagePath) {
      unlinkFile(event.coverImagePath);
    }

    // Unlink attached media files
    const mediaItems = await EventMedia.find({ eventId: event._id });
    for (const item of mediaItems) {
      unlinkFile(item.filePath);
    }

    await EventMedia.deleteMany({ eventId: event._id });
    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Event and all associated media deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Media for Admin
// @route   GET /api/admin/media
// @access  Private (Admin)
exports.getAllMedia = async (req, res, next) => {
  try {
    const media = await EventMedia.find()
      .populate('eventId', 'title')
      .sort({ createdAt: -1 });

    const formatted = media.map(m => ({
      _id: m._id,
      id: m._id,
      media_type: m.mediaType,
      file_path: m.filePath,
      original_filename: m.originalFilename,
      caption: m.caption,
      created_at: m.createdAt,
      event_title: m.eventId ? m.eventId.title : 'Unassigned Event'
    }));

    res.status(200).json({ success: true, media: formatted });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Media Item
// @route   DELETE /api/admin/media/:id
// @access  Private (Admin)
exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await EventMedia.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found.' });
    }

    unlinkFile(media.filePath);
    await media.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Media file permanently deleted.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Enquiries for Admin
// @route   GET /api/admin/enquiries
// @access  Private (Admin)
exports.getAllEnquiries = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'all' && ['new', 'read', 'in_progress', 'resolved'].includes(status)) {
      filter.status = status;
    }

    const enquiries = await Enquiry.find(filter).sort({ submittedAt: -1, _id: -1 });

    res.status(200).json({ success: true, enquiries });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Enquiry Status
// @route   PATCH /api/admin/enquiries/:id
// @access  Private (Admin)
exports.updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['new', 'read', 'in_progress', 'resolved'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    enquiry.status = status;
    await enquiry.save();

    res.status(200).json({
      success: true,
      message: `Enquiry status updated to ${status}.`,
      enquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Enquiry
// @route   DELETE /api/admin/enquiries/:id
// @access  Private (Admin)
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Enquiry record deleted.'
    });
  } catch (error) {
    next(error);
  }
};
