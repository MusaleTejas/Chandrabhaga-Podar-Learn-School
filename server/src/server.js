require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start HTTP listener
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(` Chandrabhaga School MERN Backend Server Running`);
    console.log(` Port: ${PORT} | Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` API Base URL: http://localhost:${PORT}/api`);
    console.log(`========================================================`);
  });

  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    // server.close(() => process.exit(1));
  });

  return server;
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
