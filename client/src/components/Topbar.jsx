import React from 'react';
import { Link } from 'react-router-dom';
import { SCHOOL_DETAILS } from '../utils/constants';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="container">
        <span className="top-note">
          📍 {SCHOOL_DETAILS.address}
        </span>
        <div className="top-links">
          <a href={`tel:${SCHOOL_DETAILS.phoneClean}`}>📞 {SCHOOL_DETAILS.phone}</a>
          <Link to="/cbse-disclosure">CBSE Mandatory Disclosure</Link>
          <Link to="/admin/login">Admin Login ↗</Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
