const express = require('express');
const router = express.Router();
const { login, getMe, changePassword } = require('../controllers/authController');
const { requireAdminAuth } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, login);
router.get('/me', requireAdminAuth, getMe);
router.post('/change-password', requireAdminAuth, changePassword);

module.exports = router;
