# Database Mapping: MySQL to MongoDB
**Project:** Chandrabhaga Podar Learn School, Dindrud  
**Migration Target:** MongoDB with Mongoose Models

---

## 1. Schema Transformation Strategy

In MySQL, the schema consists of 4 normalized relational tables:
1. `admins`
2. `events`
3. `event_media`
4. `enquiries`

In MongoDB, we map each entity cleanly using Mongoose schemas:
- `admins` -> `Admin` collection (`admins`)
- `events` -> `Event` collection (`events`)
- `event_media` -> `EventMedia` collection (`event_media`), with `eventId` referencing `Event._id` (plus virtual populates for easy aggregation)
- `enquiries` -> `Enquiry` collection (`enquiries`)

To ensure seamless data migration from existing MySQL dumps, each Mongoose model also stores an optional `legacyId: Number` allowing exact reconciliation of foreign keys without loss of relational integrity.

---

## 2. Table-by-Table Field Mapping

### 2.1 `admins` -> `Admin` (`admins` Collection)

| MySQL Column | MySQL Type | Constraints | MongoDB Field | Mongoose Type | Notes |
|---|---|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | `legacyId` / `_id` | `Number` / `ObjectId` | Auto-generated `_id` |
| `username` | VARCHAR(100) | UNIQUE, NOT NULL | `username` | `String`, unique, trim | Unique login identifier |
| `email` | VARCHAR(191) | UNIQUE, NOT NULL | `email` | `String`, unique, lowercase, trim | Official admin email |
| `password_hash` | VARCHAR(255) | NOT NULL | `passwordHash` | `String` | Bcrypt hash |
| `status` | ENUM('active', 'inactive') | DEFAULT 'active' | `status` | `String`, enum: ['active', 'inactive'] | Account active state |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | `createdAt` | `Date` | Timestamp |
| `updated_at` | DATETIME | ON UPDATE CURRENT_TIMESTAMP | `updatedAt` | `Date` | Timestamp |
| `last_login_at`| DATETIME | NULL | `lastLoginAt` | `Date`, optional | Last login record |

### 2.2 `events` -> `Event` (`events` Collection)

| MySQL Column | MySQL Type | Constraints | MongoDB Field | Mongoose Type | Notes |
|---|---|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | `legacyId` / `_id` | `Number` / `ObjectId` | Preserved legacy integer id |
| `title` | VARCHAR(255) | NOT NULL | `title` | `String`, required, trim | Event announcement title |
| `description` | TEXT | NOT NULL | `description` | `String`, required | Full body content |
| `event_date` | DATE | NOT NULL | `eventDate` | `Date`, required | Date of the school event |
| `location` | VARCHAR(255) | NULL | `location` | `String`, optional, trim | Campus ground or hall |
| `cover_image_path` | VARCHAR(255) | NULL | `coverImagePath`| `String`, optional | Relative file path |
| `status` | ENUM('draft', 'published')| DEFAULT 'draft' | `status` | `String`, enum: ['draft', 'published'] | Visibility flag |
| `created_by` | INT UNSIGNED | FK -> `admins.id` | `createdBy` | `ObjectId`, ref: `'Admin'` | Admin creator reference |
| `created_at` | DATETIME | NOT NULL | `createdAt` | `Date` | Creation timestamp |
| `updated_at` | DATETIME | NOT NULL | `updatedAt` | `Date` | Update timestamp |
| `published_at`| DATETIME | NULL | `publishedAt` | `Date`, optional | Publication timestamp |

### 2.3 `event_media` -> `EventMedia` (`event_media` Collection)

| MySQL Column | MySQL Type | Constraints | MongoDB Field | Mongoose Type | Notes |
|---|---|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | `legacyId` / `_id` | `Number` / `ObjectId` | Preserved legacy identifier |
| `event_id` | INT UNSIGNED | FK -> `events.id` ON DELETE CASCADE | `eventId` | `ObjectId`, ref: `'Event'`, required | Parent event reference |
| `media_type` | ENUM('image', 'video') | NOT NULL | `mediaType` | `String`, enum: ['image', 'video'] | Media classification |
| `file_path` | VARCHAR(255) | NOT NULL | `filePath` | `String`, required | Relative path to upload |
| `original_filename`| VARCHAR(255)| NULL | `originalFilename`| `String`, optional | Uploaded original name |
| `caption` | VARCHAR(255) | NULL | `caption` | `String`, optional | Display caption |
| `sort_order` | INT | DEFAULT 0 | `sortOrder` | `Number`, default: 0 | Display priority |
| `created_at` | DATETIME | NOT NULL | `createdAt` | `Date` | Creation timestamp |

### 2.4 `enquiries` -> `Enquiry` (`enquiries` Collection)

| MySQL Column | MySQL Type | Constraints | MongoDB Field | Mongoose Type | Notes |
|---|---|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | `legacyId` / `_id` | `Number` / `ObjectId` | Preserved legacy identifier |
| `name` | VARCHAR(150) | NOT NULL | `name` | `String`, required, trim | Parent / Applicant name |
| `email` | VARCHAR(191) | NOT NULL | `email` | `String`, required, trim, lowercase | Valid contact email |
| `phone` | VARCHAR(50) | NULL | `phone` | `String`, optional, trim | Mobile contact number |
| `enquiry_type`| ENUM('general', 'admission', 'career', 'other') | DEFAULT 'general' | `enquiryType`| `String`, enum: ['general', 'admission', 'career', 'other'] | Category |
| `message` | TEXT | NOT NULL | `message` | `String`, required | Full submitted inquiry |
| `status` | ENUM('new', 'read', 'in_progress', 'resolved') | DEFAULT 'new' | `status` | `String`, enum: ['new', 'read', 'in_progress', 'resolved'] | Administrative status |
| `ip_address` | VARCHAR(45) | NULL | `ipAddress` | `String`, optional | Submitter IP address |
| `submitted_at`| DATETIME | DEFAULT CURRENT_TIMESTAMP | `submittedAt`| `Date`, default: Date.now | Submission timestamp |

---

## 3. MongoDB Indexes

To replicate and optimize MySQL index behavior:
1. **`Admin`**:
   - `{ username: 1 }` (unique)
   - `{ email: 1 }` (unique)
   - `{ status: 1 }`
2. **`Event`**:
   - `{ status: 1, eventDate: -1 }` (for fast public listing and ordering)
   - `{ legacyId: 1 }` (sparse)
3. **`EventMedia`**:
   - `{ eventId: 1, sortOrder: 1 }` (for fetching media per event)
   - `{ mediaType: 1 }` (for public photo/video gallery aggregations)
4. **`Enquiry`**:
   - `{ status: 1, submittedAt: -1 }` (for administrative filtering)
   - `{ enquiryType: 1 }`
