const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { requireAdminAuth } = require('../middleware/auth');
const {
  getDashboardStats,
  getNewEnquiriesCount,
  getAllEvents,
  createEvent,
  updateEvent,
  toggleEventStatus,
  deleteEvent,
  getAllMedia,
  deleteMedia,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/adminController');

// All admin routes require admin authentication
router.use(requireAdminAuth);

// Dashboard & Metrics
router.get('/dashboard-stats', getDashboardStats);
router.get('/new-enquiries-count', getNewEnquiriesCount);

// Events Management
router.get('/events', getAllEvents);
router.post(
  '/events',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'photos', maxCount: 20 },
    { name: 'videos', maxCount: 5 }
  ]),
  createEvent
);
router.put(
  '/events/:id',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'photos', maxCount: 20 },
    { name: 'videos', maxCount: 5 }
  ]),
  updateEvent
);
router.patch('/events/:id/status', toggleEventStatus);
router.delete('/events/:id', deleteEvent);

// Media Gallery Management
router.get('/media', getAllMedia);
router.delete('/media/:id', deleteMedia);

// Enquiries Management
router.get('/enquiries', getAllEnquiries);
router.patch('/enquiries/:id', updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

module.exports = router;
