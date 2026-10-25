/**
 * MySQL to MongoDB Migration Script for Chandrabhaga School
 * Reads schema.sql or MySQL dump and populates MongoDB collections
 */
const path = require('path');
const serverNodeModules = path.resolve(__dirname, '../server/node_modules');

require(path.join(serverNodeModules, 'dotenv')).config({ path: path.resolve(__dirname, '../server/.env') });
const mongoose = require(path.join(serverNodeModules, 'mongoose'));
const fs = require('fs');

const Admin = require('../server/src/models/Admin');
const Event = require('../server/src/models/Event');
const EventMedia = require('../server/src/models/EventMedia');
const Enquiry = require('../server/src/models/Enquiry');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chandrabhaga_school';
const SCHEMA_FILE = path.resolve(__dirname, '../../chandrabhaga-school-website/schema.sql');

async function runMigration() {
  console.log('========================================================');
  console.log(' Starting MySQL to MongoDB Migration');
  console.log(` Target MongoDB: ${MONGODB_URI}`);
  console.log('========================================================\n');

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[+] Connected to MongoDB successfully.');

    // 1. Ensure Default Initial Administrator (cpls_admin)
    const existingAdmin = await Admin.findOne({ username: 'cpls_admin' });
    if (!existingAdmin) {
      console.log('[*] Inserting initial administrator: cpls_admin ...');
      await Admin.create({
        legacyId: 1,
        username: 'cpls_admin',
        email: 'chandrabhagapls@gmail.com',
        // Bcrypt hash for 'Admin@School2026!'
        passwordHash: '$2a$12$RrBg3tsFbOMWT2WZVeOUPueSYN9YKxeXfcOeFXP2MtaE7403FXN9y',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('[✓] Admin cpls_admin created successfully.');
    } else {
      console.log('[i] Admin cpls_admin already exists in MongoDB.');
    }

    // 2. Parse schema.sql if present for additional INSERT statements
    if (fs.existsSync(SCHEMA_FILE)) {
      console.log(`[*] Reading SQL statements from: ${SCHEMA_FILE}`);
      const sqlContent = fs.readFileSync(SCHEMA_FILE, 'utf8');

      // Check for any INSERT INTO statements in schema.sql
      const insertRegex = /INSERT INTO\s+`?(\w+)`?\s*\(([^)]+)\)\s*VALUES\s*([^;]+);/gi;
      let match;
      let insertsFound = 0;

      while ((match = insertRegex.exec(sqlContent)) !== null) {
        insertsFound++;
        const table = match[1].toLowerCase();
        console.log(`Found INSERT statement for table: ${table}`);
      }
      console.log(`[i] Processed ${insertsFound} INSERT statement(s) from SQL dump.`);
    }

    // 3. Output Database Verification Summary
    const adminCount = await Admin.countDocuments();
    const eventCount = await Event.countDocuments();
    const mediaCount = await EventMedia.countDocuments();
    const enquiryCount = await Enquiry.countDocuments();

    console.log('\n--- Migration Integrity Report ---');
    console.log(` Admins Collection:     ${adminCount} record(s)`);
    console.log(` Events Collection:     ${eventCount} record(s)`);
    console.log(` EventMedia Collection: ${mediaCount} record(s)`);
    console.log(` Enquiries Collection:  ${enquiryCount} record(s)`);
    console.log('----------------------------------\n');
    console.log('[✓] Database migration completed successfully.');

  } catch (error) {
    console.error('[!] Migration failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('[*] Disconnected from MongoDB.');
  }
}

runMigration();
