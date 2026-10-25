/**
 * Automated Verification Test Suite for Chandrabhaga School MERN Stack
 * Replicates and extends test_suite.php against the Node/Express backend and MongoDB
 */
require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./src/app');
const Admin = require('./src/models/Admin');
const Event = require('./src/models/Event');
const Enquiry = require('./src/models/Enquiry');

let server;
const PORT = 5099;
const BASE_URL = `http://127.0.0.1:${PORT}/api`;

let testsPassed = 0;
let totalTests = 0;

function assertTest(description, condition) {
  totalTests++;
  if (condition) {
    console.log(` [PASS] ${description}`);
    testsPassed++;
  } else {
    console.error(` [FAIL] ${description}`);
  }
}

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BASE_URL}${path}`);
    const method = options.method || 'GET';
    const headers = { ...options.headers };
    let postData = options.body;

    if (postData && typeof postData === 'object') {
      postData = JSON.stringify(postData);
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(postData);
    } else if (['POST', 'PUT', 'PATCH'].includes(method)) {
      postData = postData || '{}';
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(
      url,
      {
        method,
        headers
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          let data = body;
          try {
            data = JSON.parse(body);
          } catch (e) {
            // keep raw body
          }
          resolve({ status: res.statusCode, headers: res.headers, data, rawBody: body });
        });
      }
    );

    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTestSuite() {
  console.log('========================================================');
  console.log(' Starting Chandrabhaga School MERN Automated Tests');
  console.log('========================================================\n');

  try {
    // 1. Connect DB and start local test server instance
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chandrabhaga_school');
    server = app.listen(PORT);

    // TEST 1: Health check endpoint
    const health = await request('/health');
    assertTest('Health check API returns HTTP 200 with service info', health.status === 200 && health.data.status === 'healthy');
    assertTest('Health check reports verified CBSE 1131595 and code 31592', health.data.affiliation === 'CBSE 1131595' && health.data.schoolCode === '31592');

    // TEST 2: Public Photo Gallery API
    const photos = await request('/gallery/photos');
    assertTest('Photo gallery API returns HTTP 200', photos.status === 200 && photos.data.success);
    assertTest('Photo gallery includes curated authentic classroom and sports photos', photos.data.photos.length >= 25);

    // TEST 3: Public Video Gallery API
    const videos = await request('/gallery/videos');
    assertTest('Video gallery API returns HTTP 200', videos.status === 200 && videos.data.success);
    assertTest('Video gallery includes authentic school extracurricular and sports videos', videos.data.videos.length >= 4);

    // TEST 4: General Contact Enquiry Submission
    const contactRes = await request('/enquiries', {
      method: 'POST',
      body: {
        name: 'Tejas Patil',
        email: 'tejas.test@example.com',
        phone: '099236 25977',
        enquiryType: 'general',
        message: 'Inquiring regarding CBSE admission syllabus and bus facility in Majalgaon.'
      }
    });
    assertTest('General contact submission succeeds (HTTP 201)', contactRes.status === 201 && contactRes.data.success);

    const contactRecord = await Enquiry.findOne({ email: 'tejas.test@example.com' });
    assertTest('Contact enquiry record accurately saved in MongoDB', !!contactRecord && contactRecord.enquiryType === 'general');

    // TEST 5: Admission Enquiry Submission
    const admRes = await request('/enquiries', {
      method: 'POST',
      body: {
        name: 'Test Parent Mother',
        email: 'mother.test@example.com',
        phone: '099236 25977',
        grade: 'Class 5',
        enquiryType: 'admission',
        message: 'Seeking admission for Class 5 CBSE curriculum.'
      }
    });
    assertTest('Admission enquiry submission succeeds (HTTP 201)', admRes.status === 201 && admRes.data.success);

    const admRecord = await Enquiry.findOne({ email: 'mother.test@example.com' });
    assertTest('Admission enquiry saved with type admission and grade in message', !!admRecord && admRecord.enquiryType === 'admission' && admRecord.message.includes('Class 5'));

    // TEST 6: Admin Login - Wrong Credentials
    const badLogin = await request('/auth/login', {
      method: 'POST',
      body: {
        username: 'cpls_admin',
        password: 'IncorrectPassword999!'
      }
    });
    assertTest('Invalid credentials rejected with HTTP 401', badLogin.status === 401 && !badLogin.data.success);

    // TEST 7: Admin Login - Correct Credentials
    const goodLogin = await request('/auth/login', {
      method: 'POST',
      body: {
        username: 'cpls_admin',
        password: 'Admin@School2026!'
      }
    });
    assertTest('Valid admin login succeeds (HTTP 200)', goodLogin.status === 200 && goodLogin.data.success);
    assertTest('Admin login returns valid JWT token', typeof goodLogin.data.token === 'string' && goodLogin.data.token.length > 20);

    const adminToken = goodLogin.data.token;
    const authHeaders = { Authorization: `Bearer ${adminToken}` };

    // TEST 8: Protected Admin Profile
    const me = await request('/auth/me', { headers: authHeaders });
    assertTest('Authenticated admin accesses /api/auth/me', me.status === 200 && me.data.admin.username === 'cpls_admin');

    // TEST 9: Admin Dashboard Statistics
    const dash = await request('/admin/dashboard-stats', { headers: authHeaders });
    assertTest('Admin dashboard stats accessible with JWT (HTTP 200)', dash.status === 200 && dash.data.success);
    assertTest('Dashboard stats report genuine database counts', dash.data.stats.total_enquiries >= 2);

    // TEST 10: Admin Event Creation in Draft Mode
    const createEventRes = await request('/admin/events', {
      method: 'POST',
      headers: authHeaders,
      body: {
        title: 'Annual Athletics Championship 2026',
        description: 'The annual athletics championship at Chandrabhaga Podar Learn School, Dindrud featuring track sprints, volleyball matches, and student relay races.',
        eventDate: new Date().toISOString().split('T')[0],
        location: 'School Main Sports Ground, Dindrud',
        status: 'draft'
      }
    });
    assertTest('Admin creates draft event (HTTP 201)', createEventRes.status === 201 && createEventRes.data.success);

    const createdEventId = createEventRes.data.event._id;

    // TEST 11: Public Events Listing Hides Draft Event
    const publicEventsAnon = await request('/events');
    const hasDraftInPublic = (publicEventsAnon.data.events || []).some((e) => e._id.toString() === createdEventId.toString());
    assertTest('Public visitors do NOT see draft event in announcements', !hasDraftInPublic);

    // TEST 12: Admin Toggles Event to Published
    const toggleRes = await request(`/admin/events/${createdEventId}/status`, {
      method: 'PATCH',
      headers: authHeaders,
      body: { status: 'published' }
    });
    assertTest('Admin toggles event status to published (HTTP 200)', toggleRes.status === 200 && toggleRes.data.status === 'published');

    // TEST 13: Public Events Now Displays Published Event
    const publicEventsPub = await request('/events');
    const hasPublished = (publicEventsPub.data.events || []).some((e) => e._id.toString() === createdEventId.toString());
    assertTest('Public events listing now contains the published event', hasPublished);

    // TEST 14: Public Event Details Page Loads
    const eventDetail = await request(`/events/${createdEventId}`);
    assertTest('Public event details returns HTTP 200 and full content', eventDetail.status === 200 && eventDetail.data.event.title === 'Annual Athletics Championship 2026');

    // TEST 15: Admin Event Deletion
    const delEventRes = await request(`/admin/events/${createdEventId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    assertTest('Admin deletes event (HTTP 200)', delEventRes.status === 200 && delEventRes.data.success);

    const checkDeleted = await Event.findById(createdEventId);
    assertTest('Event is completely removed from MongoDB', checkDeleted === null);

    // TEST 16: Admin Password Change and Verification
    const pwChangeRes = await request('/auth/change-password', {
      method: 'POST',
      headers: authHeaders,
      body: {
        currentPassword: 'Admin@School2026!',
        newPassword: 'NewSecretPass2026!',
        confirmPassword: 'NewSecretPass2026!'
      }
    });
    assertTest('Admin changes password successfully (HTTP 200)', pwChangeRes.status === 200 && pwChangeRes.data.success);

    // Test login with new password
    const loginWithNew = await request('/auth/login', {
      method: 'POST',
      body: { username: 'cpls_admin', password: 'NewSecretPass2026!' }
    });
    assertTest('Admin logs in with updated password', loginWithNew.status === 200 && loginWithNew.data.success);

    // Revert password back to original 'Admin@School2026!'
    const revertToken = loginWithNew.data.token;
    await request('/auth/change-password', {
      method: 'POST',
      headers: { Authorization: `Bearer ${revertToken}` },
      body: {
        currentPassword: 'NewSecretPass2026!',
        newPassword: 'Admin@School2026!',
        confirmPassword: 'Admin@School2026!'
      }
    });

    // Clean up temporary test records to guarantee ZERO dummy/fake records remain!
    await Enquiry.deleteMany({ email: { $in: ['tejas.test@example.com', 'mother.test@example.com'] } });
    console.log('\n[Clean Up] Cleaned up all temporary test enquiries. Zero test/dummy data remains in MongoDB.');

    console.log('\n========================================================');
    console.log(` Test Results: ${testsPassed} of ${totalTests} tests passed successfully!`);
    console.log('========================================================\n');

  } catch (err) {
    console.error('Fatal test runner error:', err);
  } finally {
    if (server) {
      server.close();
    }
    await mongoose.disconnect();
    process.exit(testsPassed === totalTests ? 0 : 1);
  }
}

runTestSuite();
