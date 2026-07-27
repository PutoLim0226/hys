import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.about')} | HUI YIN SEH</title>
      </Helmet>
      
      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.about')}</h1>
          <p className="section-subtitle">{t('about.pageTitle')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t('about.historyTitle')}</h2>
            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              {t('about.historyText')}
            </div>
          </div>

          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t('about.missionTitle')}</h2>
            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('about.m1')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('about.m2')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('about.m3')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('about.m4')}</li>
              </ul>
            </div>
          </div>

          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t('about.orgTitle')}</h2>
            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              {t('about.orgDesc')}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
