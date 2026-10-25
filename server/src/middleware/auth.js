const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const requireAdminAuth = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token missing or invalid.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cpls_secret_jwt_key_2026_dindrud_chandrabhaga_school');
    const admin = await Admin.findById(decoded.id).select('-passwordHash');

    if (!admin || admin.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Account not authorized or inactive.'
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed: ' + error.message
    });
  }
};

// Optional auth helper to check if admin is logged in (e.g. for previewing draft events)
const optionalAdminAuth = async (req, res, next) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cpls_secret_jwt_key_2026_dindrud_chandrabhaga_school');
      const admin = await Admin.findById(decoded.id).select('-passwordHash');
      if (admin && admin.status === 'active') {
        req.admin = admin;
      }
    }
  } catch (e) {
    // ignore token errors in optional auth
  }
  next();
};

module.exports = { requireAdminAuth, optionalAdminAuth };
