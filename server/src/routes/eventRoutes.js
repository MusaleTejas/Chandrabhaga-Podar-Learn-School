const express = require('express');
const router = express.Router();
const { getPublishedEvents, getEventById } = require('../controllers/eventController');
const { optionalAdminAuth } = require('../middleware/auth');

router.get('/', getPublishedEvents);
router.get('/:id', optionalAdminAuth, getEventById);

module.exports = router;
