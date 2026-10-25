const rateLimit = require('express-rate-limit');

// Rate limiter for enquiries (5 submissions per 5 minutes per IP)
const enquiryLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions from this connection. Please wait 5 minutes before trying again.'
  }
});

// Rate limiter for admin login (5 attempts per 5 minutes)
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many failed login attempts. Please wait 5 minutes before trying again.'
  }
});

module.exports = { enquiryLimiter, loginLimiter };
