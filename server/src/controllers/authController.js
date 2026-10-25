const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'cpls_secret_jwt_key_2026_dindrud_chandrabhaga_school',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password.'
      });
    }

    // Check by username OR email
    const admin = await Admin.findOne({
      $or: [
        { username: username.trim() },
        { email: username.trim().toLowerCase() }
      ]
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials provided or account inactive.'
      });
    }

    if (admin.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'This account has been deactivated.'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials provided or account inactive.'
      });
    }

    // Update last login
    admin.lastLoginAt = new Date();
    await admin.save();

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current Logged in Admin
// @route   GET /api/auth/me
// @access  Private (Admin)
exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email,
      lastLoginAt: req.admin.lastLoginAt
    }
  });
};

// @desc    Change Password
// @route   POST /api/auth/change-password
// @access  Private (Admin)
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All password fields are required.'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirmation password do not match.'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.'
      });
    }

    const admin = await Admin.findById(req.admin._id);
    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'The current password you entered is incorrect.'
      });
    }

    admin.passwordHash = await Admin.hashPassword(newPassword);
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Your password has been changed successfully.'
    });
  } catch (error) {
    next(error);
  }
};
