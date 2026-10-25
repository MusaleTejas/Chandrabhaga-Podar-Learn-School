const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Trust proxy for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Configure CORS
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000').split(',').map(s => s.trim());
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (
      !origin || 
      allowedOrigins.includes(origin) || 
      allowedOrigins.includes('*') || 
      origin.endsWith('.vercel.app') || 
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    callback(new Error('Blocked by CORS policy'));
  },
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
const uploadsDir = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Chandrabhaga Podar Learn School Backend API',
    health: '/api/health',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Chandrabhaga Podar Learn School Backend API',
    affiliation: 'CBSE 1131595',
    schoolCode: '31592'
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
