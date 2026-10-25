import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import PrincipalMessage from './pages/PrincipalMessage';
import ChairmanMessage from './pages/ChairmanMessage';
import VisionMission from './pages/VisionMission';
import SchoolSong from './pages/SchoolSong';
import OurTeam from './pages/OurTeam';
import Brochure from './pages/Brochure';
import AdmissionProcess from './pages/AdmissionProcess';
import FeeStructure from './pages/FeeStructure';
import PhotoGallery from './pages/PhotoGallery';
import VideoGallery from './pages/VideoGallery';
import NewsEvents from './pages/NewsEvents';
import EventDetails from './pages/EventDetails';
import TimeTable from './pages/TimeTable';
import CurrentVacancies from './pages/CurrentVacancies';
import ContactUs from './pages/ContactUs';
import MandatoryDisclosure from './pages/MandatoryDisclosure';
import LoginPortal from './pages/LoginPortal';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminEventCreate from './pages/admin/AdminEventCreate';
import AdminEventEdit from './pages/admin/AdminEventEdit';
import AdminMedia from './pages/admin/AdminMedia';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminChangePassword from './pages/admin/AdminChangePassword';

const App = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/principal-message" element={<PrincipalMessage />} />
        <Route path="/chairman-message" element={<ChairmanMessage />} />
        <Route path="/mission-vision" element={<VisionMission />} />
        <Route path="/school-song" element={<SchoolSong />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/brochure" element={<Brochure />} />
        <Route path="/admission-process" element={<AdmissionProcess />} />
        <Route path="/fee-structure" element={<FeeStructure />} />
        <Route path="/photo-gallery" element={<PhotoGallery />} />
        <Route path="/video-gallery" element={<VideoGallery />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/time-table" element={<TimeTable />} />
        <Route path="/current-vacancies" element={<CurrentVacancies />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cbse-disclosure" element={<MandatoryDisclosure />} />
        <Route path="/portal-login" element={<LoginPortal />} />

        {/* Legacy PHP route compatibility redirects */}
        <Route path="/index.php" element={<Navigate to="/" replace />} />
        <Route path="/aboutus.php" element={<Navigate to="/about-us" replace />} />
        <Route path="/principalmsg.php" element={<Navigate to="/principal-message" replace />} />
        <Route path="/chairmanmsg.php" element={<Navigate to="/chairman-message" replace />} />
        <Route path="/visionmission.php" element={<Navigate to="/mission-vision" replace />} />
        <Route path="/schoolsongs.php" element={<Navigate to="/school-song" replace />} />
        <Route path="/showteams.php" element={<Navigate to="/our-team" replace />} />
        <Route path="/brochure.php" element={<Navigate to="/brochure" replace />} />
        <Route path="/admissionprocess.php" element={<Navigate to="/admission-process" replace />} />
        <Route path="/showfeestructure.php" element={<Navigate to="/fee-structure" replace />} />
        <Route path="/photogallery.php" element={<Navigate to="/photo-gallery" replace />} />
        <Route path="/videogallery.php" element={<Navigate to="/video-gallery" replace />} />
        <Route path="/newsevent.php" element={<Navigate to="/news-events" replace />} />
        <Route path="/downloadtimetable.php" element={<Navigate to="/time-table" replace />} />
        <Route path="/currentvacancies.php" element={<Navigate to="/current-vacancies" replace />} />
        <Route path="/contactus.php" element={<Navigate to="/contact-us" replace />} />
        <Route path="/mandatorydisclosure.php" element={<Navigate to="/cbse-disclosure" replace />} />
        <Route path="/login.php" element={<Navigate to="/portal-login" replace />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Management Portal */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="events/new" element={<AdminEventCreate />} />
        <Route path="events/:id/edit" element={<AdminEventEdit />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="change-password" element={<AdminChangePassword />} />
      </Route>

      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2>404 - Page Not Found</h2>
            <p style={{ margin: '14px 0 24px', color: '#555' }}>The page you are looking for does not exist.</p>
            <a href="/" className="btn btn-purple">Return to Home</a>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
