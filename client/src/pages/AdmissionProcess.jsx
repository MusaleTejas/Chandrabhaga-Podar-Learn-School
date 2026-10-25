import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const AdmissionProcess = () => {
  const { homeLabel, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
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
      setErrorMsg('Please provide the parent or guardian full name.');
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
    if (!formData.grade.trim()) {
      setErrorMsg('Please indicate the grade or class seeking admission.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/enquiries', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        grade: formData.grade,
        message: formData.message || 'Requesting admission details.',
        enquiryType: 'admission'
      });

      if (res.data.success) {
        setSuccessMsg('Submission Successful! Your admission enquiry has been saved into our administration portal. Our admissions team will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', grade: '', message: '' });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'An error occurred while saving your enquiry. Please contact us directly by phone.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('Admission')}</span>
          <h1 className="page-title">{t('Admission Process')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('Admission Process')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Step-by-Step Procedure</span>
              <h2>Joining Chandrabhaga Podar Learn School</h2>
              <p className="lead">
                We welcome students seeking admission into our CBSE curriculum. Our admission process is transparent, student-centric, and structured to understand your child's learning needs.
              </p>

              <h2>Step-by-Step Admission Procedure</h2>
              <div className="grid highlights" style={{ margin: '24px 0' }}>
                <div className="facility">
                  <span>STEP 1</span>
                  <strong>Online Enquiry / Visit</strong>
                  <p>Submit the admission enquiry form below or visit our Belura Road campus to collect the school prospectus.</p>
                </div>
                <div className="facility">
                  <span>STEP 2</span>
                  <strong>Interaction & Evaluation</strong>
                  <p>A friendly, informal interaction with teachers to gauge the child's grade readiness, reading, and numeracy.</p>
                </div>
                <div className="facility">
                  <span>STEP 3</span>
                  <strong>Document Verification</strong>
                  <p>Submission of birth certificate, previous school transfer certificate (TC), and Aadhaar copies.</p>
                </div>
                <div className="facility">
                  <span>STEP 4</span>
                  <strong>Confirmation & Enrollment</strong>
                  <p>Payment of admission term fee, collection of school diary, uniform guidance, and syllabus schedule.</p>
                </div>
              </div>

              <h2>Mandatory Documentation Checklist</h2>
              <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>Original Transfer Certificate (TC) from the previous recognized school (duly signed).</li>
                <li>Attested photocopy of student's official Birth Certificate (issued by Municipal authority / Gram Panchayat).</li>
                <li>Photocopy of student's and parents' Aadhaar Cards.</li>
                <li>Previous academic term Report Card / Marksheet.</li>
                <li>3 recent passport-sized color photographs of the student.</li>
              </ul>

              {/* Online Admission Enquiry Form */}
              <div style={{ background: '#faf7fc', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '32px', margin: '36px 0', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginTop: 0, color: 'var(--purple-dark)' }}>Submit Online Admission Enquiry</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                  Complete the fields below to register your child's interest. Our admission desk will connect with you via telephone or WhatsApp.
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
                        Parent / Guardian Full Name *
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
                        Grade / Class Seeking *
                      </label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      >
                        <option value="">-- Select Grade --</option>
                        <option value="Nursery / Pre-Primary">Nursery / Pre-Primary</option>
                        <option value="Junior KG / Senior KG">Junior KG / Senior KG</option>
                        <option value="Class 1 to 5">Primary (Class 1 to 5)</option>
                        <option value="Class 6 to 8">Middle School (Class 6 to 8)</option>
                        <option value="Class 9 to 10">Secondary (Class 9 to 10)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                      Additional Notes or Questions
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mention any queries regarding curriculum, bus facility, or admission timing..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-purple"
                    disabled={submitting}
                    style={{ cursor: submitting ? 'not-allowed' : 'pointer' }}
                  >
                    {submitting ? 'Submitting Enquiry...' : 'Submit Admission Enquiry →'}
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

export default AdmissionProcess;
