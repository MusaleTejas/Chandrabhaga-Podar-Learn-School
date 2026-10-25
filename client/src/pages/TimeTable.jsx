import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

const TimeTable = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('Notice Board')}</span>
          <h1 className="page-title">{t('Time-Table')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('Time-Table')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Daily Rhythm</span>
              <h2>Campus Hours & Academic Timings</h2>
              <p className="lead">
                A well-structured daily timetable ensures an optimal balance between core scholastic subjects, computer lab practicals, physical sports, and value education.
              </p>

              <h2>Standard Campus Schedule</h2>
              <div className="grid highlights" style={{ margin: '24px 0' }}>
                <div className="facility">
                  <span>MORNING</span>
                  <strong>Assembly & Prayer</strong>
                  <p>Daily morning prayers, national anthem, news headlines, and moral thought of the day.</p>
                </div>
                <div className="facility">
                  <span>CORE SESSIONS</span>
                  <strong>Scholastic Periods</strong>
                  <p>Structured 40-minute periods covering English, Mathematics, Science, and Social Studies.</p>
                </div>
                <div className="facility">
                  <span>AFTERNOON</span>
                  <strong>Practicals & Sports</strong>
                  <p>Computer science practicals, physical education, music classes, and library study.</p>
                </div>
              </div>

              <h2>Grade-Wise Timetable Distribution</h2>
              <p>
                Individual class timetables are distributed directly to enrolled students through their class teachers and school diaries at the beginning of each academic term.
              </p>

              <div style={{ background: '#faf7fc', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '26px', margin: '24px 0' }}>
                <h3 style={{ marginTop: 0, color: 'var(--purple-dark)' }}>Parent Notice regarding Examination Schedules</h3>
                <p style={{ margin: '0 0 14px', fontSize: '14px', color: 'var(--muted)' }}>
                  Periodic assessment (PA-1, PA-2, Half-Yearly, and Annual) date sheets are published under News & Events and circulated in student handbooks 15 days in advance.
                </p>
                <Link to="/news-events" className="btn btn-purple btn-sm">
                  Check Exam Notices & Circulars →
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

export default TimeTable;
