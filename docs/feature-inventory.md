# Feature Inventory & Parity Matrix
**Project:** Chandrabhaga Podar Learn School, Dindrud  
**Migration:** PHP/MySQL Monolith to MERN Stack

---

## 1. Public Features Matrix

| Original PHP Page | Feature Description | MERN React Component / Route | Backend API Required | Status |
|---|---|---|---|---|
| `index.php` | Homepage with video hero background, highlights, verified school info, stats, 3 recent published events | `client/src/pages/Home.jsx` (`/`) | `GET /api/events?limit=3&status=published` | Planned |
| `aboutus.php` | About School, affiliation details, 3 learner attributes, classroom photos | `client/src/pages/AboutUs.jsx` (`/about-us`) | None (Static) | Planned |
| `principalmsg.php` | Principal's message, qualifications, experience, photo | `client/src/pages/PrincipalMessage.jsx` (`/principal-message`) | None (Static) | Planned |
| `chairmanmsg.php` | Chairman & Trust message, educational equity, 3 pillars | `client/src/pages/ChairmanMessage.jsx` (`/chairman-message`) | None (Static) | Planned |
| `visionmission.php` | Mission, Vision statement, 4 core values | `client/src/pages/VisionMission.jsx` (`/mission-vision`) | None (Static) | Planned |
| `schoolsongs.php` | Cultural showcase, extracurricular video, music tradition | `client/src/pages/SchoolSong.jsx` (`/school-song`) | None (Static) | Planned |
| `showteams.php` | Administrative leadership (Principal & Trust Board) | `client/src/pages/OurTeam.jsx` (`/our-team`) | None (Static) | Planned |
| `brochure.php` | School brochure information package & prospectus request | `client/src/pages/Brochure.jsx` (`/brochure`) | None (Static) | Planned |
| `admissionprocess.php` | Guidelines, criteria, document checklist & **Interactive Admission Enquiry Form** | `client/src/pages/AdmissionProcess.jsx` (`/admission-process`) | `POST /api/enquiries` (type: `admission`) | Planned |
| `showfeestructure.php` | Transparent fee regulations & installment structure | `client/src/pages/FeeStructure.jsx` (`/fee-structure`) | None (Static) | Planned |
| `photogallery.php` | Categorized photo gallery (Classroom, Activity, Sports, Music, Outdoor) + dynamic event photos, category filters, Lightbox | `client/src/pages/PhotoGallery.jsx` (`/photo-gallery`) | `GET /api/gallery/photos` | Planned |
| `videogallery.php` | Curated campus videos + uploaded dynamic event videos with HTML5 video players | `client/src/pages/VideoGallery.jsx` (`/video-gallery`) | `GET /api/gallery/videos` | Planned |
| `newsevent.php` | Paginated live announcements and event circulars | `client/src/pages/NewsEvents.jsx` (`/news-events`) | `GET /api/events?page=1&limit=6&status=published` | Planned |
| `event-details.php` | Full event details with cover image, event photos (lightbox), and event videos; draft protection | `client/src/pages/EventDetails.jsx` (`/events/:id`) | `GET /api/events/:id` | Planned |
| `downloadtimetable.php`| Campus timetable rhythm, periods schedule, diary notes | `client/src/pages/TimeTable.jsx` (`/time-table`) | None (Static) | Planned |
| `currentvacancies.php` | Faculty openings & **Interactive Career Application Form** | `client/src/pages/CurrentVacancies.jsx` (`/current-vacancies`) | `POST /api/enquiries` (type: `career`) | Planned |
| `contactus.php` | Address, map directions, contacts & **Interactive General Contact Form** | `client/src/pages/ContactUs.jsx` (`/contact-us`) | `POST /api/enquiries` (type: `general`) | Planned |
| `mandatorydisclosure.php`| Complete statutory CBSE Appendix IX public tables | `client/src/pages/MandatoryDisclosure.jsx` (`/cbse-disclosure`) | None (Static) | Planned |
| `login.php` | Portal gateway redirecting to Admin Login | `client/src/pages/LoginPortal.jsx` (`/portal-login`) | None (Routing) | Planned |

---

## 2. Global UI/UX Components & Layout Features

| Feature | PHP Original Behavior | MERN Implementation |
|---|---|---|
| **Topbar** | Address, phone `099236 25977`, link to disclosure & admin login | `Topbar.jsx` component inside `PublicLayout.jsx` |
| **Header & Navbar** | Logo SVG, brand typography, dropdown menus (About, Admission, Gallery, Notice Board), Contact Us link | `Navbar.jsx` with dropdown state & desktop hover/click |
| **Mobile Drawer Menu** | 3-bar hamburger toggle, slide-out drawer, accordion sub-menus, scroll lock, backdrop overlay | React stateful drawer in `Navbar.jsx` matching CSS classes |
| **Language Switcher** | Dropdown with English, Marathi, Hindi; translates page, replaces "Home" with "मुखपृष्ठ", hides Google toolbar | `LanguageSwitcher.jsx` with persistent localStorage + Indic dictionary fallback |
| **Floating WhatsApp** | Bottom-right green button pulsing with link to `wa.me/919923625977` | `WhatsAppFloating.jsx` matching exact SVG & CSS animation |
| **Footer** | CBSE affiliation, Trust details, Facebook & YouTube links, address, phone, copyright with School Code `31592` | `Footer.jsx` matching exact HTML/CSS grid layout |
| **Sidebar Panel** | Quick navigation links + direct contact widget on inner content pages | `Sidebar.jsx` component |
| **Lightbox Modal** | Full-screen image preview with close button and backdrop click | `LightboxModal.jsx` reusable component |

---

## 3. Administrative Features Matrix

| Admin Page | Feature Description | MERN React Component / Route | Backend API Required |
|---|---|---|---|
| `admin/login.php` | Admin authentication with username/email & password, rate limiting | `client/src/pages/admin/AdminLogin.jsx` (`/admin/login`) | `POST /api/auth/login` |
| `admin/logout.php` | Session invalidation and logout | Context logout & redirect to `/admin/login` | `POST /api/auth/logout` |
| `admin/index.php` | Dashboard with 5 KPI cards (events, drafts, media, enquiries), recent 5 events, recent 5 enquiries | `client/src/pages/admin/AdminDashboard.jsx` (`/admin`) | `GET /api/admin/dashboard-stats` |
| `admin/events.php` | Events list with status tabs (`all`, `published`, `draft`), quick status toggle button, delete button | `client/src/pages/admin/AdminEvents.jsx` (`/admin/events`) | `GET /api/admin/events`, `PATCH /api/admin/events/:id/status`, `DELETE /api/admin/events/:id` |
| `admin/event-create.php` | Event creation with cover image upload, multiple photos upload, and video upload | `client/src/pages/admin/AdminEventCreate.jsx` (`/admin/events/new`) | `POST /api/admin/events` (multipart/form-data) |
| `admin/event-edit.php` | Event editing, cover update, attaching media, viewing & deleting attached items | `client/src/pages/admin/AdminEventEdit.jsx` (`/admin/events/:id/edit`) | `GET /api/admin/events/:id`, `PUT /api/admin/events/:id`, `DELETE /api/admin/media/:id` |
| `admin/media.php` | Media gallery repository showing all uploaded photos and videos, linked event names, delete action | `client/src/pages/admin/AdminMedia.jsx` (`/admin/media`) | `GET /api/admin/media`, `DELETE /api/admin/media/:id` |
| `admin/enquiries.php` | Enquiries listing with status filter tabs, status update dropdown, delete action | `client/src/pages/admin/AdminEnquiries.jsx` (`/admin/enquiries`) | `GET /api/admin/enquiries`, `PATCH /api/admin/enquiries/:id`, `DELETE /api/admin/enquiries/:id` |
| `admin/change-password.php`| Change admin password with current password verification & bcrypt hashing | `client/src/pages/admin/AdminChangePassword.jsx` (`/admin/change-password`) | `POST /api/auth/change-password` |
| Sidebar Notification Badge | Real-time badge counter on "Enquiries" menu item showing count of `new` enquiries | `AdminSidebar.jsx` polling / state | `GET /api/admin/new-enquiries-count` |
