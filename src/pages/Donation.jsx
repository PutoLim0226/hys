import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Donation = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.donate')} | HUI YIN SEH</title>
      </Helmet>
      
      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.donate')}</h1>
          <p className="section-subtitle">{t('donation.methodsTitle')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t('donation.bankTransfer')}</h2>
            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <p><strong>{t('donation.bankName')}</strong><br/>
                 {t('donation.accName')}<br/>
                 {t('donation.accNo')}</p>
            </div>
          </div>

          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t('donation.onlineTitle')}</h2>
            <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <p>{t('donation.onlineDesc')}</p>
              <button className="btn btn-primary">{t('hero.donateBtn')}</button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
