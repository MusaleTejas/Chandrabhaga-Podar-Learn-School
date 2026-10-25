import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloating from '../components/WhatsAppFloating';

const PublicLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="public-app-wrapper">
      <Topbar />
      <Navbar />
      <div className="main-content-region">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
};

export default PublicLayout;
