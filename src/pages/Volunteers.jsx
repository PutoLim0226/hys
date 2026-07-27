import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Volunteers = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.volunteer')} | HUI YIN SEH</title>
      </Helmet>
      
      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.volunteer')}</h1>
          <p className="section-subtitle">{t('volunteer.joinTitle')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div style={ maxWidth: '900px', margin: '0 auto' }>

          <div className="card" style={ padding: '2.5rem', marginBottom: '2rem' }>
            <h2 style={ color: 'var(--primary-color)', marginBottom: '1rem' }>{t('volunteer.reqTitle')}</h2>
            <div style={ lineHeight: '1.8', color: 'var(--text-secondary)' }>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('volunteer.req1')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('volunteer.req2')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('volunteer.req3')}</li>
              </ul>
            </div>
          </div>

          <div className="card" style={ padding: '2.5rem', marginBottom: '2rem' }>
            <h2 style={ color: 'var(--primary-color)', marginBottom: '1rem' }>{t('volunteer.formTitle')}</h2>
            <div style={ lineHeight: '1.8', color: 'var(--text-secondary)' }>
              <p>{t('volunteer.formDesc')}</p>
              <button className="btn btn-primary mt-3">{t('volunteer.submitBtn')}</button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
