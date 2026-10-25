# Chandrabhaga Podar Learn School — MERN Stack Application

Official, modern MERN stack replication of the **Chandrabhaga Podar Learn School, Dindrud** web portal.
- **CBSE Affiliation No:** 1131595
- **School Code:** 31592
- **Location:** Belura Road, Dindrud, Tq. Majalgaon, Dist. Beed, Maharashtra - 431128

---

## Architecture & Technology Stack

- **Database:** MongoDB with Mongoose ODM (relational indexing, schema validation, legacy ID preservation).
- **Backend:** Node.js & Express.js REST API with JWT authentication, Bcrypt password hashing, Multer file uploads, and IP rate limiting.
- **Frontend:** React.js (Vite), React Router v6, custom responsive CSS (preserving 100% of original styling), interactive Lightbox, and non-intrusive multilingual switcher (English, मराठी, हिन्दी).
- **Assets:** Authentic, uncompressed school photographs, SVG crest, and campus athletics/extracurricular videos.

---

## Directory Structure

```text
chandrabhaga-school-mern/
├── client/                     # React.js Frontend (Vite)
│   ├── public/assets/          # Authentic static images, videos & stylesheets
│   ├── src/
│   │   ├── components/         # Topbar, Navbar, Footer, WhatsAppFloating, Lightbox
│   │   ├── layouts/            # PublicLayout & AdminLayout
│   │   ├── pages/              # 19 Public pages + 8 Admin pages
│   │   ├── context/            # AuthContext & LanguageContext
│   │   ├── services/           # Axios API Client
│   │   └── utils/              # Verified school constants
├── server/                     # Node.js & Express.js Backend API
│   ├── src/
│   │   ├── config/             # MongoDB connection factory
│   │   ├── models/             # Admin, Event, EventMedia, Enquiry
│   │   ├── controllers/        # Business logic for auth, events, enquiries, media
│   │   ├── routes/             # REST API routes
│   │   ├── middleware/         # JWT Auth, Multer uploader, Rate limiters, Error handler
│   │   ├── app.js              # Express app setup
│   │   └── server.js           # Server bootstrap & listener
│   ├── uploads/events/         # Uploaded event photos and video files
│   └── test_suite.js           # End-to-end automated test runner
├── migration/                  # MySQL-to-MongoDB migration tool
│   └── migrate.js              # CLI migration script
└── docs/                       # Project documentation
    ├── original-project-analysis.md
    ├── feature-inventory.md
    ├── database-mapping.md
    ├── api-documentation.md
    └── migration-and-testing-report.md
```

---

## Quick Start & Installation

### 1. Prerequisites
- **Node.js:** v18 or higher (tested on Node v22)
- **MongoDB:** v6.0 or higher (tested on MongoDB Community v8.0)

### 2. Database Setup & Migration
1. Ensure your MongoDB server is running:
   ```bash
   mongod --dbpath "C:\Users\user\Downloads\chandrabhaga-school-mern\data\db"
   ```
2. Run the MySQL-to-MongoDB migration script to seed the initial administrator:
   ```bash
   cd migration
   node migrate.js
   ```

### 3. Start the Backend API Server
```bash
cd ../server
npm install
npm start
```
The backend API server will run at `http://localhost:5000/api`.

### 4. Start the React Frontend
Open a second terminal window:
```bash
cd ../client
npm install
npm run dev
```
The React frontend will run at `http://localhost:5173`.

---

## Default Administrative Credentials

- **Username:** `cpls_admin`
- **Password:** `Admin@School2026!`
- **Admin Portal URL:** `http://localhost:5173/admin/login`

---

## Automated Verification Tests

To run the complete automated test suite (verifying all 25 public and administrative capabilities):
```bash
cd server
node test_suite.js
```
*(All temporary test data created during testing is automatically cleaned up at the end of the run).*

---

## Documentation Links

- [Original Project Analysis](docs/original-project-analysis.md)
- [Feature Inventory & Parity Checklist](docs/feature-inventory.md)
- [MySQL to MongoDB Schema Mapping](docs/database-mapping.md)
- [Complete REST API Documentation](docs/api-documentation.md)
- [Migration & Verification Test Report](docs/migration-and-testing-report.md)
