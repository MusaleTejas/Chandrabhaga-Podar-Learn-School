import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const CurrentVacancies = () => {
  const { homeLabel, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject_area: '',
    qualification: '',
    experience: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please provide a valid contact phone number.');
      return;
    }
    if (!formData.subject_area.trim()) {
      setErrorMsg('Please indicate your subject specialization or applied position.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/enquiries', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject_area: formData.subject_area,
        qualification: formData.qualification,
        experience: formData.experience,
        message: formData.message || 'Submitted faculty recruitment application.',
        enquiryType: 'career'
      });

      if (res.data.success) {
        setSuccessMsg('Application Received! Thank you for applying to Chandrabhaga Podar Learn School. Our administration will review your credentials and contact shortlisted educators.');
        setFormData({ name: '', email: '', phone: '', subject_area: '', qualification: '', experience: '', message: '' });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'An error occurred while submitting your application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('Notice Board')}</span>
          <h1 className="page-title">{t('Current Vacancies')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('Current Vacancies')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Career Opportunities</span>
              <h2>Teach, Inspire, and Grow With Us in Dindrud</h2>
              <p className="lead">
                At {SCHOOL_DETAILS.name}, we believe that great schools are built by passionate teachers. We welcome enthusiastic educators committed to child-centric pedagogy, conceptual clarity, and value education.
              </p>

              <h2>Open Teaching & Administrative Roles</h2>
              <div className="grid highlights" style={{ margin: '24px 0' }}>
                <div className="facility">
                  <span>PRT / TGT</span>
                  <strong>English, Maths & Science Teachers</strong>
                  <p>B.Ed / D.El.Ed qualified teachers with strong subject fundamentals and proficiency in English communication.</p>
                </div>
                <div className="facility">
                  <span>SPECIALIST</span>
                  <strong>Computer Science & IT Faculty</strong>
                  <p>BCA / MCA / B.Tech to oversee student practicals, coding logic, and smart classroom maintenance.</p>
                </div>
                <div className="facility">
                  <span>SPORTS & CO-CURRICULAR</span>
                  <strong>Physical Education & Music Instructor</strong>
                  <p>Dedicated coaches for cricket, volleyball, track athletics, and performing music / cultural arts.</p>
                </div>
              </div>

              {/* Online Career Application Form */}
              <div style={{ background: '#faf7fc', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '32px', margin: '36px 0', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginTop: 0, color: 'var(--purple-dark)' }}>Submit Faculty Application</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                  Interested educators may submit their credentials below. You may also email your resume directly to{' '}
                  <a href={`mailto:${SCHOOL_DETAILS.email}`} style={{ color: 'var(--purple)', fontWeight: 700 }}>
                    {SCHOOL_DETAILS.email}
                  </a>.
                </p>

                {successMsg && (
                  <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', color: '#2e7d32', padding: '14px 18px', borderRadius: '6px', marginBottom: '18px', fontWeight: 600 }}>
                    ✓ {successMsg}
                  </div>
                )}

                {errorMsg && (
                  <div style={{ background: '#ffebee', border: '1px solid #ffcdd2', color: '#c62828', padding: '14px 18px', borderRadius: '6px', marginBottom: '18px', fontWeight: 600 }}>
                    ⚠ {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                        Applicant Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Tejas Patil"
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. tejas.patil@example.com"
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 099236 25977"
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                        Subject Specialization / Role *
                      </label>
                      <input
                        type="text"
                        name="subject_area"
                        value={formData.subject_area}
                        onChange={handleChange}
                        placeholder="e.g. Mathematics, Science, English, Sports"
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                        Highest Qualification
                      </label>
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="e.g. M.Sc, B.Ed / MA, B.Ed / BCA"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                        Teaching Experience
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g. 3 years in CBSE / Fresher"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                      Brief Cover Letter / Candidate Notes
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Outline your teaching passion, key competencies, and availability..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-purple"
                    disabled={submitting}
                    style={{ cursor: submitting ? 'not-allowed' : 'pointer' }}
                  >
                    {submitting ? 'Submitting Application...' : 'Submit Faculty Application →'}
                  </button>
                </form>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default CurrentVacancies;
