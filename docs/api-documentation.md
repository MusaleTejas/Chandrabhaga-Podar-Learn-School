# Backend API Documentation
**Base URL:** `http://localhost:5000/api`

---

## 1. Authentication Endpoints

### 1.1 `POST /api/auth/login`
- **Description:** Authenticates administrator with username or email and password.
- **Request Body:**
  ```json
  {
    "username": "cpls_admin",
    "password": "Admin@School2026!"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "token": "jwt_token_string",
    "admin": {
      "id": "60d0fe4f5311236168a109ca",
      "username": "cpls_admin",
      "email": "chandrabhagapls@gmail.com"
    }
  }
  ```

### 1.2 `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** Returns authenticated admin details.

### 1.3 `POST /api/auth/change-password`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "currentPassword": "Admin@School2026!",
    "newPassword": "NewPassword@2026",
    "confirmPassword": "NewPassword@2026"
  }
  ```

---

## 2. Public Endpoints

### 2.1 `GET /api/events`
- **Query Parameters:**
  - `page` (number, default: 1)
  - `limit` (number, default: 6)
  - `status` (string, default: `published`)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "total": 12,
    "page": 1,
    "totalPages": 2,
    "events": [...]
  }
  ```

### 2.2 `GET /api/events/:id`
- **Description:** Returns single event details with all attached photos and videos. Returns 403 if draft and unauthenticated.

### 2.3 `POST /api/enquiries`
- **Description:** Submits contact, admission, or career enquiry.
- **Request Body:**
  ```json
  {
    "name": "Tejas Patil",
    "email": "tejas@example.com",
    "phone": "9923625977",
    "enquiryType": "general | admission | career | other",
    "message": "Enquiry message body"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Enquiry submitted successfully."
  }
  ```

### 2.4 `GET /api/gallery/photos`
- **Description:** Returns all authentic photo gallery items categorized + dynamic photos from published events.

### 2.5 `GET /api/gallery/videos`
- **Description:** Returns all authentic school videos + dynamic event videos from published events.

---

## 3. Administrative Endpoints (Protected by JWT Auth)

### 3.1 `GET /api/admin/dashboard-stats`
- **Description:** Returns counts for total events, published events, drafts, total media, total enquiries, and new enquiries, along with recent 5 events and enquiries.

### 3.2 `GET /api/admin/events`
- **Query Parameters:** `status=all|published|draft`
- **Description:** Lists all events with media counts.

### 3.3 `POST /api/admin/events` (Multipart Form)
- **Fields:** `title`, `description`, `eventDate`, `location`, `status`
- **Files:** `coverImage` (single), `photos` (multiple), `videos` (multiple)

### 3.4 `PUT /api/admin/events/:id` (Multipart Form)
- **Description:** Updates event metadata and allows uploading additional media items.

### 3.5 `PATCH /api/admin/events/:id/status`
- **Request Body:** `{"status": "published | draft"}`

### 3.6 `DELETE /api/admin/events/:id`
- **Description:** Deletes event and associated media records and unlinks files.

### 3.7 `GET /api/admin/media`
- **Description:** Lists all uploaded event media files.

### 3.8 `DELETE /api/admin/media/:id`
- **Description:** Deletes specific media file and removes it from disk.

### 3.9 `GET /api/admin/enquiries`
- **Query Parameters:** `status=all|new|read|in_progress|resolved`

### 3.10 `PATCH /api/admin/enquiries/:id`
- **Request Body:** `{"status": "new | read | in_progress | resolved"}`

### 3.11 `DELETE /api/admin/enquiries/:id`
- **Description:** Deletes enquiry record.
