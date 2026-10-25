import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const ContactUs = () => {
  const { homeLabel, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: 'general',
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
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMsg('Please write a message with at least 10 characters.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/enquiries', formData);
      if (res.data.success) {
        setSuccessMsg('Message Dispatched Successfully! Thank you for reaching out. Your message has been saved into our administration portal. Our staff will respond to your enquiry shortly.');
        setFormData({ name: '', email: '', phone: '', enquiryType: 'general', message: '' });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'An error occurred while submitting your message. Please contact us directly by telephone.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('About School')}</span>
          <h1 className="page-title">{t('Contact Us')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('Contact Us')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Reach Out Today</span>
              <h2>We Are Here to Assist You</h2>
              <p className="lead">
                Whether you have questions regarding our CBSE curriculum, admission criteria, transport routes, or campus visits, our administration desk is pleased to assist.
              </p>

              {/* Direct Communication Cards */}
              <div className="grid grid-responsive-2" style={{ gap: '20px', margin: '28px 0' }}>
                <div className="facility" style={{ borderLeftColor: 'var(--purple)' }}>
                  <span>CAMPUS LOCATION</span>
                  <strong>Visit Our Campus</strong>
                  <p style={{ margin: '6px 0 10px', fontSize: '13.5px' }}>{SCHOOL_DETAILS.address}</p>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Visiting Hours: Mon – Sat (9:00 AM – 4:30 PM)</span>
                </div>

                <div className="facility" style={{ borderLeftColor: '#25d366' }}>
                  <span>DIRECT HELPLINE</span>
                  <strong>WhatsApp & Phone</strong>
                  <p style={{ margin: '6px 0 10px', fontSize: '13.5px' }}>
                    <a href={`tel:${SCHOOL_DETAILS.phoneClean}`} style={{ color: 'var(--purple)', fontWeight: 700, display: 'block' }}>
                      📞 {SCHOOL_DETAILS.phone}
                    </a>
                    <a href={SCHOOL_DETAILS.whatsappLink} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', fontWeight: 700, display: 'block', marginTop: '4px' }}>
                      💬 WhatsApp: {SCHOOL_DETAILS.phone}
                    </a>
                  </p>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Official Email: {SCHOOL_DETAILS.email}</span>
                </div>
              </div>

              {/* Working Contact Form */}
              <div style={{ background: '#faf7fc', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '32px', margin: '36px 0', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginTop: 0, color: 'var(--purple-dark)' }}>Send Us an Online Message</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                  Your message will be routed directly to the designated school administrative staff.
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
                        Your Full Name *
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
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 099236 25977"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                        Enquiry Type
                      </label>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                      >
                        <option value="general">General Campus Inquiry</option>
                        <option value="admission">Admissions Consultation</option>
                        <option value="career">Career / Faculty Recruitment</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, marginBottom: '6px' }}>
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please write your detailed enquiry or message here..."
                      required
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-purple"
                    disabled={submitting}
                    style={{ cursor: submitting ? 'not-allowed' : 'pointer' }}
                  >
                    {submitting ? 'Sending Message...' : 'Send Message Now →'}
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

export default ContactUs;
