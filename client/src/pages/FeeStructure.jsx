import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const FeeStructure = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('Admission')}</span>
          <h1 className="page-title">{t('Fee Structure')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; <Link to="/admission-process">{t('Admission')}</Link> &nbsp; / &nbsp; {t('Fee Structure')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Transparent Financial Governance</span>
              <h2>Fee Policy & Regulations</h2>
              <p className="lead">
                {SCHOOL_DETAILS.name} maintains a transparent fee structure adhering strictly to Maharashtra state educational norms and CBSE fee regulation committee guidelines.
              </p>

              <p>
                Our fee is structured to cover high quality teaching, computer laboratories, sports grounds maintenance, and holistic extracurricular programs without arbitrary hidden levies.
              </p>

              <h2>General Fee Principles</h2>
              <div className="grid highlights" style={{ margin: '24px 0' }}>
                <div className="facility">
                  <span>TERM PAYMENTS</span>
                  <strong>Installment Flexibility</strong>
                  <p>Fees may be paid in designated term installments as per the annual schedule notified by the accounts desk.</p>
                </div>
                <div className="facility">
                  <span>MODES OF PAYMENT</span>
                  <strong>Secure Digital & Banking</strong>
                  <p>Online NEFT/RTGS bank transfers, UPI, Demand Drafts, and account cheques are supported.</p>
                </div>
                <div className="facility">
                  <span>FEE INCLUSIONS</span>
                  <strong>Value-Added Facilities</strong>
                  <p>Standard tuition covers classroom instruction, laboratory usage, sports coaching, and library access.</p>
                </div>
              </div>

              <h2>Request Class-Wise Fee Schedule</h2>
              <p>
                To maintain regulatory compliance and accurate grade-wise fee schedules (Pre-Primary through Secondary), detailed fee slips are provided directly to prospective parents during the campus consultation.
              </p>

              <div style={{ background: '#faf7fc', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px', margin: '28px 0' }}>
                <h3 style={{ marginTop: 0, color: 'var(--purple-dark)' }}>Connect with School Accounts Office</h3>
                <p style={{ margin: '0 0 16px', color: 'var(--muted)', fontSize: '14px' }}>
                  For fee confirmation, installment options, or fee concession inquiries under state educational rules, reach our accounts desk directly.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={`tel:${SCHOOL_DETAILS.phoneClean}`} className="btn btn-purple btn-sm">
                    📞 Call Accounts: {SCHOOL_DETAILS.phone}
                  </a>
                  <a
                    href={`https://wa.me/${SCHOOL_DETAILS.whatsappNumber}?text=Hello%20Accounts%2C%20I%20would%20like%20to%20request%20the%20fee%20structure%20schedule.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{ background: '#25d366', borderColor: '#25d366', color: '#fff' }}
                  >
                    💬 WhatsApp Enquiry
                  </a>
                </div>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default FeeStructure;
