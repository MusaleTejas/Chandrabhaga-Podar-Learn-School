const express = require('express');
const router = express.Router();
const { submitEnquiry } = require('../controllers/enquiryController');
const { enquiryLimiter } = require('../middleware/rateLimiter');

router.post('/', enquiryLimiter, submitEnquiry);

module.exports = router;
