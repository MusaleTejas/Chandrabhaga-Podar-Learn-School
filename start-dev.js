/**
 * Chandrabhaga Podar Learn School - Unified Dev Starter
 * Safely starts Backend and Vite Client without port conflicts or duplicate processes.
 */

const { spawn } = require('child_process');
const net = require('net');
const http = require('http');
const path = require('path');

const BACKEND_PORT = 5000;
const FRONTEND_PORT = 5173;
const MONGO_PORT = 27017;

function checkPort(port) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve({ inUse: true });
      } else {
        resolve({ inUse: false, error: err.code });
      }
    });
    s.once('listening', () => {
      s.close();
      resolve({ inUse: false });
    });
    s.listen(port);
  });
}

function checkHttp(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ ok: res.statusCode === 200, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ ok: false, error: err.code });
    });
  });
}

async function start() {
  console.log('========================================================');
  console.log(' Starting Chandrabhaga School MERN Stack Environment');
  console.log('========================================================');

  // 1. Verify MongoDB
  console.log('[1/3] Checking MongoDB on port ' + MONGO_PORT + '...');
  const mongoCheck = await checkPort(MONGO_PORT);
  if (!mongoCheck.inUse) {
    console.warn('⚠️ MongoDB is not running on port 27017!');
    console.warn('Please start MongoDB using:');
    console.warn('& "C:\\Program Files\\MongoDB\\Server\\8.0\\bin\\mongod.exe" --dbpath "C:\\Users\\user\\Downloads\\chandrabhaga-school-mern\\data\\db" --port 27017');
  } else {
    console.log('✓ MongoDB is active and accepting connections.');
  }

  // 2. Start Backend
  console.log('[2/3] Checking Backend on port ' + BACKEND_PORT + '...');
  let backendProc = null;
  const backendPortCheck = await checkPort(BACKEND_PORT);

  if (backendPortCheck.inUse) {
    const health = await checkHttp('http://localhost:' + BACKEND_PORT + '/api/health');
    if (health.ok) {
      console.log('✓ Backend is already running healthy on port ' + BACKEND_PORT + '. Reusing existing instance.');
    } else {
      console.warn('⚠️ Port ' + BACKEND_PORT + ' is occupied by another process. Please free port ' + BACKEND_PORT + '.');
    }
  } else {
    console.log('Starting Backend Server (server/src/server.js)...');
    backendProc = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['start'], {
      cwd: path.resolve(__dirname, 'server'),
      stdio: 'inherit'
    });
  }

  // 3. Start Vite Client
  console.log('[3/3] Checking Frontend on port ' + FRONTEND_PORT + '...');
  let frontendProc = null;
  const frontendPortCheck = await checkPort(FRONTEND_PORT);

  if (frontendPortCheck.inUse) {
    console.log('✓ Frontend is already running on port ' + FRONTEND_PORT + '.');
    console.log('\nOpen in browser: http://localhost:' + FRONTEND_PORT);
  } else {
    console.log('Starting Vite Dev Server (client)...');
    frontendProc = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], {
      cwd: path.resolve(__dirname, 'client'),
      stdio: 'inherit'
    });
  }

  const cleanup = () => {
    console.log('\nShutting down dev processes safely...');
    if (backendProc) backendProc.kill();
    if (frontendProc) frontendProc.kill();
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

start();
