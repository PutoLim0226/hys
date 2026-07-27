import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export const Events = () => {
  const { t } = useLanguage();
  return (
    <div>
      <Helmet>
        <title>{t('nav.events')} | HUI YIN SEH</title>
      </Helmet>
      
      <section className="page-banner">
        <div className="container">
          <h1 className="section-title">{t('nav.events')}</h1>
          <p className="section-subtitle">{t('nav.events')}</p>
        </div>
      </section>

      <section className="container section-padding">
        <div style={ maxWidth: '900px', margin: '0 auto' }>

          <div className="card" style={ padding: '2.5rem', marginBottom: '2rem' }>
            <h2 style={ color: 'var(--primary-color)', marginBottom: '1rem' }>{t('nav.events')}</h2>
            <div style={ lineHeight: '1.8', color: 'var(--text-secondary)' }>
              {t('nav.events')}内容建设中...
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
