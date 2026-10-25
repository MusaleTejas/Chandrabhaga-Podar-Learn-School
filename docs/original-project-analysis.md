# Original Project Analysis: Chandrabhaga Podar Learn School, Dindrud
**Source Project Path:** `C:\Users\user\Downloads\chandrabhaga-school-website`  
**Migration Target Path:** `C:\Users\user\Downloads\chandrabhaga-school-mern`  
**Date of Inspection:** October 25, 2026

---

## 1. Executive Summary & Architecture Overview

The source project is a production-grade, monolithic PHP/MySQL web application for **Chandrabhaga Podar Learn School (CPLS), Dindrud**, an authentic rural CBSE-affiliated school located in Majalgaon, Beed District, Maharashtra (CBSE Affiliation No: `1131595`, School Code: `31592`).

### Core Technology Stack (Original)
- **Backend:** Native PHP 8.x with PDO MySQL database driver, session-based authentication, CSRF token generation/verification, and rate limiting.
- **Database:** MySQL / MariaDB (InnoDB engine, utf8mb4 collation) with 4 relational tables: `admins`, `events`, `event_media`, `enquiries`.
- **Frontend / Styling:** Vanilla HTML5, semantic markup, custom responsive CSS (`assets/css/site.css` - 34KB, `assets/css/admin.css` - 8KB), responsive mobile drawer navigation with animated hamburger, multilingual translation engine (English, Marathi, Hindi with custom term mapping such as "मुखपृष्ठ"), and floating WhatsApp quick-action integration.
- **Assets:** Authentic, uncompressed multimedia files:
  - SVG Logo (`assets/images/logo.svg`)
  - Curated campus photos: classrooms (`classroom-1` to `classroom-7`), student activities (`activity-1` to `activity-11`), athletics/sports (`sports-1` to `sports-14`), music (`music-1`), ceremonies (`outdoor-1` to `outdoor-3`).
  - School campus videos: `header-video.mp4`, `extracurriculars-showcase.mp4`, `principal-race-day.mp4`, `sports-campus.mp4`.

---

## 2. Inventory of PHP Files and Responsibilities

### 2.1 Public Pages (19 Pages)
1. `index.php`: Public homepage. Features hero video background (`header-video.mp4`), stats grid, verified school credentials, key highlights, 3 latest published events fetched from database, and direct WhatsApp links.
2. `aboutus.php`: Institutional history, Kranti Sevabhavi Sanstha governance, 3 core learner attributes, and campus imagery.
3. `principalmsg.php`: Official address and background of Principal Nilesh Papalal Nindane (MA. B.Ed, 10+ years experience).
4. `chairmanmsg.php`: Message from the Managing Trust focusing on rural educational equity.
5. `visionmission.php`: Institutional mission, vision statement, and 4 core values (Innovative, Open, Committed, Compassionate).
6. `schoolsongs.php`: School anthem showcase, cultural traditions, video playback (`extracurriculars-showcase.mp4`), and photo highlights.
7. `showteams.php`: Administrative leadership profiles (Principal & Kranti Sevabhavi Sanstha Board of Trustees).
8. `brochure.php`: Information package highlights, curriculum structure, and printed copy request CTA.
9. `admissionprocess.php`: Step-by-step admission guidelines, age criteria, document checklist, and an interactive **Admission Enquiry Form** saving to `enquiries` (`type='admission'`).
10. `showfeestructure.php`: Transparent fee policy, state regulation compliance, installment flexibility, and inquiry links.
11. `photogallery.php`: Categorized authentic photo gallery (Classrooms, Activities, Sports, Music, Outdoor) + dynamic event photos from database, category filter tabs, and responsive Lightbox modal.
12. `videogallery.php`: Curated school videos + dynamic event videos from database with HTML5 video player and poster thumbnails.
13. `newsevent.php`: Paginated school announcements and circulars, filtering only `status='published'`, with cover images, dates, and media counters.
14. `event-details.php`: Dynamic single event page displaying full description, attached photos with lightbox, and embedded event videos. Draft events are access-protected (HTTP 403 unless admin session exists).
15. `downloadtimetable.php`: Campus daily rhythm, scholastic periods, practical schedules, and grade-wise distribution notes.
16. `currentvacancies.php`: Faculty recruitment notice board with an interactive **Career Application Form** saving to `enquiries` (`type='career'`).
17. `contactus.php`: Campus location, Google Maps directions, phone/email directory, and an interactive **General Enquiry Form** saving to `enquiries` (`type='general'`).
18. `mandatorydisclosure.php`: Statutory CBSE Appendix IX public disclosures (General Info, Documents & Information, Results, Staffing, School Infrastructure).
19. `login.php`: Public school portal directory routing users to the Administrator Login.

### 2.2 Reusable Includes & Helpers
- `config/config.php`: Central application constants, CBSE credentials, school address, phone `099236 25977`, WhatsApp `919923625977`, `.env` parsing.
- `config/database.php`: PDO database connection factory with UTF-8mb4 and error mode settings.
- `includes/functions.php`: HTML escaping `e()`, secure session starter, CSRF token management, flash messages, rate limiting (IP-based), date formatting, secure MIME-type verified file uploader.
- `includes/auth.php`: Admin session verification, role enforcement, authentication state checking.
- `includes/header.php`: Shared public header, topbar, branding, desktop navigation with dropdowns, language switcher, mobile hamburger menu, backdrop, and Google Translate bridge.
- `includes/footer.php`: Shared public footer, CBSE disclaimer, trust identity, social links, contact directory, copyright, and floating pulsing WhatsApp widget.
- `includes/sidebar.php`: Secondary exploration sidebar with quick links and direct contact widget.

### 2.3 Administrator Panel (`admin/`)
- `admin/login.php`: Admin login interface with CSRF verification and rate limiting (5 attempts per 5 minutes).
- `admin/logout.php`: Session invalidation and redirect to login.
- `admin/index.php`: Admin Dashboard with real-time statistics (total events, published, drafts, media, total/new enquiries) and 5 recent events/enquiries.
- `admin/events.php`: Event management table with filter by status (`all`, `published`, `draft`), quick one-click toggle status action, and delete modal.
- `admin/event-create.php`: Event creation form with cover photo upload, multiple additional photos upload, and multiple videos upload.
- `admin/event-edit.php`: Event modification form with cover photo replacement, additional media upload, and deletion of attached media items.
- `admin/event-delete.php`: Cascading deletion of event, its database media records, and physical media files from disk.
- `admin/media.php`: Comprehensive media repository showing all event-uploaded photos and videos, linked event names, and deletion controls.
- `admin/media-delete.php`: Dedicated handler to unlink and remove individual media items.
- `admin/enquiries.php`: Enquiries management table with status filtering (`all`, `new`, `read`, `in_progress`, `resolved`), status updater dropdown, and record deletion.
- `admin/change-password.php`: Secure administrator password updating with current password verification and bcrypt rehashing.
- `admin/includes/admin-header.php` & `admin-footer.php`: Reusable admin panel navigation sidebar with real-time "New Enquiries" badge count.

---

## 3. Database Architecture (MySQL)

### Tables
1. **`admins`**:
   - `id`: INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
   - `username`: VARCHAR(100) UNIQUE NOT NULL
   - `email`: VARCHAR(191) UNIQUE NOT NULL
   - `password_hash`: VARCHAR(255) NOT NULL
   - `status`: ENUM('active', 'inactive') DEFAULT 'active'
   - `created_at`, `updated_at`, `last_login_at`
2. **`events`**:
   - `id`: INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
   - `title`: VARCHAR(255) NOT NULL
   - `description`: TEXT NOT NULL
   - `event_date`: DATE NOT NULL
   - `location`: VARCHAR(255) NULL
   - `cover_image_path`: VARCHAR(255) NULL
   - `status`: ENUM('draft', 'published') DEFAULT 'draft'
   - `created_by`: INT UNSIGNED NULL (FK to `admins.id`)
   - `created_at`, `updated_at`, `published_at`
3. **`event_media`**:
   - `id`: INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
   - `event_id`: INT UNSIGNED NOT NULL (FK to `events.id` ON DELETE CASCADE)
   - `media_type`: ENUM('image', 'video') NOT NULL
   - `file_path`: VARCHAR(255) NOT NULL
   - `original_filename`: VARCHAR(255) NULL
   - `caption`: VARCHAR(255) NULL
   - `sort_order`: INT DEFAULT 0
   - `created_at`: DATETIME
4. **`enquiries`**:
   - `id`: INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
   - `name`: VARCHAR(150) NOT NULL
   - `email`: VARCHAR(191) NOT NULL
   - `phone`: VARCHAR(50) NULL
   - `enquiry_type`: ENUM('general', 'admission', 'career', 'other') DEFAULT 'general'
   - `message`: TEXT NOT NULL
   - `status`: ENUM('new', 'read', 'in_progress', 'resolved') DEFAULT 'new'
   - `ip_address`: VARCHAR(45) NULL
   - `submitted_at`: DATETIME

---

## 4. UI/UX and Design Patterns
- **Colors:**
  - Primary Purple: `#4a154b` / Dark Purple: `#321341` / Deep Background: `#200b2b`
  - Accent Gold: `#e5a93c` / Bright Gold: `#f5ba42`
  - Text Ink: `#1e1926` / Muted: `#5c5269`
  - WhatsApp Green: `#25d366`
- **Breakpoints:**
  - Desktop: `> 992px`
  - Tablet/Mobile: `<= 992px` (Drawer navigation with hamburger icon, backdrop overlay, accordion dropdowns, scroll-lock)
  - Mobile Phones: `<= 768px`, `<= 480px`
- **Typography:**
  - Primary Font: `'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Responsive fluid font sizing, crisp margins, accessible contrast.
