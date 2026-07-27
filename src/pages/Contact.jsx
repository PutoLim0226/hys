import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.contact')} | HUI YIN SEH</title>
      </Helmet>
      
      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.contact')}</h1>
          <p className="section-subtitle">{t('nav.contact')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div style={ maxWidth: '900px', margin: '0 auto' }>

          <div className="card" style={ padding: '2.5rem', marginBottom: '2rem' }>
            <h2 style={ color: 'var(--primary-color)', marginBottom: '1rem' }>{t('nav.contact')}</h2>
            <div style={ lineHeight: '1.8', color: 'var(--text-secondary)' }>
              <p>📍 30, Lintang Paya Terubong 3, Bandar Baru Air Itam, 11060 Ayer Itam, Pulau Pinang, Malaysia.</p>
              <p>📞 +60 4-829 5198</p>
              <p>✉️ contact@huiyinseh.org</p>
              <p>🕒 周一至周日 09:00 - 17:00</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
