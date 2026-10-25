import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const AboutUs = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('About School')}</span>
          <h1 className="page-title">{t('About Us')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('About Us')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Commitment to Quality Education</span>
              <h2>Nurturing Young Minds in Dindrud, Beed</h2>
              <p className="lead">
                {SCHOOL_DETAILS.name} was established in {SCHOOL_DETAILS.foundedYear} under the visionary patronage of {SCHOOL_DETAILS.trustName} to bring high quality CBSE-affiliated education to the rural heartland of Maharashtra.
              </p>
              <p>
                Recognized by the Central Board of Secondary Education (CBSE Affiliation No. {SCHOOL_DETAILS.cbseAffiliationNo}), the school operates as an independent secondary institution providing a rigorous and balanced curriculum. We believe that true learning flourishes where intellectual challenge meets compassion, discipline, and creative inquiry.
              </p>

              <div style={{ margin: '28px 0' }}>
                <img
                  src="/assets/images/classroom/classroom-2.png"
                  alt="Students engaged in classroom learning"
                  style={{ borderRadius: 'var(--radius)', width: '100%', boxShadow: 'var(--shadow-sm)' }}
                />
              </div>

              <h2>Our Educational Philosophy</h2>
              <p>
                Education at {SCHOOL_DETAILS.shortName} extends beyond textbook memorization. Our pedagogical model is designed around three foundational learner attributes:
              </p>

              <div className="grid highlights" style={{ margin: '26px 0' }}>
                <div className="facility">
                  <span>ATTRIBUTE 1</span>
                  <strong>Independent Thinkers</strong>
                  <p>Students are stimulated to analyze problems, ask discerning questions, and synthesize practical answers through inquiry-based learning.</p>
                </div>
                <div className="facility">
                  <span>ATTRIBUTE 2</span>
                  <strong>Effective Communicators</strong>
                  <p>Emphasis on multilingual literacy, articulacy, public speaking, and compassionate interaction across communities.</p>
                </div>
                <div className="facility">
                  <span>ATTRIBUTE 3</span>
                  <strong>Principled Citizens</strong>
                  <p>Cultivation of ethical integrity, civic responsibility, cultural pride, and respect for diversity in society.</p>
                </div>
              </div>

              <h2>Campus & Educational Infrastructure</h2>
              <p>
                Situated on Belura Road in Majalgaon taluka, our expansive campus is thoughtfully developed to provide students with a tranquil, safe, and academically stimulating learning ecosystem. The school features smart interactive classrooms, dedicated computer and science learning spaces, athletic grounds, and quiet study areas.
              </p>

              <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
                <Link to="/admission-process" className="btn btn-purple">
                  Explore Admission Process →
                </Link>
                <Link to="/photo-gallery" className="btn btn-outline-dark">
                  View Campus Photos
                </Link>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutUs;
