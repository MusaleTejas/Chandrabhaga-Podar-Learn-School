import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const MandatoryDisclosure = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('Notice Board')}</span>
          <h1 className="page-title">{t('CBSE Mandatory Disclosure')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('Mandatory Disclosure')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Appendix IX Information</span>
              <h2>Mandatory Information as per CBSE Guidelines</h2>
              <p className="lead">
                In compliance with Central Board of Secondary Education (CBSE) statutory mandates, {SCHOOL_DETAILS.name} publishes the following verified institutional and administrative disclosures.
              </p>

              {/* Section A: General Information */}
              <h2 style={{ marginTop: '32px' }}>A. General Information</h2>
              <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', width: '40%', color: 'var(--purple-dark)' }}>School Name</th>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>{SCHOOL_DETAILS.name}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>CBSE Affiliation Number</th>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--purple)' }}>{SCHOOL_DETAILS.cbseAffiliationNo}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>School Code</th>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>{SCHOOL_DETAILS.schoolCode}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>Affiliation Period</th>
                      <td style={{ padding: '12px 16px' }}>{SCHOOL_DETAILS.affiliationPeriod}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>Affiliation Status</th>
                      <td style={{ padding: '12px 16px' }}>{SCHOOL_DETAILS.status}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>Complete Address</th>
                      <td style={{ padding: '12px 16px' }}>{SCHOOL_DETAILS.address}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>Principal Name & Qualification</th>
                      <td style={{ padding: '12px 16px' }}><strong>{SCHOOL_DETAILS.principalName}</strong>, {SCHOOL_DETAILS.principalQualification}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>School Contact Email</th>
                      <td style={{ padding: '12px 16px' }}>
                        <a href={`mailto:${SCHOOL_DETAILS.email}`} style={{ color: 'var(--purple)', fontWeight: 600 }}>{SCHOOL_DETAILS.email}</a>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>School Contact Numbers</th>
                      <td style={{ padding: '12px 16px' }}>
                        <a href={`tel:${SCHOOL_DETAILS.phoneClean}`} style={{ color: 'var(--purple)', fontWeight: 600 }}>📞 {SCHOOL_DETAILS.phone}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section B: Documents and Information */}
              <h2 style={{ marginTop: '40px' }}>B. Documents & Institutional Certifications</h2>
              <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}>
                  <thead>
                    <tr style={{ background: 'var(--purple-dark)', color: '#fff' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', width: '10%' }}>No.</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', width: '65%' }}>Document Description</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', width: '25%' }}>Status / Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 16px' }}>1</td>
                      <td style={{ padding: '12px 16px' }}>Copies of Affiliation / Upgradation Letter & Recent Extension of Affiliation</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span className="badge badge-success">Verified Active</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <td style={{ padding: '12px 16px' }}>2</td>
                      <td style={{ padding: '12px 16px' }}>Copies of Societies / Trust Registration & Renewal Certificate</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span className="badge badge-success">Registered</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 16px' }}>3</td>
                      <td style={{ padding: '12px 16px' }}>Copy of No Objection Certificate (NOC) Issued by Maharashtra State Govt.</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span className="badge badge-success">Obtained</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <td style={{ padding: '12px 16px' }}>4</td>
                      <td style={{ padding: '12px 16px' }}>Copies of Recognition Certificate under RTE Act, 2009</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span className="badge badge-success">Compliant</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 16px' }}>5</td>
                      <td style={{ padding: '12px 16px' }}>Valid Building Safety Certificate as per National Building Code</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span className="badge badge-success">Certified Safe</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <td style={{ padding: '12px 16px' }}>6</td>
                      <td style={{ padding: '12px 16px' }}>Valid Fire Safety Certificate issued by Competent Authority</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span className="badge badge-success">Certified Safe</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 16px' }}>7</td>
                      <td style={{ padding: '12px 16px' }}>Valid Water, Health & Sanitation Certificates</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span className="badge badge-success">Certified Clean</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section C: Staff and Teaching */}
              <h2 style={{ marginTop: '40px' }}>C. Staff & Teaching Governance</h2>
              <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', width: '50%', color: 'var(--purple-dark)' }}>Principal</th>
                      <td style={{ padding: '12px 16px' }}>{SCHOOL_DETAILS.principalName} ({SCHOOL_DETAILS.principalQualification})</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>Teacher-Section Ratio</th>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>1.5 : 1 (CBSE Compliant)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)', background: '#faf8fb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--purple-dark)' }}>Special Educator & Student Counselor</th>
                      <td style={{ padding: '12px 16px' }}>Appointed as per CBSE norms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default MandatoryDisclosure;
